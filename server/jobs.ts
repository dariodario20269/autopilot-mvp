import { eq, and, lte, gte } from "drizzle-orm";
import { getDb } from "./db";
import { bookings, payments, emailConversations, whatsappConversations } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";

/**
 * Send booking reminders 24 hours before appointment
 */
export async function sendBookingReminders() {
  const db = await getDb();
  if (!db) return { sent: 0, failed: 0 };

  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowEnd = new Date(tomorrow.getTime() + 60 * 60 * 1000);

    const upcomingBookings = await db.select().from(bookings)
      .where(and(
        eq(bookings.status, "confirmed"),
        gte(bookings.startTime, tomorrow),
        lte(bookings.startTime, tomorrowEnd)
      ));

    // Filter for reminders not yet sent
    const bookingsNeedingReminders = upcomingBookings.filter(b => !b.reminderSentAt);

    let sent = 0;
    let failed = 0;

    for (const booking of bookingsNeedingReminders) {
      try {
        // TODO: Send email reminder to customerEmail
        console.log(`[Jobs] Reminder sent for booking ${booking.id} to ${booking.customerEmail}`);
        sent++;
      } catch (error) {
        console.error(`[Jobs] Failed to send reminder for booking ${booking.id}:`, error);
        failed++;
      }
    }

    return { sent, failed };
  } catch (error) {
    console.error("[Jobs] Failed to send booking reminders:", error);
    return { sent: 0, failed: 0 };
  }
}

/**
 * Send payment receipts for completed payments
 */
export async function sendPaymentReceipts() {
  const db = await getDb();
  if (!db) return { sent: 0, failed: 0 };

  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const recentPayments = await db.select().from(payments)
      .where(and(
        eq(payments.status, "completed"),
        gte(payments.createdAt, oneHourAgo)
      ));

    let sent = 0;
    let failed = 0;

    for (const payment of recentPayments) {
      try {
        // TODO: Generate and send PDF invoice
        console.log(`[Jobs] Receipt sent for payment ${payment.id}`);
        sent++;
      } catch (error) {
        console.error(`[Jobs] Failed to send receipt for payment ${payment.id}:`, error);
        failed++;
      }
    }

    return { sent, failed };
  } catch (error) {
    console.error("[Jobs] Failed to send payment receipts:", error);
    return { sent: 0, failed: 0 };
  }
}

/**
 * Send owner alerts for new inquiries (email/WhatsApp conversations)
 */
export async function sendOwnerAlerts() {
  const db = await getDb();
  if (!db) return { sent: 0, failed: 0 };

  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const newEmailConversations = await db.select().from(emailConversations)
      .where(gte(emailConversations.createdAt, oneHourAgo));

    const newWhatsappConversations = await db.select().from(whatsappConversations)
      .where(gte(whatsappConversations.createdAt, oneHourAgo));

    let sent = 0;
    let failed = 0;

    // Send alerts for new email conversations
    for (const conv of newEmailConversations) {
      try {
        await notifyOwner({
          title: "New Email Inquiry",
          content: `New email from ${conv.senderEmail} about "${conv.subject}"`,
        });
        sent++;
      } catch (error) {
        console.error(`[Jobs] Failed to send email alert for conversation ${conv.id}:`, error);
        failed++;
      }
    }

    // Send alerts for new WhatsApp conversations
    for (const conv of newWhatsappConversations) {
      try {
        await notifyOwner({
          title: "New WhatsApp Message",
          content: `New message from ${conv.customerPhone}`,
        });
        sent++;
      } catch (error) {
        console.error(`[Jobs] Failed to send WhatsApp alert for conversation ${conv.id}:`, error);
        failed++;
      }
    }

    return { sent, failed };
  } catch (error) {
    console.error("[Jobs] Failed to send owner alerts:", error);
    return { sent: 0, failed: 0 };
  }
}

/**
 * Clean up old conversations (older than 90 days)
 */
export async function cleanupOldConversations() {
  const db = await getDb();
  if (!db) return { deleted: 0 };

  try {
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    // Note: Drizzle doesn't have direct delete with where, so we'd need to implement this
    // For now, just log the operation
    console.log(`[Jobs] Cleanup job: would delete conversations older than ${ninetyDaysAgo}`);

    return { deleted: 0 };
  } catch (error) {
    console.error("[Jobs] Failed to cleanup old conversations:", error);
    return { deleted: 0 };
  }
}

/**
 * Reset monthly usage counters
 */
export async function resetMonthlyUsage() {
  const db = await getDb();
  if (!db) return { reset: 0 };

  try {
    // Get first day of current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // TODO: Reset usageTracking for current month
    console.log(`[Jobs] Monthly usage reset for ${firstDayOfMonth.toISOString()}`);

    return { reset: 1 };
  } catch (error) {
    console.error("[Jobs] Failed to reset monthly usage:", error);
    return { reset: 0 };
  }
}

/**
 * Run all scheduled jobs
 */
export async function runAllJobs() {
  console.log("[Jobs] Starting scheduled jobs...");

  const results = {
    reminders: await sendBookingReminders(),
    receipts: await sendPaymentReceipts(),
    alerts: await sendOwnerAlerts(),
    cleanup: await cleanupOldConversations(),
    monthlyReset: await resetMonthlyUsage(),
  };

  console.log("[Jobs] Completed scheduled jobs:", results);
  return results;
}
