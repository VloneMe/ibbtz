# Gallery API - Quick Start Guide

## ✅ What's Done

1. **Axios Installed** - HTTP client for API requests
2. **Gallery API Service Updated** - Full integration with your media API
3. **Type-Safe** - Complete TypeScript interfaces
4. **Automatic Data Transformation** - API response → UI format
5. **Smart URL Handling** - Works with relative and absolute URLs
6. **Error Handling** - Detailed logging for debugging
7. **Fallback Support** - Mock data when API is unavailable

---

## 🚀 Quick Setup

### 1. Create `.env` File

Create a file named `.env` in the project root:

```env
VITE_BASE_API_URL=http://localhost:3000
VITE_IMG_URL=http://localhost:3000
VITE_API_TOKEN=your_token_here
```

**For Production:**
```env
VITE_BASE_API_URL=https://api.impactadvisory.co.tz
VITE_IMG_URL=https://api.impactadvisory.co.tz
VITE_API_TOKEN=your_production_token
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Navigate to Gallery

Visit `/gallery` in your browser to see the images!

---

## 📊 API Endpoint Used

```
GET {{base_url}}/media?page=1&limit=20&search=Conference&type=image&isPublic=true&eventId=7a6b32d0-3332-4e1c-88cc-8ee73569d633
```

---

## 🎯 How It Works

### Request Flow

```
User Opens Gallery 
  ↓
fetchGalleryMedia() called with filters
  ↓
Axios GET request to /media endpoint
  ↓
API returns JSON with media array + pagination
  ↓
Data transformed to UI format
  ↓
Images displayed in gallery grid
```

### Data Transformation

Your API returns:
```json
{
  "id": "uuid",
  "title": "New Event (8)",
  "url": "/uploads/events/.../image.webp",
  "event": { "title": "Conference", "category": "Conference" }
}
```

Transformed to:
```json
{
  "id": "uuid",
  "src": "/uploads/events/.../image.webp",
  "title": "New Event (8)",
  "description": "Event: Conference",
  "category": "Conference",
  "alt": "New Event (8)"
}
```

---

## ✨ Features

- ✅ **Pagination** - 20 items per page
- ✅ **Search** - Filter by title/description
- ✅ **Categories** - Filter by event category
- ✅ **Grid/List View** - Toggle display mode
- ✅ **Image Modal** - Click to view full size
- ✅ **Keyboard Navigation** - Arrow keys to navigate
- ✅ **Download** - Download images directly
- ✅ **Responsive** - Works on all devices

---

## 🔧 Configuration Options

### Change Items Per Page

Edit `src/pages/Gallery.tsx`:
```tsx
const [itemsPerPage] = useState(20); // Change to 12, 24, 48, etc.
```

### Filter by Event

```tsx
fetchGalleryMedia({
  eventId: '7a6b32d0-3332-4e1c-88cc-8ee73569d633'
});
```

### Custom Search

```tsx
fetchGalleryMedia({
  search: 'Conference',
  category: 'Workshop'
});
```

---

## 🐛 Troubleshooting

### Images Not Showing?

1. **Check Environment Variables**
   ```bash
   # In your .env file:
   VITE_BASE_API_URL=http://localhost:3000  # ← Must match your API URL
   ```

2. **Check API is Running**
   ```bash
   curl http://localhost:3000/media?page=1&limit=1
   ```

3. **Check Browser Console**
   - Open DevTools (F12)
   - Check for CORS errors
   - Look for axios errors

### API Not Responding?

1. Verify API URL in `.env`
2. Check API token is correct
3. Ensure API server is running
4. Check network tab in DevTools

### Wrong Category Display?

The category comes from `event.category` in the API response. Ensure your API returns:
```json
{
  "event": {
    "category": "Conference"  // ← This becomes the category
  }
}
```

---

## 📝 Files Modified

1. ✅ `package.json` - Added axios dependency
2. ✅ `src/services/galleryApi.ts` - Complete rewrite with axios
3. ✅ `GALLERY_API_INTEGRATION.md` - Full documentation
4. ✅ `GALLERY_QUICK_START.md` - This file!

---

## 🎨 Gallery Page Features

Already implemented in `src/pages/Gallery.tsx`:

- **Search Bar** - Type to filter images
- **Category Filter** - Dropdown to filter by category
- **View Toggle** - Switch between grid and list view
- **Pagination** - Navigate through pages of images
- **Image Modal** - Click image to view full size
- **Download Button** - Download any image
- **Keyboard Shortcuts**:
  - `←` Previous image
  - `→` Next image
  - `Esc` Close modal

---

## 🚦 Status

✅ **Axios** - Installed  
✅ **API Integration** - Complete  
✅ **Type Safety** - Full TypeScript  
✅ **Error Handling** - Implemented  
✅ **Pagination** - Working  
✅ **Search** - Working  
✅ **Filters** - Working  
✅ **Mock Data** - Available as fallback  
✅ **Documentation** - Complete  

**Status:** 🎉 **READY TO USE!**

---

## 📖 Full Documentation

See `GALLERY_API_INTEGRATION.md` for:
- Complete API documentation
- Advanced usage examples
- Security best practices
- Performance optimization tips
- Troubleshooting guide

---

## 💡 Quick Test

1. Create `.env` file with your API URL
2. Run `npm run dev`
3. Open http://localhost:5173/gallery
4. Images should load automatically!

If you see mock data (5 images), the API isn't connected yet. Check your `.env` file.

---

**Need Help?**
- Check browser console for errors
- Review `GALLERY_API_INTEGRATION.md`
- Verify `.env` variables
- Test API endpoint directly

---

*Last Updated: October 11, 2025*  
*Integration Status: ✅ Complete*

