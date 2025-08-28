# AI Management Server - Ubuntu VPS Deployment Guide

A comprehensive AI-powered management server with MCP (Model Context Protocol) tools for startup operations, featuring real-time monitoring, automation, and intelligent task management.

## 🚀 Features

### Core Capabilities
- **AI Management Server**: Express.js backend with TypeScript
- **MCP Tools Integration**: 7 specialized tools for startup management
- **Real-time Communication**: WebSocket support for live updates
- **Database Management**: Prisma ORM with SQLite
- **Background Processing**: Bull queues for async tasks
- **Security**: JWT authentication, rate limiting, CORS
- **Monitoring**: Winston logging, PM2 process management
- **Production Ready**: Nginx reverse proxy, SSL certificates

### MCP Tools Available
1. **Task Manager** - Manage tasks, todos, and project items
2. **Meeting Scheduler** - Schedule and manage meetings/appointments
3. **Project Tracker** - Track project progress and milestones
4. **Document Analyzer** - Analyze documents and extract insights
5. **Email Processor** - Process and categorize emails
6. **Market Research** - Conduct competitor analysis and trends
7. **Financial Tracker** - Track expenses and financial metrics

## 📋 Prerequisites

- Ubuntu VPS (18.04 or later)
- Node.js 18+ and npm
- Domain name (for SSL)
- Google Gemini API key
- Basic Linux administration knowledge

## 🛠️ Quick Deployment

### 1. Upload Files to VPS
```bash
# Upload your project files to the VPS
scp -r /path/to/your/project/* user@your-vps:/tmp/
```

### 2. Run Deployment Script
```bash
# On your VPS
cd /tmp
sudo ./deploy-ubuntu.sh
```

### 3. Configure Environment
```bash
# Edit the environment file
sudo nano /var/www/ai-management-server/.env
```

### 4. Setup MCP Tools
```bash
cd /var/www/ai-management-server
npm run setup:mcp
```

## 📝 Manual Installation

### Step 1: System Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Step 2: Project Setup
```bash
# Create project directory
sudo mkdir -p /var/www/ai-management-server
sudo chown -R $USER:$USER /var/www/ai-management-server

# Navigate to project
cd /var/www/ai-management-server

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push
```

### Step 3: Environment Configuration
```bash
# Copy environment template
cp .env.template .env

# Edit with your values
nano .env
```

Required environment variables:
```env
# Server Configuration
NODE_ENV=production
PORT=3002
AI_SERVER_URL=https://your-domain.com

# Database
DATABASE_URL="file:./database.db"

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Google Gemini AI
GOOGLE_GEMINI_API_KEY=your-gemini-api-key

# Redis (optional, for production scaling)
REDIS_URL=redis://localhost:6379

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### Step 4: Nginx Configuration
```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/ai-management-server
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### Step 5: SSL Setup
```bash
# Enable site
sudo ln -sf /etc/nginx/sites-available/ai-management-server /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Step 6: Start Services
```bash
# Start the server with PM2
pm2 start npm --name "ai-management-server" -- run server
pm2 save
pm2 startup

# Setup auto-startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER
```

## 🔧 MCP Tools Setup

### Automatic Setup
```bash
npm run setup:mcp
```

### Manual Setup
```bash
# Using TypeScript version
npm run setup:mcp:ts
```

### Available MCP Tools

#### 1. Task Manager
```javascript
// Create a task
{
  "action": "create",
  "title": "Setup CI/CD Pipeline",
  "description": "Implement automated deployment pipeline",
  "priority": "high",
  "dueDate": "2024-02-01",
  "tags": ["devops", "automation"]
}
```

#### 2. Meeting Scheduler
```javascript
// Schedule a meeting
{
  "action": "schedule",
  "title": "Product Review Meeting",
  "description": "Weekly product development review",
  "startTime": "2024-01-25T10:00:00Z",
  "endTime": "2024-01-25T11:00:00Z",
  "attendees": ["team@company.com"],
  "meetingType": "team"
}
```

#### 3. Project Tracker
```javascript
// Update project status
{
  "action": "update",
  "projectId": "proj_001",
  "status": "active",
  "progress": 75,
  "team": ["alice@company.com", "bob@company.com"]
}
```

## 📊 API Endpoints

### Health Check
```bash
GET /api/health
```

### MCP Tools
```bash
GET    /api/mcp/tools          # List all tools
POST   /api/mcp/tools          # Register new tool
GET    /api/mcp/tools/:id      # Get tool details
PUT    /api/mcp/tools/:id      # Update tool
DELETE /api/mcp/tools/:id      # Remove tool
POST   /api/mcp/execute        # Execute tool
```

### Tasks
```bash
GET    /api/tasks              # List tasks
POST   /api/tasks              # Create task
GET    /api/tasks/:id          # Get task
PUT    /api/tasks/:id          # Update task
DELETE /api/tasks/:id          # Delete task
POST   /api/tasks/:id/complete # Complete task
```

### Projects
```bash
GET    /api/projects           # List projects
POST   /api/projects           # Create project
GET    /api/projects/:id       # Get project
PUT    /api/projects/:id       # Update project
DELETE /api/projects/:id       # Delete project
```

### Meetings
```bash
GET    /api/meetings           # List meetings
POST   /api/meetings           # Schedule meeting
GET    /api/meetings/:id       # Get meeting
PUT    /api/meetings/:id       # Update meeting
DELETE /api/meetings/:id       # Cancel meeting
```

## 🔍 Monitoring & Maintenance

### Check Server Status
```bash
# PM2 status
pm2 status

# View logs
pm2 logs ai-management-server

# Monitor resources
pm2 monit
```

### Backup Database
```bash
# Run backup script
./backup.sh

# Manual backup
cp database.db backup_$(date +%Y%m%d).db
```

### Update Deployment
```bash
# Pull latest changes
git pull origin main

# Install updates
npm install

# Restart server
pm2 restart ai-management-server
```

## 🛡️ Security Features

- **JWT Authentication**: Secure API access
- **Rate Limiting**: Prevent abuse
- **CORS Protection**: Cross-origin security
- **Helmet Security**: HTTP security headers
- **Input Validation**: Zod schema validation
- **SSL/TLS**: Encrypted connections
- **Firewall**: UFW configuration

## 📈 Performance Optimization

### Production Settings
```env
# Enable production optimizations
NODE_ENV=production
UV_THREADPOOL_SIZE=8

# Database connection pooling
DATABASE_URL="file:./database.db?connection_limit=10"

# Redis for caching (optional)
REDIS_URL=redis://localhost:6379
```

### Monitoring Metrics
- Response times
- Error rates
- Database performance
- Memory usage
- CPU utilization

## 🚨 Troubleshooting

### Common Issues

#### Server Won't Start
```bash
# Check logs
pm2 logs ai-management-server

# Check port availability
netstat -tlnp | grep :3002

# Test database connection
npx prisma db push
```

#### MCP Tools Not Working
```bash
# Verify API key
echo $GOOGLE_GEMINI_API_KEY

# Test API connectivity
curl -X GET http://localhost:3002/api/mcp/tools

# Check server logs for errors
pm2 logs ai-management-server
```

#### SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Reload Nginx
sudo systemctl reload nginx
```

## 📞 Support

For issues and questions:
1. Check the logs: `pm2 logs ai-management-server`
2. Verify configuration in `.env`
3. Test API endpoints with curl
4. Check system resources: `htop` or `top`

## 📋 Development

### Local Development
```bash
# Install dependencies
npm install

# Setup database
npm run db:generate
npm run db:push

# Start development server
npm run server:dev

# Setup MCP tools
npm run setup:mcp:ts
```

### Testing
```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📄 License

MIT License - see LICENSE file for details.

---

**Happy Deploying! 🎉**

Your AI Management Server is now ready to supercharge your startup operations with intelligent automation and real-time insights.
