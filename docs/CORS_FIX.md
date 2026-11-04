# CORS Fix - Gallery Images Loading Solution

## Problem Fixed

**Error:** `The resource was blocked due to its Cross-Origin-Resource-Policy header`

**Cause:** Frontend running on `http://localhost:5046` trying to load images from backend API on `http://localhost:5500` - different origins causing CORS issues.

---

## ✅ Solution Implemented

### 1. **Vite Proxy Configuration**

Updated `vite.config.ts` to proxy all API and image requests through the same origin:

```typescript
server: {
  proxy: {
    // Proxy API requests
    '/api': {
      target: 'http://localhost:5500',
      changeOrigin: true,
    },
    // Proxy media endpoint
    '/media': {
      target: 'http://localhost:5500',
      changeOrigin: true,
    },
    // Proxy image uploads
    '/uploads': {
      target: 'http://localhost:5500',
      changeOrigin: true,
      secure: false,
    },
    // Proxy events endpoint
    '/events': {
      target: 'http://localhost:5500',
      changeOrigin: true,
    },
  },
  port: 5046,
}
```

### 2. **Updated Gallery API Service**

Modified `src/services/galleryApi.ts` to use relative URLs in development:

```typescript
// Development: Use relative URL (goes through proxy)
// Production: Use absolute URL from env variable
const isDevelopment = import.meta.env.DEV;
const baseUrl = isDevelopment ? '' : import.meta.env.VITE_BASE_API_URL;

// API calls now use:
// Development: '/media' → proxied to localhost:5500/media
// Production: 'https://api.yourdomain.com/media' → direct call
```

### 3. **Updated Image URL Handler**

Modified `getMediaUrl()` function to return relative URLs in development:

```typescript
export const getMediaUrl = (mediaItem: MediaItem): string => {
  const isDevelopment = import.meta.env.DEV;
  
  if (isDevelopment && mediaItem.url.startsWith('/')) {
    return mediaItem.url; // Returns: /uploads/events/.../image.jpg
  }
  
  // In production, prepends full domain
  return `${imgUrl}${mediaItem.url}`;
};
```

---

## 🚀 How to Apply the Fix

### **IMPORTANT: Restart the Dev Server**

The Vite proxy configuration only works when the server is restarted:

```bash
# Stop the current dev server (Ctrl+C)

# Restart it
npm run dev
```

---

## How It Works

### Before (CORS Error):
```
Frontend (localhost:5046)
    ↓ GET http://localhost:5500/media
    ✗ CORS Error! Different origins
```

### After (Working):
```
Frontend (localhost:5046)
    ↓ GET /media (relative URL)
    ↓ Vite Proxy intercepts
    ↓ Forwards to localhost:5500/media
    ↓ Returns with same-origin headers
    ✓ Success! Same origin as far as browser knows
```

---

## Request Flow

### API Requests:
1. **Browser:** `GET /media?page=1`
2. **Vite Proxy:** Intercepts request
3. **Backend:** `GET http://localhost:5500/media?page=1`
4. **Response:** Proxied back with correct headers
5. **Browser:** Receives response (no CORS error!)

### Image Requests:
1. **Browser:** `<img src="/uploads/events/.../image.jpg" />`
2. **Vite Proxy:** Intercepts `/uploads` path
3. **Backend:** `http://localhost:5500/uploads/events/.../image.jpg`
4. **Image:** Served with correct headers
5. **Browser:** Displays image (no CORS error!)

---

## Environment Configuration

### Development (Automatic)
No `.env` configuration needed! Uses Vite proxy automatically.

### Production
Set these in your `.env` file:

```env
VITE_BASE_API_URL=https://api.impactadvisory.co.tz
VITE_IMG_URL=https://api.impactadvisory.co.tz
VITE_API_TOKEN=your_production_token
```

---

## Verification

After restarting the dev server, check:

### 1. **Network Tab**
Open DevTools → Network tab:
- API calls should show: `http://localhost:5046/media` (not 5500!)
- Images should show: `http://localhost:5046/uploads/...` (not 5500!)
- Status should be `200 OK` for all requests

### 2. **Gallery Page**
- Navigate to `/gallery`
- Images should load without CORS errors
- Check browser console - no red error messages

### 3. **Image URLs**
```javascript
// In browser console:
const img = document.querySelector('img');
console.log(img.src);
// Should show: http://localhost:5046/uploads/...
// NOT: http://localhost:5500/uploads/...
```

---

## Troubleshooting

### Images Still Not Loading?

**1. Did you restart the dev server?**
```bash
# You MUST restart after changing vite.config.ts
npm run dev
```

**2. Check Vite proxy is working:**
```bash
# In browser console:
fetch('/media?page=1&limit=1')
  .then(r => r.json())
  .then(console.log)
```

**3. Check backend is running:**
```bash
# Make sure your API server is running on port 5500
curl http://localhost:5500/media?page=1&limit=1
```

**4. Check proxy configuration:**
Look for this in terminal when starting dev server:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5046/
➜  Network: use --host to expose
```

### Still Getting CORS Errors?

**Check these:**
1. ✅ Dev server restarted after config change
2. ✅ Backend API running on port 5500
3. ✅ No hardcoded `http://localhost:5500` URLs in code
4. ✅ Browser cache cleared (Ctrl+Shift+R)

---

## Production Deployment

For production, ensure:

### 1. **Environment Variables Set**
```env
VITE_BASE_API_URL=https://api.yourdomain.com
VITE_IMG_URL=https://api.yourdomain.com
```

### 2. **Backend CORS Headers**
Your API should set proper CORS headers:

```javascript
// Express example
app.use(cors({
  origin: 'https://ibb.impactadvisory.co.tz',
  credentials: true
}));
```

### 3. **Build & Deploy**
```bash
npm run build
# Deploy 'dist' folder to your hosting
```

---

## Alternative Solutions (If Needed)

### Option 1: Backend CORS Configuration
If you prefer not to use a proxy, configure backend CORS:

```javascript
// Add to your backend API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});
```

### Option 2: Nginx Reverse Proxy
In production, use nginx to serve both frontend and API:

```nginx
server {
  listen 80;
  
  location / {
    # Serve frontend
    root /var/www/frontend;
  }
  
  location /media {
    # Proxy to API
    proxy_pass http://localhost:5500;
  }
  
  location /uploads {
    # Proxy to API
    proxy_pass http://localhost:5500;
  }
}
```

---

## Files Modified

1. ✅ `vite.config.ts` - Added proxy configuration
2. ✅ `src/services/galleryApi.ts` - Updated to use relative URLs in dev
3. ✅ `CORS_FIX.md` - This documentation

---

## Summary

**What Changed:**
- Vite now proxies all `/media`, `/uploads`, `/api`, `/events` requests
- Gallery API uses relative URLs in development
- Images load through the proxy in development
- Production uses absolute URLs (no proxy needed)

**Result:**
✅ No more CORS errors  
✅ Images load successfully  
✅ API calls work properly  
✅ Same code works in dev and production  

---

**Status:** ✅ **FIXED - Restart Dev Server to Apply**

**Action Required:**
```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

*Last Updated: October 11, 2025*  
*Solution Type: Vite Development Proxy*

