# AutoPilot Deployment Checklist

This checklist ensures all components of the AutoPilot platform are properly configured and ready for production deployment.

---

## Pre-Deployment Phase

### Infrastructure Setup
- [ ] Supabase PostgreSQL database created and accessible
- [ ] Database password is secure and stored safely
- [ ] Database connection string verified and working
- [ ] Backup strategy configured in Supabase
- [ ] Server/hosting environment provisioned (VPS, Docker host, Kubernetes cluster)
- [ ] Domain name registered and DNS configured
- [ ] SSL/TLS certificate obtained (Let's Encrypt or provider)
- [ ] Firewall rules configured to allow necessary ports (80, 443, 3000)

### API Keys & Credentials
- [ ] Google Gemini API key obtained and tested
- [ ] OpenRouter API key obtained (optional backup)
- [ ] Resend email service account created and API key obtained
- [ ] Meta Business Account created
- [ ] WhatsApp Business Account verified with phone number
- [ ] WhatsApp API token generated
- [ ] Business Account ID and Phone Number ID obtained
- [ ] OAuth portal URL configured (https://oauth.manus.im)
- [ ] JWT secret generated (use `openssl rand -base64 32`)

### Environment Configuration
- [ ] `.env.production` file created with all required variables
- [ ] All sensitive data stored in environment variables (not in code)
- [ ] `.env.production` file backed up in secure location
- [ ] `.env.production` file added to `.gitignore` (never commit secrets)

---

## Build & Containerization Phase

### Docker Setup
- [ ] Dockerfile created and tested locally
- [ ] `.dockerignore` file configured correctly
- [ ] Docker image builds successfully: `docker build -t autopilot:latest .`
- [ ] Docker image runs locally: `docker run -p 3000:3000 autopilot:latest`
- [ ] Docker Compose file (`docker-compose.yml`) created
- [ ] Docker Compose services start successfully: `docker-compose up -d`
- [ ] Health check endpoint responds: `curl http://localhost:3000/api/health`

### Database Migrations
- [ ] Drizzle ORM schema updated for PostgreSQL
- [ ] Migration files generated: `npx drizzle-kit generate`
- [ ] Migrations applied to Supabase: `npx drizzle-kit migrate`
- [ ] All 12 tables created successfully in Supabase
- [ ] Database schema verified in Supabase dashboard

---

## Application Configuration Phase

### Frontend Setup
- [ ] React build completes successfully: `npm run build`
- [ ] Build output in `dist/public` directory
- [ ] Vite environment variables configured
- [ ] OAuth portal URL set in environment variables
- [ ] App ID configured correctly
- [ ] No build warnings or errors

### Backend Setup
- [ ] Express server starts successfully
- [ ] tRPC routers configured and working
- [ ] Database connection established
- [ ] Drizzle ORM queries working
- [ ] API endpoints responding correctly
- [ ] Error handling implemented
- [ ] Logging configured

### Email Service (Resend)
- [ ] Resend API key added to environment variables
- [ ] Email service module (`email-service.ts`) implemented
- [ ] Test email sent successfully
- [ ] Email templates created in Albanian
- [ ] Sender domain verified (optional but recommended)

### WhatsApp Service (Meta Cloud API)
- [ ] Meta Cloud API token added to environment variables
- [ ] WhatsApp Business Account ID configured
- [ ] Phone Number ID configured
- [ ] WhatsApp service module (`whatsapp-service.ts`) implemented
- [ ] Test message sent successfully
- [ ] Message templates created in Albanian
- [ ] Webhook endpoint configured (if needed)

---

## Testing Phase

### Functional Testing
- [ ] User registration works
- [ ] User login works
- [ ] Dashboard loads correctly
- [ ] Booking creation works
- [ ] Booking reminders send correctly
- [ ] Email auto-reply generates responses
- [ ] WhatsApp auto-reply generates responses
- [ ] Knowledge base articles can be created and updated
- [ ] Payment processing works (test mode)
- [ ] Admin analytics dashboard displays data

### Integration Testing
- [ ] Gemini AI generates appropriate responses
- [ ] Resend email service sends emails
- [ ] Meta WhatsApp API sends messages
- [ ] Supabase database stores and retrieves data
- [ ] OAuth authentication works
- [ ] Webhooks receive and process data

### Performance Testing
- [ ] Application loads within 3 seconds
- [ ] Database queries complete within 100ms
- [ ] API responses under 500ms
- [ ] Memory usage stable under load
- [ ] No memory leaks detected

### Security Testing
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Authentication required for protected routes
- [ ] Rate limiting configured
- [ ] HTTPS enforced
- [ ] Security headers configured

---

## Deployment Phase

### Server Preparation
- [ ] Server OS updated: `sudo apt-get update && sudo apt-get upgrade`
- [ ] Docker installed and running
- [ ] Docker Compose installed
- [ ] Git installed for repository access
- [ ] Nginx installed (if using as reverse proxy)
- [ ] SSL certificate installed
- [ ] Firewall rules applied

### Application Deployment
- [ ] Repository cloned to server
- [ ] `.env.production` file copied to server
- [ ] Docker image built on server or pulled from registry
- [ ] Docker Compose services started: `docker-compose up -d`
- [ ] Application accessible on port 3000
- [ ] Nginx reverse proxy configured (if used)
- [ ] Domain pointing to server IP
- [ ] HTTPS working correctly

### Verification
- [ ] Application accessible at https://yourdomain.com
- [ ] Health check endpoint responding
- [ ] Login page loads
- [ ] Dashboard accessible after login
- [ ] Email service working
- [ ] WhatsApp service working
- [ ] Database queries working
- [ ] No errors in logs

---

## Post-Deployment Phase

### Monitoring Setup
- [ ] Application logs being collected
- [ ] Error tracking configured (e.g., Sentry)
- [ ] Performance monitoring active
- [ ] Uptime monitoring configured
- [ ] Alert notifications configured
- [ ] Daily log review scheduled

### Backup & Recovery
- [ ] Database backup scheduled (daily)
- [ ] Backup retention policy set (30 days minimum)
- [ ] Backup restoration tested
- [ ] Application configuration backed up
- [ ] Disaster recovery plan documented

### Documentation
- [ ] Production deployment guide completed
- [ ] README.md updated with production URL
- [ ] API documentation generated
- [ ] Troubleshooting guide created
- [ ] Team trained on deployment process

### Security Hardening
- [ ] Firewall rules reviewed
- [ ] SSH key-based authentication configured
- [ ] Root login disabled
- [ ] Unnecessary services disabled
- [ ] Security patches applied
- [ ] SSL/TLS certificate auto-renewal configured

---

## Go-Live Phase

### Pre-Launch
- [ ] All stakeholders notified
- [ ] Launch date confirmed
- [ ] Support team trained
- [ ] Incident response plan reviewed
- [ ] Rollback plan prepared

### Launch
- [ ] DNS updated to point to production server
- [ ] Email notifications sent to early adopters
- [ ] Social media announcements posted
- [ ] Support team on standby
- [ ] Real-time monitoring active

### Post-Launch
- [ ] Monitor application performance
- [ ] Check error logs for issues
- [ ] Respond to user feedback
- [ ] Track early adopter signups
- [ ] Document any issues encountered
- [ ] Plan for improvements

---

## Ongoing Maintenance

### Weekly Tasks
- [ ] Review application logs
- [ ] Check monitoring dashboards
- [ ] Verify backups completed
- [ ] Monitor disk space usage
- [ ] Check for security updates

### Monthly Tasks
- [ ] Review performance metrics
- [ ] Test backup restoration
- [ ] Update documentation
- [ ] Review security logs
- [ ] Plan for upcoming features

### Quarterly Tasks
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Capacity planning
- [ ] Disaster recovery drill
- [ ] Team training updates

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Project Manager | | | |
| DevOps Engineer | | | |
| Security Officer | | | |
| Product Owner | | | |

---

## Notes

Use this section to document any deviations, issues, or special configurations:

```
[Add notes here]
```

---

## Contact Information

- **Project Lead**: Dario Lloshi (dario@autopilot.al)
- **Technical Support**: support@autopilot.al
- **Emergency Contact**: +355 69 2384 239 (WhatsApp)

---

**Last Updated**: March 3, 2026
**Version**: 1.0
**Status**: Ready for Production Deployment
