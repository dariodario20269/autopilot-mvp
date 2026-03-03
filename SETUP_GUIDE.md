# AutoPilot Platform Setup Guide

This guide walks you through the complete setup process for the AutoPilot platform with Supabase, Resend, and Meta Cloud API.

---

## Phase 1: Supabase Database Setup

### Step 1: Create Supabase Project
1.  Go to [Supabase](https://supabase.com/) and sign up or log in.
2.  Click **New Project** and fill in the project details.
3.  Choose a strong database password and save it securely.
4.  Wait for the project to be created (usually 2-3 minutes).

### Step 2: Get Connection String
1.  In your Supabase project, go to **Settings** → **Database** → **Connection String**.
2.  Copy the PostgreSQL connection string (it looks like: `postgresql://user:password@host:port/database`).
3.  Add it to your `.env` file:
    ```
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```

### Step 3: Run Database Migrations
1.  Ensure all environment variables are set in `.env`.
2.  Run the Drizzle migrations:
    ```bash
    npx drizzle-kit generate:pg
    npx drizzle-kit migrate
    ```
3.  Verify that all tables have been created in Supabase.

---

## Phase 2: Email Setup (Resend)

### Step 1: Create Resend Account
1.  Go to [Resend](https://resend.com/) and sign up.
2.  Verify your email address.

### Step 2: Generate API Key
1.  In your Resend dashboard, go to **API Keys**.
2.  Click **Create API Key** and copy it.
3.  Add it to your `.env` file:
    ```
    RESEND_API_KEY="your_resend_api_key"
    ```

### Step 3: Verify Sender Domain (Optional but Recommended)
1.  In Resend, go to **Domains**.
2.  Add your domain (e.g., `autopilot.al`).
3.  Follow the DNS verification steps.
4.  Once verified, you can send emails from `noreply@autopilot.al`.

---

## Phase 3: WhatsApp Setup (Meta Cloud API)

### Step 1: Create Meta Business Account
1.  Go to [Meta for Developers](https://developers.facebook.com/).
2.  Create a new app or use an existing one.
3.  Select **WhatsApp** as the product.

### Step 2: Set Up WhatsApp Business Account
1.  In your Meta app, go to **WhatsApp** → **Getting Started**.
2.  Follow the setup wizard to create a WhatsApp Business Account.
3.  Verify your phone number (this will be your WhatsApp sender number).

### Step 3: Generate API Token
1.  Go to **Settings** → **User Access Tokens**.
2.  Generate a new token with `whatsapp_business_messaging` permissions.
3.  Copy the token and add it to your `.env` file:
    ```
    WHATSAPP_API_TOKEN="your_whatsapp_api_token"
    WHATSAPP_BUSINESS_ACCOUNT_ID="your_business_account_id"
    WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id"
    ```

### Step 4: Configure Webhooks (Optional)
1.  In your Meta app, go to **Configuration** → **Webhooks**.
2.  Set the callback URL to: `https://your-domain.com/api/webhooks/whatsapp`
3.  Set the verify token to a secure random string.

---

## Phase 4: AI Configuration

### Option A: Use Gemini API (Recommended)
1.  The `GEMINI_API_KEY` is already configured in your `.env` file.
2.  No additional setup required.

### Option B: Use OpenRouter API
1.  The `OPENROUTER_API_KEY` is already configured in your `.env` file.
2.  You can switch by updating the LLM service in `server/gemini-llm.ts`.

---

## Phase 5: Environment Variables Checklist

Ensure all these variables are set in your `.env` file:

```env
# Database (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database"

# AI
GEMINI_API_KEY="your_gemini_api_key"
OPENROUTER_API_KEY="your_openrouter_api_key"

# Email (Resend)
RESEND_API_KEY="your_resend_api_key"

# WhatsApp (Meta Cloud API)
WHATSAPP_API_TOKEN="your_whatsapp_api_token"
WHATSAPP_BUSINESS_ACCOUNT_ID="your_whatsapp_business_account_id"
WHATSAPP_PHONE_NUMBER_ID="your_whatsapp_phone_number_id"

# JWT
JWT_SECRET="your_jwt_secret"

# Manus Forge (for notifications)
FORGE_API_URL="your_forge_api_url"
FORGE_API_KEY="your_forge_api_key"
```

---

## Phase 6: Build and Deploy

### Step 1: Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Step 2: Build Frontend
```bash
npm run build
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Deploy to Production
Follow the Manus deployment guide to deploy to production.

---

## Phase 7: Testing

### Test Email Sending
1.  Use the email service to send a test email:
    ```typescript
    import { sendEmail } from './server/email-service';
    await sendEmail({
      to: 'test@example.com',
      subject: 'Test Email',
      html: '<p>This is a test email</p>',
    });
    ```

### Test WhatsApp Sending
1.  Use the WhatsApp service to send a test message:
    ```typescript
    import { sendWhatsAppMessage } from './server/whatsapp-service';
    await sendWhatsAppMessage({
      to: '+355692384239',
      body: 'This is a test message',
    });
    ```

### Test Database Connection
1.  Verify that the database connection is working by checking the logs.
2.  Ensure that all tables are accessible from the application.

---

## Troubleshooting

### Database Connection Issues
- Ensure the `DATABASE_URL` is correct and the Supabase project is running.
- Check that your IP address is whitelisted in Supabase.

### Email Sending Issues
- Verify that the `RESEND_API_KEY` is correct.
- Check the Resend dashboard for any errors or rate limits.

### WhatsApp Sending Issues
- Ensure the `WHATSAPP_API_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` are correct.
- Verify that your WhatsApp Business Account is in good standing.

---

## Next Steps

1.  Set up the branded booking page.
2.  Configure the knowledge base with your business information.
3.  Test the AI reply generation with sample emails and messages.
4.  Deploy to production and monitor performance.
