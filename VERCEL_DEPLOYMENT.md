# 🚀 Ustaz AI - Vercel Deployment Guide
## Islamic Education Assistant - Digital Dakwah Platform

### Prerequisites
- Node.js 18+ installed
- Vercel account (sign up at https://vercel.com)
- GitHub repository (recommended)

### Quick Deployment

#### 1. Install Vercel CLI (Already Done)
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```
Follow the browser authentication process.

#### 3. Deploy to Vercel
```bash
# For production deployment
vercel --prod

# For preview deployment
vercel
```

#### 4. Configure Environment Variables
In your Vercel dashboard or via CLI:
```bash
vercel env add OPENAI_API_KEY
vercel env add GOOGLE_API_KEY
vercel env add CODE
```

### Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT models | Yes |
| `GOOGLE_API_KEY` | Google Gemini API key | Optional |
| `CODE` | Access password | Optional |
| `ANTHROPIC_API_KEY` | Claude API key | Optional |
| `DEEPSEEK_API_KEY` | DeepSeek API key | Optional |

### Project Configuration

The project is pre-configured with:
- ✅ Optimized `vercel.json` for Islamic education platform
- ✅ Security headers for content protection
- ✅ API routes with proper timeout settings
- ✅ Singapore region deployment (sin1) for better performance
- ✅ Build optimization with Sharp for images

### Deployment Scripts

#### Windows (deploy-vercel.bat)
```cmd
# Run the deployment script
deploy-vercel.bat
```

#### Manual Deployment
```bash
# Link project (first time only)
vercel link

# Deploy to production
vercel --prod

# Check deployment status
vercel ls
```

### Post-Deployment Checklist

- [ ] Verify the deployment URL
- [ ] Test language switching (English/Malay)
- [ ] Test AI chat functionality
- [ ] Check plugin system (14 plugins)
- [ ] Test responsive design
- [ ] Verify PWA installation
- [ ] Test voice features (TTS/STT)

### Custom Domain (Optional)

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Configure DNS records

### Troubleshooting

#### Build Fails
```bash
# Clear cache and retry
vercel --prod --force
```

#### Environment Variables Not Working
```bash
# Check environment variables
vercel env ls

# Redeploy after adding env vars
vercel --prod
```

#### Performance Issues
- Check Vercel Analytics in dashboard
- Monitor function execution times
- Consider upgrading to Pro plan for higher limits

### Support
- **Developer**: Rodhi Rahman
- **Platform**: Digital Dakwah Platform
- **Email**: admin@digitaldakwah.org
- **Website**: https://cloud.digitaldakwah.org

---
**Built with ❤️ for the Muslim community**
