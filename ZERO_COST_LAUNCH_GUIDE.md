# 🚀 AutoPilot: Zero-Cost Launch Guide

This guide provides a step-by-step strategy to launch the **AutoPilot** platform for **$0.00**. We will use the best free-tier services available in 2026 to ensure your business can start automating without any upfront investment.

---

## 🏗️ The Zero-Cost Stack

| Service | Provider | Free Tier Benefits |
| :--- | :--- | :--- |
| **Hosting** | **Vercel** | Unlimited deployments, auto-scaling, and free SSL. |
| **Database** | **Supabase** | 500MB storage, unlimited API requests, and built-in auth. |
| **Domain** | **Vercel Subdomain** | Professional `autopilot.vercel.app` URL with free SSL. |
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

## 3. Deploy to Vercel (Free Hosting)

1.  **Create a Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
2.  **Import Your Repository**:
    *   Click **"New Project"** → **"Import Git Repository"**.
    *   Select your `autopilot-mvp` repository.
    *   Click **"Import"**.
3.  **Vercel will auto-detect**:
    *   **Framework**: Vite (from `vite.config.ts`).
    *   **Build Command**: `npm run build`.
    *   **Output Directory**: `dist`.
4.  **Add Environment Variables**:
    *   In the Vercel dashboard, go to **Settings** → **Environment Variables**.
    *   Add all variables from your `.env` file:
        *   `DATABASE_URL`: Your Supabase connection string.
        *   `GEMINI_API_KEY`: Your Google AI key.
        *   `JWT_SECRET`: A random string for security.
        *   `NODE_ENV`: `production`.
        *   `RESEND_API_KEY`: Your Resend key.
        *   `WHATSAPP_API_TOKEN`: Your Meta token.
        *   ... and any others from `.env`.
5.  **Click "Deploy"** and wait 2-5 minutes for your application to go live!

---

## 4. Get Your Free Domain

Once deployed, Vercel will provide a URL like:
`https://autopilot-mvp.vercel.app`

**Pro Tip**: You can later add a custom domain (e.g., `autopilot.al`) for free through Vercel's domain management. See the `VERCEL_DEPLOYMENT_GUIDE.md` for details.

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
| Vercel Hosting | $0.00 |
| Supabase Database | $0.00 |
| Domain/SSL | $0.00 |
| Google Gemini AI | $0.00 |
| Resend Email | $0.00 |
| Meta WhatsApp API | $0.00 |
| **TOTAL** | **$0.00** |

---

## 📈 Scaling Up

When you get your first 10 paying clients, you can use that revenue to:
1.  **Buy a Custom Domain**: (approx. $10/year for `.com` or `.al`) and connect it to Vercel for free.
2.  **Upgrade Vercel**: Move to a paid plan ($20/month) for higher limits (though you likely won't need this for a while).

---

## 📖 Detailed Vercel Setup

For a complete step-by-step guide with screenshots and troubleshooting, see **`VERCEL_DEPLOYMENT_GUIDE.md`** in your repository.

---

**You are now ready to launch without any financial risk!** 🚀
