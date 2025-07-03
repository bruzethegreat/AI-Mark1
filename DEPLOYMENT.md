# 🚀 AI Mark1 Deployment Guide

## Vercel Deployment Steps

### 1. Prepare Repository
```bash
# Remove .env from tracking (if committed)
git rm --cached .env
git commit -m "Remove .env from repository"

# Push to GitHub
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Vercel Setup
1. **Import Project:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings:**
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `public`
   - Install Command: `npm install`

3. **Environment Variables:**
   Add these in Vercel dashboard → Settings → Environment Variables:
   ```
   OPENROUTER_API_KEY=your_actual_api_key_here
   NODE_ENV=production
   ```

### 3. Deploy
- Click "Deploy"
- Vercel will automatically build and deploy your app
- Your app will be live at `https://your-app-name.vercel.app`

## Environment Variables Security

### ✅ Secure (Included in repo):
- `.env.example` - Template without secrets
- `vercel.json` - Configuration file
- `.gitignore` - Excludes sensitive files

### ❌ Not in repo (Excluded by .gitignore):
- `.env` - Contains actual API keys
- `server.log` - Runtime logs
- `node_modules/` - Dependencies

## Post-Deployment

### 1. Test Your Deployment
Visit your Vercel URL and test:
- ✅ **Coding Query:** "write a python function"
- ✅ **Math Query:** "solve 2x + 5 = 15"  
- ✅ **Reasoning Query:** "explain quantum physics"
- ✅ **General Query:** "what's the weather today"

### 2. Monitor Performance
- Check Vercel dashboard for function logs
- Monitor API usage in OpenRouter dashboard
- Watch for any deployment errors

### 3. Custom Domain (Optional)
- Add your custom domain in Vercel settings
- Configure DNS records
- Enable HTTPS (automatic)

## Troubleshooting

### Common Issues:

1. **"Missing API Key" Error:**
   - Check environment variables in Vercel dashboard
   - Ensure `OPENROUTER_API_KEY` is set correctly

2. **Build Failures:**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`

3. **Function Timeouts:**
   - Increase `maxDuration` in `vercel.json`
   - Optimize API calls for faster response

4. **CORS Issues:**
   - Check domain configuration
   - Verify Vercel URL in browser

## Performance Optimization

### For Production:
1. **Enable Response Caching:**
   ```javascript
   res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
   ```

2. **Monitor Function Duration:**
   - Keep under 10s for Hobby plan
   - Optimize for parallel execution

3. **Rate Limiting:**
   - Already implemented with `express-rate-limit`
   - Adjust limits based on usage

## Cost Optimization

### Free Tier Limits:
- **Vercel:** 100GB bandwidth, 100GB-hours execution
- **OpenRouter:** 50 requests/day (1000 with $10+ credits)

### Tips:
- Use parallel execution for better user experience
- Cache responses when possible
- Monitor usage in both dashboards

## Security Best Practices

✅ **Implemented:**
- Environment variables for secrets
- CSP headers with helmet
- Rate limiting
- CORS configuration
- Input validation

✅ **Additional Recommendations:**
- Regularly rotate API keys
- Monitor for unusual usage patterns
- Keep dependencies updated
- Use HTTPS only (Vercel default)

## Next Steps

After successful deployment:
1. 🔗 Share your live URL
2. 📊 Monitor usage and performance  
3. 🚀 Add custom features
4. 🎯 Optimize based on user feedback

Your AI Mark1 is now ready for the world! 🌟