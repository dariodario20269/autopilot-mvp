# 🚀 AutoPilot: Vercel Deployment Guide

This guide provides step-by-step instructions to deploy the **AutoPilot** platform on **Vercel** for **completely free** using Vercel's generous free tier.

---

## 🏗️ The Zero-Cost Stack with Vercel

| Service | Provider | Free Tier Benefits |
| :--- | :--- | :--- |
| **Hosting** | **Vercel** | Unlimited deployments, auto-scaling, and free SSL. |
| **Database** | **Supabase** | 500MB storage, unlimited API requests, and built-in auth. |
| **Domain** | **Vercel Subdomain** | Professional `autopilot.vercel.app` URL with free SSL. |
| **AI Engine** | **Google Gemini** | Generous free tier for text generation and analysis. |
| **Email** | **Resend** | 3,000 emails/month free. |
| **WhatsApp** | **Meta Cloud API** | First 1,000 service conversations per month are free. |

---

## ✅ Prerequisites

Before deploying to Vercel, ensure you have:

1.  **GitHub Account**: Your code is already pushed to `dariodario20269/autopilot-mvp`.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free).
3.  **Environment Variables**: All API keys ready (Gemini, Resend, WhatsApp, Supabase).

---

## 📋 Step-by-Step Deployment

### Step 1: Connect Your GitHub Repository to Vercel

1.  Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2.  Click **"New Project"** or **"Add New..."** → **"Project"**.
3.  Select **"Import Git Repository"**.
4.  Search for and select your repository: **`dariodario20269/autopilot-mvp`**.
5.  Click **"Import"**.

### Step 2: Configure Project Settings

Vercel will automatically detect your project configuration from `vercel.json` and `vite.config.ts`. You should see:

- **Framework Preset**: `Vite` (auto-detected)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install --legacy-peer-deps` (specified in `vercel.json`)

**No changes needed** — Vercel will use the configuration from your repository.

### Step 3: Add Environment Variables

1.  In the Vercel project dashboard, go to **Settings** → **Environment Variables**.
2.  Add all the following variables:

```env
# Database (Supabase)
DATABASE_URL=postgresql://postgres.daahkvuwqgxouvohdaxm:q-JkAqN7_M_B%23tn@aws-1-eu-north-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://daahkvuwqgxouvohdaxm.supabase.co
SUPABASE_KEY=your_service_role_key

# AI
GEMINI_API_KEY=your_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_api_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# WhatsApp (Meta Cloud API)
WHATSAPP_API_TOKEN=your_whatsapp_api_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# OAuth
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
VITE_APP_ID=autopilot-mvp
OAUTH_SERVER_URL=https://oauth.manus.im

# JWT
JWT_SECRET=your_secure_jwt_secret_key

# Node Environment
NODE_ENV=production
```

3.  Click **"Save"** for each variable.

### Step 4: Deploy

1.  Click **"Deploy"** in the Vercel dashboard.
2.  Vercel will automatically:
   - Clone your repository
   - Install dependencies
   - Build the project
   - Deploy to a live URL

3.  Wait for the deployment to complete (usually 2-5 minutes).

### Step 5: Access Your Application

Once deployed, Vercel will provide a URL like:

```
https://autopilot-mvp.vercel.app
```

Your **AutoPilot** platform is now live! 🎉

---

## 🔗 Connect a Custom Domain (Optional)

If you later want to use a custom domain (e.g., `autopilot.al`):

1.  Go to **Settings** → **Domains** in your Vercel project.
2.  Click **"Add Domain"**.
3.  Enter your domain name (e.g., `autopilot.al`).
4.  Follow Vercel's instructions to update your domain's DNS records.
5.  Vercel will automatically provision an SSL certificate for your domain.

---

## 🔄 Continuous Deployment

Every time you push code to the `main` branch of your GitHub repository, Vercel will automatically:

1.  Detect the new changes.
2.  Build your project.
3.  Deploy to production.

No manual deployment needed! 🚀

---

## 📊 Monitoring & Logs

### View Deployment Logs

1.  Go to your Vercel project dashboard.
2.  Click **"Deployments"** to see all deployment history.
3.  Click on a specific deployment to view build and runtime logs.

### Monitor Performance

1.  Go to **Analytics** in your Vercel project dashboard.
2.  View real-time metrics:
   - Page load times
   - API response times
   - Error rates
   - Bandwidth usage

---

## 🛠️ Troubleshooting

### Build Fails

**Issue**: Deployment fails during the build step.

**Solution**:
1.  Check the build logs in Vercel dashboard.
2.  Ensure all dependencies are correctly listed in `package.json`.
3.  Verify environment variables are set correctly.
4.  Try redeploying by clicking **"Redeploy"** in the Vercel dashboard.

### Application Crashes After Deployment

**Issue**: The application deploys but crashes when accessed.

**Solution**:
1.  Check the runtime logs in Vercel dashboard.
2.  Verify all environment variables are set (especially `DATABASE_URL`).
3.  Ensure your Supabase database is accessible from Vercel.
4.  Check the application logs for specific error messages.

### API Requests Fail

**Issue**: Frontend loads but API calls fail.

**Solution**:
1.  Verify the `vercel.json` rewrites are correctly configured.
2.  Check that the Express server is properly handling requests.
3.  Ensure all API environment variables are set.
4.  Test the API endpoint directly using curl or Postman.

---

## 💰 Pricing

**Vercel Free Tier Includes**:
- Unlimited deployments
- Unlimited bandwidth
- Automatic scaling
- Free SSL/TLS certificates
- 100 GB bandwidth per month
- Serverless functions (limited)

**When to Upgrade**:
- If you exceed 100 GB bandwidth/month (unlikely for first 100 clients)
- If you need priority support
- If you need advanced features

---

## 📈 Scaling Up

When your business grows and you need more resources:

1.  **Upgrade to Pro Plan**: $20/month for higher limits.
2.  **Add Custom Domain**: Free (just update DNS).
3.  **Increase Database Capacity**: Upgrade Supabase plan as needed.

---

## 🔐 Security Best Practices

1.  **Environment Variables**: Never commit `.env` files to GitHub. Use Vercel's environment variable management.
2.  **API Keys**: Rotate your API keys regularly.
3.  **HTTPS**: Vercel automatically provides free SSL certificates.
4.  **Database Access**: Restrict database access to your Vercel deployment IP (if possible).

---

## 📞 Support

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **AutoPilot Support**: support@autopilot.al

---

## ✨ Summary

You now have a **production-ready AutoPilot platform** deployed on **Vercel** for **completely free**. Your application is:

- ✅ Automatically deployed on every GitHub push
- ✅ Accessible at `https://autopilot-mvp.vercel.app`
- ✅ Secured with free SSL/TLS
- ✅ Monitored and logged automatically
- ✅ Scalable to handle thousands of users

**Congratulations on your launch!** 🚀
