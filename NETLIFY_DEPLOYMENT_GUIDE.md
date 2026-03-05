# 🚀 AutoPilot: Netlify Deployment Guide

This guide provides step-by-step instructions to deploy the **AutoPilot** platform on **Netlify** for **completely free** using Netlify's generous free tier with Netlify Functions.

---

## 🏗️ The Zero-Cost Stack with Netlify

| Service | Provider | Free Tier Benefits |
| :--- | :--- | :--- |
| **Hosting** | **Netlify** | Unlimited deployments, auto-scaling, and free SSL. |
| **Functions** | **Netlify Functions** | 125,000 invocations/month (more than enough for first 100 clients). |
| **Database** | **Supabase** | 500MB storage, unlimited API requests, and built-in auth. |
| **Domain** | **Netlify Subdomain** | Professional `autopilot.netlify.app` URL with free SSL. |
| **AI Engine** | **Google Gemini** | Generous free tier for text generation and analysis. |
| **Email** | **Resend** | 3,000 emails/month free. |
| **WhatsApp** | **Meta Cloud API** | First 1,000 service conversations per month are free. |

---

## ✅ Prerequisites

Before deploying to Netlify, ensure you have:

1.  **GitHub Account**: Your code is already pushed to `dariodario20269/autopilot-mvp`.
2.  **Netlify Account**: Sign up at [netlify.com](https://netlify.com) (free).
3.  **Environment Variables**: All API keys ready (Gemini, Resend, WhatsApp, Supabase).

---

## 📋 Step-by-Step Deployment

### Step 1: Connect Your GitHub Repository to Netlify

1.  Go to [netlify.com](https://netlify.com) and sign in with your GitHub account.
2.  Click **"Add new site"** → **"Import an existing project"**.
3.  Select **"GitHub"** as your Git provider.
4.  Search for and select your repository: **`dariodario20269/autopilot-mvp`**.
5.  Click **"Import"**.

### Step 2: Configure Build Settings

Netlify will auto-detect your project configuration from `netlify.toml`. You should see:

- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Publish Directory**: `dist/public`
- **Functions Directory**: `netlify/functions`

**No changes needed** — Netlify will use the configuration from your repository.

### Step 3: Add Environment Variables

1.  In the Netlify project dashboard, go to **Site Settings** → **Build & Deploy** → **Environment**.
2.  Click **"Edit Variables"**.
3.  Add all the following variables:

```env
# Database (Supabase)
DATABASE_URL=postgresql://postgres.daahkvuwqgxouvohdaxm:q-JkAqN7_M_B%23tn@aws-1-eu-north-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://daahkvuwqgxouvohdaxm.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYWhrdnV3cWd4b3V2b2hkYXhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjUyNjc5OSwiZXhwIjoyMDg4MTAyNzk5fQ.xgiLfoptdkc0FlsjHkxKaTP_XhAK5TNaBiExaYPUMLs

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
JWT_SECRET=6dd68daae58548add14761f0e9761c7760d1cb021392f383f4b2fec43ae8c917

# Node Environment
NODE_ENV=production
```

4.  Click **"Save"** for each variable.

### Step 4: Deploy

1.  Click **"Deploy site"** in the Netlify dashboard.
2.  Netlify will automatically:
   - Clone your repository
   - Install dependencies
   - Build the frontend and backend
   - Deploy to a live URL

3.  Wait for the deployment to complete (usually 3-5 minutes).

### Step 5: Access Your Application

Once deployed, Netlify will provide a URL like:

```
https://autopilot-mvp.netlify.app
```

Your **AutoPilot** platform is now live! 🎉

---

## 🔗 Connect a Custom Domain (Optional)

If you later want to use a custom domain (e.g., `autopilot.al`):

1.  Go to **Site Settings** → **Domain Management** → **Add Custom Domain**.
2.  Enter your domain name (e.g., `autopilot.al`).
3.  Follow Netlify's instructions to update your domain's DNS records.
4.  Netlify will automatically provision an SSL certificate for your domain.

---

## 🔄 Continuous Deployment

Every time you push code to the `main` branch of your GitHub repository, Netlify will automatically:

1.  Detect the new changes.
2.  Build your project.
3.  Deploy to production.

No manual deployment needed! 🚀

---

## 📊 Monitoring & Logs

### View Deployment Logs

1.  Go to your Netlify project dashboard.
2.  Click **"Deploys"** to see all deployment history.
3.  Click on a specific deployment to view build and function logs.

### Monitor Function Invocations

1.  Go to **Site Settings** → **Functions**.
2.  View real-time metrics:
   - Function invocations
   - Execution time
   - Error rates
   - Bandwidth usage

---

## 🛠️ Troubleshooting

### Build Fails

**Issue**: Deployment fails during the build step.

**Solution**:
1.  Check the build logs in Netlify dashboard.
2.  Ensure all dependencies are correctly listed in `package.json`.
3.  Verify environment variables are set correctly.
4.  Try redeploying by clicking **"Trigger deploy"** in the Netlify dashboard.

### API Requests Fail (404 or 500)

**Issue**: The frontend loads but API calls fail.

**Solution**:
1.  Check the function logs in Netlify dashboard (**Functions** tab).
2.  Verify all environment variables are set (especially `DATABASE_URL`).
3.  Ensure your Supabase database is accessible from Netlify.
4.  Test the API endpoint directly using curl or Postman: `https://your-site.netlify.app/api/health`

### Functions Timeout

**Issue**: API requests time out after 30 seconds.

**Solution**:
1.  Upgrade to Netlify Pro ($19/month) for longer function timeouts (up to 26 seconds).
2.  Optimize your database queries to be faster.
3.  Consider moving heavy processing to background jobs.

---

## 💰 Pricing

**Netlify Free Tier Includes**:
- Unlimited deployments
- 125,000 function invocations/month
- 100 GB bandwidth/month
- Automatic scaling
- Free SSL/TLS certificates

**When to Upgrade**:
- If you exceed 125,000 function invocations/month (unlikely for first 100 clients)
- If you need longer function execution times
- If you need priority support

---

## 📈 Scaling Up

When your business grows and you need more resources:

1.  **Upgrade to Pro Plan**: $19/month for higher limits and longer function timeouts.
2.  **Add Custom Domain**: Free (just update DNS).
3.  **Increase Database Capacity**: Upgrade Supabase plan as needed.

---

## 🔐 Security Best Practices

1.  **Environment Variables**: Never commit `.env` files to GitHub. Use Netlify's environment variable management.
2.  **API Keys**: Rotate your API keys regularly.
3.  **HTTPS**: Netlify automatically provides free SSL certificates.
4.  **Function Secrets**: Use Netlify's secret management for sensitive data.

---

## 📞 Support

- **Netlify Documentation**: https://docs.netlify.com
- **Netlify Support**: https://support.netlify.com
- **AutoPilot Support**: support@autopilot.al

---

## ✨ Summary

You now have a **production-ready AutoPilot platform** deployed on **Netlify** for **completely free**. Your application is:

- ✅ Automatically deployed on every GitHub push
- ✅ Accessible at `https://autopilot-mvp.netlify.app`
- ✅ Secured with free SSL/TLS
- ✅ Monitored and logged automatically
- ✅ Scalable to handle thousands of users

**Congratulations on your launch!** 🚀
