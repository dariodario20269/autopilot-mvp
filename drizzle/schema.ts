import { pgTable, serial, text, varchar, timestamp, boolean, pgEnum, integer, decimal, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Define enums for PostgreSQL
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const subscriptionTierEnum = pgEnum("subscription_tier", ["free", "basic", "pro"]);
export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "completed", "cancelled", "no-show"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid", "failed", "refunded"]);
export const paymentMethodEnum = pgEnum("payment_method", ["paypal", "stripe"]);
export const analyticsLevelEnum = pgEnum("analytics_level", ["basic", "full"]);
export const notificationTypeEnum = pgEnum("notification_type", ["booking_confirmation", "booking_reminder", "payment_receipt", "owner_alert", "new_inquiry"]);
export const notificationStatusEnum = pgEnum("notification_status", ["pending", "sent", "failed"]);

/**
 * Core user table backing auth flow with subscription and trial fields.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  subscriptionTier: subscriptionTierEnum("subscriptionTier").default("free").notNull(),
  trialStartedAt: timestamp("trialStartedAt").default(sql`now()`).notNull(),
  trialDaysRemaining: integer("trialDaysRemaining").default(30).notNull(),
  isEarlyAdopter: boolean("isEarlyAdopter").default(false).notNull(),
  trialConvertedAt: timestamp("trialConvertedAt"),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(), // Consider trigger for onUpdateNow
  lastSignedIn: timestamp("lastSignedIn").default(sql`now()`).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Early adopter counter for tracking first 10 signups
 */
export const earlyAdopterCounter = pgTable("earlyAdopterCounter", {
  id: serial("id").primaryKey(),
  slotsUsed: integer("slotsUsed").default(0).notNull(),
  maxSlots: integer("maxSlots").default(10).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type EarlyAdopterCounter = typeof earlyAdopterCounter.$inferSelect;

/**
 * Subscription tier definitions
 */
export const subscriptionTiers = pgTable("subscriptionTiers", {
  id: serial("id").primaryKey(),
  name: subscriptionTierEnum("name").notNull().unique(),
  monthlyPrice: decimal("monthlyPrice", { precision: 10, scale: 2 }),
  bookingsPerMonth: integer("bookingsPerMonth").default(-1).notNull(),
  emailRepliesPerMonth: integer("emailRepliesPerMonth").default(-1).notNull(),
  whatsappRepliesPerMonth: integer("whatsappRepliesPerMonth").default(-1).notNull(),
  socialRepliesPerMonth: integer("socialRepliesPerMonth").default(-1).notNull(),
  knowledgeBaseEditable: boolean("knowledgeBaseEditable").default(false).notNull(),
  brandedBookingPage: boolean("brandedBookingPage").default(false).notNull(),
  paypalPayments: boolean("paypalPayments").default(false).notNull(),
  teamMembers: integer("teamMembers").default(1).notNull(),
  analyticsLevel: analyticsLevelEnum("analyticsLevel").default("basic").notNull(),
});

export type SubscriptionTier = typeof subscriptionTiers.$inferSelect;

/**
 * Bookings table
 */
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime").notNull(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }),
  status: bookingStatusEnum("status").default("pending").notNull(),
  reminderSentAt: timestamp("reminderSentAt"),
  confirmationSentAt: timestamp("confirmationSentAt"),
  paymentStatus: paymentStatusEnum("paymentStatus").default("pending").notNull(),
  paymentId: varchar("paymentId", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

/**
 * Knowledge base articles
 */
export const knowledgeBase = pgTable("knowledgeBase", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  isDefault: boolean("isDefault").default(false).notNull(),
  searchKeywords: text("searchKeywords"),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type KnowledgeBaseArticle = typeof knowledgeBase.$inferSelect;
export type InsertKnowledgeBaseArticle = typeof knowledgeBase.$inferInsert;

/**
 * Email conversations with message history
 */
export const emailConversations = pgTable("emailConversations", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  senderEmail: varchar("senderEmail", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  messageHistory: text("messageHistory"), // Using text for JSON for now, can switch to jsonb if needed
  lastMessageAt: timestamp("lastMessageAt").notNull(),
  autoReplyGenerated: boolean("autoReplyGenerated").default(false).notNull(),
  autoReplyContent: text("autoReplyContent"),
  flaggedForReview: boolean("flaggedForReview").default(false).notNull(),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type EmailConversation = typeof emailConversations.$inferSelect;
export type InsertEmailConversation = typeof emailConversations.$inferInsert;

/**
 * WhatsApp conversations with message history
 */
export const whatsappConversations = pgTable("whatsappConversations", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  messageHistory: text("messageHistory"), // Using text for JSON for now, can switch to jsonb if needed
  lastMessageAt: timestamp("lastMessageAt").notNull(),
  autoReplyGenerated: boolean("autoReplyGenerated").default(false).notNull(),
  autoReplyContent: text("autoReplyContent"),
  flaggedForReview: boolean("flaggedForReview").default(false).notNull(),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type WhatsappConversation = typeof whatsappConversations.$inferSelect;
export type InsertWhatsappConversation = typeof whatsappConversations.$inferInsert;

/**
 * Usage tracking per user per month
 */
export const usageTracking = pgTable("usageTracking", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  month: date("month").notNull(),
  bookingsUsed: integer("bookingsUsed").default(0).notNull(),
  emailRepliesUsed: integer("emailRepliesUsed").default(0).notNull(),
  whatsappRepliesUsed: integer("whatsappRepliesUsed").default(0).notNull(),
  socialRepliesUsed: integer("socialRepliesUsed").default(0).notNull(),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type UsageTracking = typeof usageTracking.$inferSelect;
export type InsertUsageTracking = typeof usageTracking.$inferInsert;

/**
 * Payments table
 */
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  bookingId: integer("bookingId"),
  subscriptionId: varchar("subscriptionId", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  paymentMethod: paymentMethodEnum("paymentMethod").notNull(),
  paymentId: varchar("paymentId", { length: 255 }).notNull().unique(),
  status: paymentStatusEnum("status").default("pending").notNull(),
  invoiceId: varchar("invoiceId", { length: 255 }),
  refundId: varchar("refundId", { length: 255 }),
  refundReason: text("refundReason"),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Invoices table
 */
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  paymentId: integer("paymentId").notNull(),
  invoiceNumber: varchar("invoiceNumber", { length: 255 }).notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  pdfUrl: varchar("pdfUrl", { length: 1024 }),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

/**
 * Branded booking pages
 */
export const brandedBookingPages = pgTable("brandedBookingPages", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  customDomain: varchar("customDomain", { length: 255 }),
  logoUrl: varchar("logoUrl", { length: 1024 }),
  primaryColor: varchar("primaryColor", { length: 7 }).default("#000000").notNull(),
  secondaryColor: varchar("secondaryColor", { length: 7 }).default("#FFFFFF").notNull(),
  description: text("description"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type BrandedBookingPage = typeof brandedBookingPages.$inferSelect;
export type InsertBrandedBookingPage = typeof brandedBookingPages.$inferInsert;

/**
 * Notifications
 */
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  type: notificationTypeEnum("type").notNull(),
  recipientEmail: varchar("recipientEmail", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  body: text("body").notNull(),
  status: notificationStatusEnum("status").default("pending").notNull(),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").default(sql`now()`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`now()`).notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
