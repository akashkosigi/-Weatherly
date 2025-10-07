# 🔑 OpenWeatherMap API Key Setup Guide

## Quick Start (5 Minutes)

### Step 1: Get Your Free API Key

1. **Visit OpenWeatherMap**:
   - Go to: https://openweathermap.org/api
   - Or directly to sign up: https://home.openweathermap.org/users/sign_up

2. **Create a Free Account**:
   - Click "Sign Up" or "Get API Key"
   - Fill in your details:
     - Username
     - Email address
     - Password
   - Agree to terms and conditions
   - Click "Create Account"

3. **Verify Your Email**:
   - Check your email inbox
   - Click the verification link sent by OpenWeatherMap
   - This activates your account

4. **Get Your API Key**:
   - Log in to your OpenWeatherMap account
   - Go to "API keys" tab (https://home.openweathermap.org/api_keys)
   - You'll see a default API key already created
   - Copy this key (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Step 2: Add API Key to Weatherly

1. **Open the Project**:
   - Navigate to your Weatherly folder
   - Open `script.js` in any text editor (VS Code, Notepad++, etc.)

2. **Find Line 6**:
   ```javascript
   const API_KEY = 'YOUR_API_KEY_HERE'; // Replace this with your actual API key
   ```

3. **Replace with Your Key**:
   ```javascript
   const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // Your actual API key
   ```

4. **Save the File**:
   - Press `Ctrl + S` (Windows) or `Cmd + S` (Mac)
   - Close the editor

### Step 3: Test the App

1. **Refresh Your Browser**:
   - Go back to the Weatherly app in your browser
   - Press `F5` or `Ctrl + R` to refresh

2. **Search for a City**:
   - Type any city name (e.g., "London", "New York", "Mumbai")
   - Click "Search" or press Enter
   - Weather data should now load!

---

## ⚠️ Important Notes

### API Key Activation Time
- **New API keys take 10-120 minutes to activate**
- If you get "Invalid API key" error immediately after setup, wait 10-15 minutes and try again
- This is normal for new accounts

### Free Tier Limits
- **60 calls per minute**
- **1,000,000 calls per month**
- More than enough for personal use!

### Keep Your API Key Private
- ⚠️ **Don't share your API key publicly**
- ⚠️ **Don't commit it to public GitHub repositories**
- For production apps, use environment variables or backend proxy

---

## 🔧 Troubleshooting

### Error: "Invalid API key"
**Solution**: 
- Wait 10-15 minutes after creating your account
- Verify you copied the entire key (no spaces)
- Check if your email is verified

### Error: "City not found"
**Solution**:
- Check spelling of city name
- Try adding country code: "London,UK" or "Paris,FR"
- Use major city names

### Error: "Failed to fetch weather data"
**Solution**:
- Check your internet connection
- Verify API key is correct
- Check browser console for detailed error (F12 → Console tab)

### Location Access Denied
**Solution**:
- Click the location icon in your browser's address bar
- Allow location access for the site
- Or manually search for your city

---

## 📊 What You Get with Free Tier

✅ Current weather data
✅ 5-day / 3-hour forecast
✅ 16-day daily forecast
✅ Historical weather data (1 year)
✅ Weather maps
✅ Air pollution data
✅ Geocoding API

---

## 🚀 Alternative: Use Demo Mode (For Testing Only)

If you want to test the app immediately without waiting for API activation, you can use this temporary demo key:

```javascript
const API_KEY = 'b6907d289e10d714a6e88b30761fae22'; // Demo key - may have rate limits
```

**⚠️ Warning**: Demo keys are shared and may hit rate limits quickly. Get your own key for reliable access!

---

## 📝 Visual Guide

### Where to Find Your API Key:

1. Login to OpenWeatherMap
2. Click on your username (top right)
3. Select "My API keys"
4. Copy the key shown in the table

```
┌─────────────────────────────────────────┐
│  API Keys                                │
├─────────────────────────────────────────┤
│  Key Name: Default                       │
│  Key: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6 │  ← Copy this!
│  Status: Active                          │
│  Created: 2025-01-07                     │
└─────────────────────────────────────────┘
```

---

## 🎯 Quick Checklist

- [ ] Created OpenWeatherMap account
- [ ] Verified email address
- [ ] Copied API key from dashboard
- [ ] Opened script.js in text editor
- [ ] Replaced 'YOUR_API_KEY_HERE' with actual key
- [ ] Saved the file
- [ ] Refreshed browser
- [ ] Tested with a city search

---

## 💡 Pro Tips

1. **Create Multiple Keys**: You can create different API keys for different projects
2. **Name Your Keys**: Give descriptive names to track usage
3. **Monitor Usage**: Check your API call statistics in the dashboard
4. **Upgrade if Needed**: If you exceed limits, upgrade to a paid plan

---

## 📧 Need Help?

- **OpenWeatherMap Support**: https://openweathermap.org/faq
- **API Documentation**: https://openweathermap.org/api
- **Community Forum**: https://openweathermap.org/community

---

**Happy Weather Tracking! 🌤️**
