# AutoPilot Webhook Configuration Documentation

This document provides instructions for configuring webhooks for **SendGrid** (Email) and **Twilio** (WhatsApp) to enable AI-powered auto-replies.

---

## 1. SendGrid Webhook Configuration (Inbound Parse)

To receive incoming emails and generate AI replies:

1.  **Domain Authentication**: Ensure your domain is authenticated in SendGrid.
2.  **Inbound Parse Settings**:
    - Go to **Settings** -> **Inbound Parse**.
    - Click **Add Host & URL**.
    - **Hostname**: Use a subdomain like `replies.yourdomain.com`.
    - **Destination URL**: `https://autopilot-qwsnrudn.manus.space/api/webhooks/sendgrid`
    - **Check**: "Check for Spam" (Recommended).
3.  **MX Record**: Point the MX record of your subdomain (e.g., `replies.yourdomain.com`) to `mx.sendgrid.net`.
4.  **Testing**: Send an email to `user-{userId}@replies.yourdomain.com`. The AI will process it and generate a reply in the dashboard.

---

## 2. Twilio Webhook Configuration (WhatsApp)

To receive incoming WhatsApp messages and generate AI replies:

1.  **Twilio Console**: Go to the **Messaging** -> **Senders** -> **WhatsApp Senders**.
2.  **Webhook URL**:
    - Select your WhatsApp number (`+355682384239`).
    - Under **A MESSAGE COMES IN**, set the webhook to:
    - **URL**: `https://autopilot-qwsnrudn.manus.space/api/webhooks/twilio`
    - **Method**: HTTP POST.
3.  **Status Callback**: (Optional) Set to the same URL to track message delivery.
4.  **Testing**: Send a WhatsApp message to your Twilio number. The AI will generate a brief response (under 160 characters) based on your knowledge base.

---

## 3. Webhook Security

AutoPilot uses public procedures for webhooks but validates the payload:
- **SendGrid**: Validates the `to` address format to extract the `userId`.
- **Twilio**: Validates the `To` address format to extract the `userId`.
- **Rate Limiting**: AI generation is subject to the user's subscription tier limits.

---

## 4. Troubleshooting

- **No Reply Generated**: Check if the user has added articles to the **Knowledge Base** (FAQ category).
- **Webhook Fails**: Ensure the `DATABASE_URL` and `GEMINI_API_KEY` are correctly configured in the environment variables.
- **Logs**: Check the server logs for `[Webhooks]` entries to debug payload issues.
