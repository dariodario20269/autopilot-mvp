# Alternative Communication APIs Guide

This document outlines the selected alternatives to Twilio and SendGrid for the AutoPilot platform, with implementation details and integration instructions.

---

## 1. Email Sending: Resend vs Nodemailer

### Selected Option: **Resend**

**Resend** is a modern email API designed specifically for developers. It offers simplicity, reliability, and excellent deliverability with a straightforward Node.js SDK.

#### Why Resend?
- **Developer-friendly**: Simple API with minimal setup.
- **Excellent deliverability**: Built-in authentication (SPF, DKIM, DMARC).
- **Pricing**: Free tier with 100 emails/day, then pay-as-you-go ($0.0001 per email).
- **Node.js SDK**: Easy integration with TypeScript support.
- **Webhook support**: Automatic event tracking (bounce, delivery, etc.).

#### Setup Instructions

1.  **Create Resend Account**: Go to [Resend](https://resend.com/) and sign up.
2.  **Generate API Key**: Navigate to the API keys section and create a new key.
3.  **Add to `.env`**:
    ```
    RESEND_API_KEY="your_resend_api_key_here"
    ```
4.  **Install SDK**:
    ```bash
    npm install resend
    ```

#### Node.js Implementation Example

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    const response = await resend.emails.send({
      from: 'noreply@autopilot.al',
      to: to,
      subject: subject,
      html: body,
    });
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
```

---

## 2. WhatsApp Messaging: Meta Cloud API vs WasenderAPI

### Selected Option: **Meta Cloud API (via WhatsApp Business SDK)**

**Meta Cloud API** is the official WhatsApp Business Platform API. It provides direct access to WhatsApp messaging without intermediaries, ensuring reliability and compliance.

#### Why Meta Cloud API?
- **Official**: Direct integration with WhatsApp, no third-party intermediaries.
- **Reliability**: Backed by Meta's infrastructure.
- **Cost-effective**: Pay-per-message model ($0.0079 per message in most regions).
- **Node.js SDK**: Community-maintained SDK with TypeScript support.
- **Compliance**: Fully compliant with WhatsApp Business policies.

#### Setup Instructions

1.  **Create Meta Business Account**: Go to [Meta for Developers](https://developers.facebook.com/) and create a business account.
2.  **Create WhatsApp Business App**: Follow Meta's setup wizard to create a WhatsApp Business app.
3.  **Generate API Token**: Get your API token from the app settings.
4.  **Add to `.env`**:
    ```
    WHATSAPP_API_TOKEN="your_whatsapp_api_token"
    WHATSAPP_BUSINESS_ACCOUNT_ID="your_business_account_id"
    WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id"
    ```
5.  **Install SDK**:
    ```bash
    npm install whatsapp-business-sdk
    ```

#### Node.js Implementation Example

```typescript
import { WhatsAppBusinessSDK } from 'whatsapp-business-sdk';

const whatsapp = new WhatsAppBusinessSDK({
  accessToken: process.env.WHATSAPP_API_TOKEN,
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
});

export async function sendWhatsAppMessage(phoneNumber: string, message: string) {
  try {
    const response = await whatsapp.messages.send({
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'text',
      text: { body: message },
    });
    return response;
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    throw error;
  }
}
```

---

## 3. Alternative: Fallback to Nodemailer + Vonage SMS

If you prefer more control or want a hybrid approach, consider:

### **Nodemailer** (Email)
- **Pros**: Maximum flexibility, supports any SMTP server.
- **Cons**: Requires SMTP server setup (e.g., Gmail, custom server).
- **Use case**: When you want to use your own email infrastructure.

### **Vonage SMS API** (WhatsApp Alternative)
- **Pros**: Supports SMS, WhatsApp, and other channels.
- **Cons**: Slightly higher pricing than Meta.
- **Use case**: When you need multi-channel support.

---

## 4. Environment Variables Summary

Add these to your `.env` file:

```env
# Email (Resend)
RESEND_API_KEY="your_resend_api_key"

# WhatsApp (Meta Cloud API)
WHATSAPP_API_TOKEN="your_whatsapp_api_token"
WHATSAPP_BUSINESS_ACCOUNT_ID="your_business_account_id"
WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id"

# Database (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database"

# AI (Gemini or OpenRouter)
GEMINI_API_KEY="your_gemini_api_key"
OPENROUTER_API_KEY="your_openrouter_api_key"

# JWT
JWT_SECRET="your_jwt_secret"
```

---

## 5. Integration Checklist

- [ ] Create Resend account and generate API key.
- [ ] Create Meta Business account and WhatsApp Business app.
- [ ] Install required npm packages (`resend`, `whatsapp-business-sdk`).
- [ ] Update `.env` file with all API keys.
- [ ] Implement email sending service (see below).
- [ ] Implement WhatsApp sending service (see below).
- [ ] Update webhooks to use new services.
- [ ] Test email and WhatsApp sending in development.
- [ ] Deploy to production.
