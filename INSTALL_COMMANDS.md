# 🛠️ AutoPilot: Installation & Setup Commands

This guide provides all the necessary commands to set up, build, and deploy the **AutoPilot** platform in different environments.

---

## 💻 1. Local Development Setup

Run these commands to get the project running on your local machine.

### Step 1: Clone the Repository
```bash
git clone https://github.com/dariodario20269/autopilot-mvp.git
cd autopilot-mvp
```

### Step 2: Install Dependencies
```bash
# Using npm (recommended for compatibility)
npm install --legacy-peer-deps

# OR using pnpm (faster)
pnpm install
```

### Step 3: Setup Environment Variables
```bash
cp .env.example .env
# Open .env and fill in your API keys (Gemini, Supabase, Resend, etc.)
```

### Step 4: Run Database Migrations
```bash
# Generate and push schema to Supabase
npm run db:push
```

### Step 5: Start Development Server
```bash
npm run dev
```
*The app will be available at `http://localhost:3000`*

---

## 🚀 2. Production Build & Deployment

Run these commands when you are ready to build for production or deploy to a server.

### Step 1: Build the Application
```bash
# This builds both the React frontend and the Express backend
npm run build
```

### Step 2: Start Production Server
```bash
# Ensure NODE_ENV is set to production
export NODE_ENV=production
npm run start
```

---

## 🐳 3. Docker Deployment (Optional)

If you want to use Docker for a consistent production environment.

### Step 1: Build the Docker Image
```bash
docker build -t autopilot-app .
```

### Step 2: Run with Docker Compose
```bash
# This starts the app and handles networking
docker-compose up -d
```

### Step 3: View Logs
```bash
docker-compose logs -f
```

---

## 🌩️ 4. Vercel Deployment (Zero-Cost)

Vercel handles most of this automatically, but these are the settings it uses.

### Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Deploy via CLI
```bash
vercel --prod
```
*Note: It's recommended to connect your GitHub repo to Vercel for automatic deployments on every push.*

---

## 🧪 5. Testing & Maintenance

### Run All Tests
```bash
npm run test
```

### Check Typescript Types
```bash
npm run check
```

### Format Code (Prettier)
```bash
npm run format
```

---

## 📦 6. Dependency Management

### Install a New Frontend Package
```bash
npm install <package-name>
```

### Install a New Backend Package
```bash
npm install <package-name>
```

### Update All Packages
```bash
npm update
```

---

## 🧹 7. Cleanup

### Remove Build Artifacts
```bash
rm -rf dist
```

### Remove Node Modules
```bash
rm -rf node_modules
```

---

**For detailed deployment instructions, see `VERCEL_DEPLOYMENT_GUIDE.md` or `PRODUCTION_DEPLOYMENT.md`.** 🚀
