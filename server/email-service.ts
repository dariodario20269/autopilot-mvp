/**
 * Email Service using Resend API
 * Handles all email sending for AutoPilot
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send email via Resend
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await resend.emails.send({
      from: 'AutoPilot <noreply@autopilot.al>',
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo || 'support@autopilot.al',
    });

    if (response.error) {
      console.error('[EmailService] Resend error:', response.error);
      return { success: false, error: response.error.message };
    }

    console.log(`[EmailService] Email sent to ${payload.to} (ID: ${response.data?.id})`);
    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error('[EmailService] Failed to send email:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(
  customerEmail: string,
  customerName: string,
  businessName: string,
  bookingTitle: string,
  startTime: Date,
  endTime: Date
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const html = `
    <h2>Konfirmimi i Takimit</h2>
    <p>Përshëndetje ${customerName},</p>
    <p>Takimi juaj për <strong>${bookingTitle}</strong> në <strong>${businessName}</strong> është konfirmuar.</p>
    <p><strong>Data dhe Ora:</strong> ${startTime.toLocaleString('sq-AL')}</p>
    <p><strong>Përfundim:</strong> ${endTime.toLocaleString('sq-AL')}</p>
    <p>Nëse keni nevojë të anuloni ose të ndryshoni takimin, ju lutemi na kontaktoni.</p>
    <p>Me respekt,<br>${businessName}</p>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Konfirmimi i Takimit: ${bookingTitle}`,
    html,
  });
}

/**
 * Send booking reminder email
 */
export async function sendBookingReminder(
  customerEmail: string,
  customerName: string,
  businessName: string,
  bookingTitle: string,
  startTime: Date
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const html = `
    <h2>Kujtesë për Takimin Tuaj</h2>
    <p>Përshëndetje ${customerName},</p>
    <p>Kjo është një kujtesë miqësore për takimin tuaj nesër në <strong>${businessName}</strong>.</p>
    <p><strong>Shërbimi:</strong> ${bookingTitle}</p>
    <p><strong>Ora:</strong> ${startTime.toLocaleString('sq-AL')}</p>
    <p>Nëse nuk mund të vini, ju lutemi na njoftoni sa më shpejt.</p>
    <p>Me respekt,<br>${businessName}</p>
  `;

  return sendEmail({
    to: customerEmail,
    subject: `Kujtesë: Takimi juaj në ${businessName}`,
    html,
  });
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(
  userEmail: string,
  businessName: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const html = `
    <h2>Mirë se vini në AutoPilot!</h2>
    <p>Përshëndetje ${businessName},</p>
    <p>Jemi shumë të lumtur që keni vendosur të jeni pjesë e AutoPilot. Ky është fillimi i një rrugëtimi ku teknologjia AI do t'ju ndihmojë të kurseni kohë dhe të rritni fitimet.</p>
    <h3>Hapat e Parë:</h3>
    <ol>
      <li>Identifikohuni në panelin tuaj: <a href="https://autopilot-qwsnrudn.manus.space/">https://autopilot-qwsnrudn.manus.space/</a></li>
      <li>Plotësoni Profilin: Shtoni logon tuaj dhe ngjyrat e biznesit.</li>
      <li>Trajnoni AI-n tuaj: Shkoni te "Knowledge Base" dhe shtoni informacione rreth çmimeve dhe shërbimeve.</li>
      <li>Lidhni Kanalet: Aktivizoni webhooks për Email dhe WhatsApp.</li>
      <li>Shpërndani Faqen e Rezervimeve: Vendoseni linkun tuaj të ri në Instagram/Facebook bio.</li>
    </ol>
    <p>Nëse keni nevojë për ndihmë, na shkruani në WhatsApp ose përgjigjuni këtij emaili.</p>
    <p>Me respekt,<br>Ekipi i AutoPilot</p>
  `;

  return sendEmail({
    to: userEmail,
    subject: 'Mirë se vini në AutoPilot!',
    html,
  });
}
