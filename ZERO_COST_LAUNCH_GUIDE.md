# 🚀 AutoPilot: Zero-Cost Launch Guide

This guide provides a step-by-step strategy to launch the **AutoPilot** platform for **$0.00**. We will use the best free-tier services available in 2026 to ensure your business can start automating without any upfront investment.

---

## 🏗️ The Zero-Cost Stack

| Service | Provider | Free Tier Benefits |
| :--- | :--- | :--- |
| **Hosting** | **Render** | Free web service hosting with auto-deployment from GitHub. |
| **Database** | **Supabase** | 500MB storage, unlimited API requests, and built-in auth. |
| **Domain** | **Render Subdomain** | Professional `autopilot.onrender.com` URL with free SSL. |
| **AI Engine** | **Google Gemini** | Generous free tier for text generation and analysis. |
| **Email** | **Resend** | 3,000 emails/month free with your own domain (or their test domain). |
| **WhatsApp** | **Meta Cloud API** | First 1,000 service conversations per month are free. |

---

## 1. Prepare Your GitHub Repository

1.  Ensure all your latest code is pushed to your GitHub repository: `dariodario20269/autopilot-mvp`.
2.  Make sure the `package.json` has the correct build and start scripts (already configured in the repo).

---

## 2. Set Up Your Free Database (Supabase)

*You have already done this!* Your database is ready at:
`postgresql://postgres.daahkvuwqgxouvohdaxm:[PASSWORD]@aws-1-eu-north-1.pooler.supabase.com:6543/postgres`

---

## 3. Deploy to Render (Free Hosting)

1.  **Create a Render Account**: Sign up at [render.com](https://render.com) using your GitHub account.
2.  **Create a New Web Service**:
    *   Connect your `autopilot-mvp` repository.
    *   **Name**: `autopilot-al` (or your choice).
    *   **Environment**: `Node`.
    *   **Build Command**: `npm install --legacy-peer-deps && npm run build`.
    *   **Start Command**: `npm run start`.
    *   **Plan**: Select the **Free** tier.
3.  **Add Environment Variables**:
    *   In the Render dashboard, go to the **Environment** tab and add all variables from your `.env` file:
        *   `DATABASE_URL`: Your Supabase connection string.
        *   `GEMINI_API_KEY`: Your Google AI key.
        *   `JWT_SECRET`: A random string for security.
        *   `NODE_ENV`: `production`.
        *   `RESEND_API_KEY`: Your Resend key.
        *   `WHATSAPP_API_TOKEN`: Your Meta token.
        *   ... and any others from `.env`.

---

## 4. Get Your Free Domain

Once deployed, Render will provide a URL like:
`https://autopilot-al.onrender.com`

**Pro Tip**: You can use a free URL shortener or a service like **Linktree** to make this even easier for your clients to access.

---

## 5. Free Communication Setup

### Email (Resend)
*   Sign up at [resend.com](https://resend.com).
*   On the free tier, you can send up to **3,000 emails per month**.
*   If you don't have a domain yet, you can use their provided testing domain to get started.

### WhatsApp (Meta)
*   Use the **Meta for Developers** portal.
*   The first **1,000 conversations** each month are **free**. This is more than enough for your first 10-20 clients!

---

## 💰 Total Monthly Cost: $0.00

| Item | Cost |
| :--- | :--- |
| Hosting | $0.00 |
| Database | $0.00 |
| Domain/SSL | $0.00 |
| AI Processing | $0.00 |
| Email Sending | $0.00 |
| WhatsApp API | $0.00 |
| **TOTAL** | **$0.00** |

---

## 📈 Scaling Up

When you get your first 10 paying clients, you can use that revenue to:
1.  **Buy a Custom Domain**: (approx. $10/year for `.com` or `.al`).
2.  **Upgrade Hosting**: Move to a paid Render plan ($7/month) to prevent the "spin-up" delay on the free tier.

---

**You are now ready to launch without any financial risk!** 🚀
