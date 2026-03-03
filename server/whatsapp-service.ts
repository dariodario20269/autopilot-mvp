/**
 * WhatsApp Service using Meta Cloud API
 * Handles all WhatsApp messaging for AutoPilot
 */

import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.instagram.com/v18.0';

export interface WhatsAppMessagePayload {
  to: string;
  body: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'document' | 'video';
}

/**
 * Send WhatsApp message via Meta Cloud API
 */
export async function sendWhatsAppMessage(payload: WhatsAppMessagePayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_API_TOKEN;

    if (!phoneNumberId || !accessToken) {
      console.error('[WhatsAppService] Missing required environment variables');
      return { success: false, error: 'WhatsApp API not configured' };
    }

    // Normalize phone number (remove non-digits, add country code if needed)
    const normalizedPhone = payload.to.replace(/\D/g, '');
    const phoneWithCountry = normalizedPhone.startsWith('355') ? normalizedPhone : `355${normalizedPhone}`;

    let messageData: any = {
      messaging_product: 'whatsapp',
      to: phoneWithCountry,
      type: 'text',
      text: { body: payload.body },
    };

    // Add media if provided
    if (payload.mediaUrl && payload.mediaType) {
      messageData = {
        messaging_product: 'whatsapp',
        to: phoneWithCountry,
        type: payload.mediaType,
        [payload.mediaType]: {
          link: payload.mediaUrl,
        },
      };
    }

    const response = await axios.post(
      `${WHATSAPP_API_URL}/${phoneNumberId}/messages`,
      messageData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`[WhatsAppService] Message sent to ${phoneWithCountry} (ID: ${response.data.messages[0]?.id})`);
    return { success: true, messageId: response.data.messages[0]?.id };
  } catch (error: any) {
    console.error('[WhatsAppService] Failed to send message:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.error?.message || String(error) };
  }
}

/**
 * Send booking confirmation via WhatsApp
 */
export async function sendWhatsAppBookingConfirmation(
  phoneNumber: string,
  customerName: string,
  businessName: string,
  bookingTitle: string,
  startTime: Date
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const message = `
Përshëndetje ${customerName}! 👋

Takimi juaj në ${businessName} është konfirmuar! ✅

📅 ${bookingTitle}
🕐 ${startTime.toLocaleString('sq-AL')}

Nëse keni nevojë të anuloni, na kontaktoni.

Faleminderit! 🙏
  `.trim();

  return sendWhatsAppMessage({
    to: phoneNumber,
    body: message,
  });
}

/**
 * Send booking reminder via WhatsApp
 */
export async function sendWhatsAppBookingReminder(
  phoneNumber: string,
  customerName: string,
  businessName: string,
  bookingTitle: string,
  startTime: Date
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const message = `
Përshëndetje ${customerName}! 👋

Kujtesë: Takimi juaj në ${businessName} është nesër! 📅

📅 ${bookingTitle}
🕐 ${startTime.toLocaleString('sq-AL')}

Nëse nuk mund të vini, ju lutemi na njoftoni.

Faleminderit! 🙏
  `.trim();

  return sendWhatsAppMessage({
    to: phoneNumber,
    body: message,
  });
}

/**
 * Send welcome message via WhatsApp
 */
export async function sendWhatsAppWelcome(
  phoneNumber: string,
  businessName: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const message = `
Mirë se vini në AutoPilot! 🚀

Përshëndetje ${businessName}!

Jemi shumë të lumtur që keni vendosur të jeni pjesë e AutoPilot. Ky sistem do t'ju ndihmojë të automatizoni rezervimet dhe komunikimin me klientët.

🎯 Hapat e Parë:
1. Identifikohuni në panelin tuaj
2. Shtoni informacione rreth shërbimeve tuaja
3. Aktivizoni AI-n për përgjigje automatike

Nëse keni pyetje, na kontaktoni këtu!

Me respekt,
Ekipi i AutoPilot 💙
  `.trim();

  return sendWhatsAppMessage({
    to: phoneNumber,
    body: message,
  });
}
