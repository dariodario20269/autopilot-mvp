#!/bin/bash

# AutoPilot Production Deployment Script
# This script automates the deployment process

set -e

echo "=========================================="
echo "AutoPilot Production Deployment Script"
echo "=========================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting." >&2; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "Docker Compose is required but not installed. Aborting." >&2; exit 1; }
echo "✓ Docker and Docker Compose are installed"
echo ""

# Check environment file
if [ ! -f .env.production ]; then
    echo "ERROR: .env.production file not found!"
    echo "Please create .env.production with all required environment variables."
    exit 1
fi
echo "✓ .env.production file found"
echo ""

# Build Docker image
echo "Building Docker image..."
docker build -t autopilot:latest .
echo "✓ Docker image built successfully"
echo ""

# Start services
echo "Starting services with Docker Compose..."
docker-compose up -d
echo "✓ Services started"
echo ""

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Check health
echo "Checking application health..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✓ Application is healthy"
else
    echo "WARNING: Health check failed. Checking logs..."
    docker-compose logs autopilot | tail -20
fi
echo ""

echo "=========================================="
echo "✓ Deployment completed successfully!"
echo "=========================================="
echo ""
echo "Application is running at:"
echo "  - Local: http://localhost:3000"
echo "  - Production: https://yourdomain.com"
echo ""
echo "Next steps:"
echo "1. Configure your domain DNS to point to this server"
echo "2. Set up Nginx reverse proxy (see PRODUCTION_DEPLOYMENT.md)"
echo "3. Configure SSL certificate (Let's Encrypt)"
echo "4. Monitor logs: docker-compose logs -f autopilot"
echo ""
