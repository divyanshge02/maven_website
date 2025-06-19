# 🚀 Deployment Guide for Maven Hospital Website

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. **Sign up at [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Deploy automatically**

**Environment Variables to set in Railway:**
```
MAIL_USERNAME=mavenhospitalconsultant@gmail.com
MAIL_PASSWORD=jamm ncps umrm atni
SECRET_KEY=your-secret-key-here
```

### Option 2: Render

1. **Sign up at [Render.com](https://render.com)**
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Set build command:** `pip install -r requirements.txt`
5. **Set start command:** `gunicorn app:app`

**Environment Variables:**
```
MAIL_USERNAME=mavenhospitalconsultant@gmail.com
MAIL_PASSWORD=jamm ncps umrm atni
SECRET_KEY=your-secret-key-here
```

### Option 3: Heroku

1. **Install Heroku CLI**
2. **Login to Heroku:**
   ```bash
   heroku login
   ```
3. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```
4. **Set environment variables:**
   ```bash
   heroku config:set MAIL_USERNAME=mavenhospitalconsultant@gmail.com
   heroku config:set MAIL_PASSWORD=jamm ncps umrm atni
   heroku config:set SECRET_KEY=your-secret-key-here
   ```
5. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## Domain Configuration

### After deploying to any platform:

1. **Get your app URL** (e.g., `https://your-app.railway.app`)
2. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)
3. **Add a CNAME record:**
   - **Name:** `@` or `www`
   - **Value:** `your-app.railway.app` (or your hosting URL)
4. **Wait for DNS propagation** (up to 48 hours)

### For Railway specifically:

1. **In Railway dashboard, go to your app**
2. **Click on "Settings"**
3. **Add your custom domain**
4. **Update DNS records as instructed**

## Security Notes

⚠️ **Important:** 
- Never commit sensitive data like email passwords to Git
- Use environment variables for all sensitive information
- Consider using a dedicated email service for production

## Testing Your Deployment

1. **Visit your deployed URL**
2. **Test the contact form**
3. **Check if emails are being sent**
4. **Test all navigation links**

## Troubleshooting

### Common Issues:

1. **Email not sending:**
   - Check environment variables
   - Verify Gmail app password
   - Check hosting platform's email restrictions

2. **Static files not loading:**
   - Ensure files are in `static/` folder
   - Check file permissions

3. **Domain not working:**
   - Wait for DNS propagation
   - Check CNAME records
   - Verify hosting platform domain settings

## Support

If you encounter issues:
1. Check the hosting platform's documentation
2. Verify all environment variables are set
3. Check the deployment logs
4. Test locally first to ensure the app works 