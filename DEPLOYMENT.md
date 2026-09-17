# Deployment Guide

This guide covers various deployment options for Immoben.

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "Import Project"
5. Select your Immoben repository
6. Vercel will auto-detect Next.js settings
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

## Deploy to Railway

1. Visit [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your Immoben repository
6. Railway will auto-detect settings
7. Click "Deploy"

## Deploy to Render

1. Visit [render.com](https://render.com)
2. Click "New +"
3. Select "Web Service"
4. Connect your GitHub repository
5. Settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

## Deploy with Docker

### Create Dockerfile

Already included in the repository at `/Dockerfile`.

### Build and Run

```bash
# Build image
docker build -t immoben .

# Run container
docker run -p 3000:3000 immoben
```

### Deploy to Docker Hub

```bash
# Tag image
docker tag immoben username/immoben:latest

# Push to Docker Hub
docker push username/immoben:latest
```

## Environment Variables

For production deployments, set these environment variables:

- `NODE_ENV=production`
- Add any additional variables from `.env.example`

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test issue creation
- [ ] Test issue filtering and search
- [ ] Check responsive design on mobile
- [ ] Verify API routes work
- [ ] Monitor performance
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure analytics if needed

## Custom Domain

### Vercel
1. Go to Project Settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to Site Settings
2. Click "Domain management"
3. Add custom domain
4. Configure DNS

## SSL/HTTPS

Most platforms (Vercel, Netlify, etc.) provide automatic SSL certificates via Let's Encrypt.

## Monitoring

Consider setting up:
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring (UptimeRobot)
- Log aggregation

## Scaling

For high traffic:
- Use a CDN (automatic on Vercel/Netlify)
- Implement caching strategies
- Optimize images
- Use serverless functions efficiently
- Consider a backend database instead of mock data

## Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs

### Runtime Errors
- Check environment variables
- Review server logs
- Verify API routes

## Support

For deployment issues, check:
- Platform-specific documentation
- GitHub Issues
- Community forums
