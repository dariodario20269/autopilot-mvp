# AutoPilot - AI Business Automation Platform

**AutoPilot** is a production-ready AI-powered business automation platform designed specifically for service-based businesses in Fier County, Albania. It automates booking management, customer communications, and AI-powered responses using Google Gemini 2.5 Pro.

---

## 🎯 Features

### Core Functionality

- **Smart Booking System**: Calendar integration with no-show prevention and automated reminders
- **AI Email Auto-Reply**: Intelligent email responses using Gemini 2.5 Pro with knowledge base context
- **AI WhatsApp Auto-Reply**: Automated WhatsApp messaging with conversation threading
- **Knowledge Base CMS**: Train your AI with business-specific information
- **Multi-Tier Subscription System**: Free, Basic, and Pro plans with early adopter program
- **Admin Dashboard**: Real-time analytics and performance metrics
- **Branded Booking Pages**: Customizable pages with your logo and colors
- **Payment Processing**: PayPal integration for subscription management
- **Background Jobs**: Automated reminders, receipts, and notifications
- **Webhook Integration**: SendGrid and Twilio webhooks for incoming messages
- **SMS Reminders**: Twilio SMS integration for booking reminders
- **Email Templates**: Branded email templates for all communications
- **Multilingual Support**: English and Albanian language support
- **Responsive Design**: Bootstrap-based responsive UI

---

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI framework
- **TypeScript**: Type-safe development
- **Bootstrap**: Responsive design framework
- **shadcn/ui**: Component library
- **Vite**: Fast build tool

### Backend
- **Express 4**: Web server framework
- **tRPC 11**: Type-safe API layer
- **Node.js**: JavaScript runtime
- **Drizzle ORM**: Database abstraction

### Database
- **PostgreSQL** (via Supabase): Reliable relational database

### AI & Communication
- **Google Gemini 2.5 Pro**: Advanced AI model for intelligent responses
- **Resend**: Modern email API for transactional emails
- **Meta Cloud API**: Official WhatsApp Business Platform integration

### Deployment
- **Docker**: Containerization for easy deployment
- **Docker Compose**: Multi-container orchestration
- **Kubernetes**: Optional for large-scale deployments

---

## 📋 Prerequisites

- **Node.js 22+**: JavaScript runtime
- **npm or pnpm**: Package manager
- **Docker & Docker Compose**: For containerized deployment
- **Supabase Account**: PostgreSQL database hosting
- **Gemini API Key**: Google AI API key
- **Resend Account**: Email service provider
- **Meta Business Account**: WhatsApp Business Platform access

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/dariodario20269/autopilot-mvp.git
cd autopilot-mvp
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:password@host:port/database"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="your_service_role_key"

# AI
GEMINI_API_KEY="your_gemini_api_key"
OPENROUTER_API_KEY="your_openrouter_api_key"

# Email (Resend)
RESEND_API_KEY="your_resend_api_key"

# WhatsApp (Meta Cloud API)
WHATSAPP_API_TOKEN="your_whatsapp_api_token"
WHATSAPP_BUSINESS_ACCOUNT_ID="your_business_account_id"
WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id"

# OAuth
VITE_OAUTH_PORTAL_URL="https://oauth.manus.im"
VITE_APP_ID="autopilot-mvp"
OAUTH_SERVER_URL="https://oauth.manus.im"

# JWT
JWT_SECRET="your_secure_jwt_secret"
```

### 4. Run Database Migrations

```bash
npx drizzle-kit migrate
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 📦 Production Deployment

### Using Docker Compose

```bash
docker-compose up -d
```

### Using Kubernetes

```bash
kubectl apply -f k8s-deployment.yaml
```

For detailed deployment instructions, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md).

---

## 📚 Documentation

- **[Setup Guide](./SETUP_GUIDE.md)**: Complete setup instructions for all services
- **[Alternative APIs Guide](./ALTERNATIVE_APIS_GUIDE.md)**: Email and WhatsApp service alternatives
- **[Database Migration Plan](./DATABASE_MIGRATION_PLAN.md)**: MySQL to PostgreSQL migration details
- **[Webhook Documentation](./WEBHOOK_DOCS.md)**: Webhook configuration for SendGrid and Twilio
- **[Production Deployment](./PRODUCTION_DEPLOYMENT.md)**: Production deployment guide

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout
- `GET /api/auth/me`: Get current user

### Bookings
- `GET /api/bookings`: List all bookings
- `POST /api/bookings`: Create a new booking
- `PUT /api/bookings/:id`: Update a booking
- `DELETE /api/bookings/:id`: Delete a booking

### Knowledge Base
- `GET /api/knowledge-base`: List all articles
- `POST /api/knowledge-base`: Create a new article
- `PUT /api/knowledge-base/:id`: Update an article
- `DELETE /api/knowledge-base/:id`: Delete an article

### Email Conversations
- `GET /api/email-conversations`: List all conversations
- `POST /api/email-conversations`: Create a new conversation
- `GET /api/email-conversations/:id`: Get conversation details

### WhatsApp Conversations
- `GET /api/whatsapp-conversations`: List all conversations
- `POST /api/whatsapp-conversations`: Create a new conversation
- `GET /api/whatsapp-conversations/:id`: Get conversation details

### Payments
- `GET /api/payments`: List all payments
- `POST /api/payments`: Create a new payment
- `GET /api/payments/:id`: Get payment details

---

## 🧪 Testing

### Run Tests

```bash
npm run test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 🆘 Support

For support and questions:

- **Email**: support@autopilot.al
- **WhatsApp**: +355 69 2384 239
- **Documentation**: https://autopilot.al/docs
- **Issues**: https://github.com/dariodario20269/autopilot-mvp/issues

---

## 🎉 Acknowledgments

- **Google Gemini**: For advanced AI capabilities
- **Supabase**: For reliable PostgreSQL hosting
- **Resend**: For modern email infrastructure
- **Meta**: For WhatsApp Business Platform
- **React & Node.js Community**: For amazing tools and frameworks

---

## 📊 Project Status

- **Version**: 1.0.0
- **Status**: Production Ready
- **Last Updated**: March 3, 2026
- **Maintainer**: Dario Lloshi (Gaming Repository)

---

## 🔐 Security

AutoPilot takes security seriously. For security concerns or vulnerabilities, please email security@autopilot.al instead of using the issue tracker.

---

## 📈 Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] Advanced analytics dashboard
- [ ] Integration with popular CRMs
- [ ] Multi-language support expansion
- [ ] AI-powered customer insights
- [ ] Automated marketing campaigns
- [ ] Voice call automation
- [ ] Video conferencing integration

---

**Built with ❤️ for businesses in Fier, Albania**
