# Gallery Features Documentation

## Overview
A fully-featured, modern image gallery built with **shadcn/ui** components and React. The gallery displays images from Impact Business Breakfast events with professional UI/UX design.

## 🎨 Built With shadcn/ui Components

### Components Used
- **Card** - Gallery item containers
- **Dialog** - Full-screen image viewer
- **Button** - All interactive elements
- **Input** - Search functionality
- **Select** - Category filtering
- **Badge** - Category tags
- **Skeleton** - Loading states

## ✨ Features

### 1. **Image Display**
- ✅ Grid view (default) - 1/2/3/4 columns responsive
- ✅ List view - Detailed horizontal layout
- ✅ Lazy loading for performance
- ✅ Hover effects and animations
- ✅ Responsive images with aspect ratio control
- ✅ Category badges on thumbnails

### 2. **Search & Filter**
- ✅ **Real-time search** - Filter images by title/description
- ✅ **Category filtering** - Dropdown select component
- ✅ **Combined filters** - Search + category simultaneously
- ✅ **Results counter** - Shows filtered results count
- ✅ **Clear filters** - Reset all filters button

### 3. **Pagination**
- ✅ Page navigation buttons
- ✅ Smart pagination (shows 5 pages max)
- ✅ Previous/Next buttons
- ✅ Current page indicator
- ✅ Page count display
- ✅ Auto-scroll to top on page change

### 4. **Image Viewer (Dialog)**
- ✅ **Full-screen modal** - Click any image to open
- ✅ **Navigation arrows** - Browse through images
- ✅ **Keyboard shortcuts**:
  - `←` Previous image
  - `→` Next image
  - `Esc` Close dialog
- ✅ **Image details** - Title, description, category, date
- ✅ **Download button** - Download current image
- ✅ **Responsive design** - Works on mobile/tablet/desktop

### 5. **View Modes**
- ✅ **Grid View** - Card-based layout with hover effects
- ✅ **List View** - Horizontal layout with more details
- ✅ **Toggle buttons** - Switch between views instantly
- ✅ **Persistent selection** - Maintains view mode

### 6. **Loading States**
- ✅ **Skeleton loaders** - Beautiful loading placeholders
- ✅ **Smooth transitions** - Fade in when loaded
- ✅ **Error handling** - Fallback to mock data
- ✅ **Error messages** - User-friendly error display

### 7. **API Integration**
- ✅ **Real API support** - Connects to backend API
- ✅ **Mock data fallback** - Works offline/without API
- ✅ **Auto-detection** - Switches between API/mock
- ✅ **Proper error handling** - Graceful degradation

### 8. **SEO Optimization**
- ✅ **Dynamic meta tags** - Page title, description, keywords
- ✅ **Structured data** - ImageGallery schema
- ✅ **Breadcrumbs** - Navigation schema
- ✅ **Open Graph tags** - Social media sharing
- ✅ **Twitter Card** - Twitter sharing support

### 9. **Responsive Design**
- ✅ **Mobile-first** - Optimized for all screen sizes
- ✅ **Breakpoints**:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large: 4 columns
- ✅ **Touch-friendly** - Large tap targets
- ✅ **Adaptive UI** - Layout adjusts to screen

### 10. **Performance**
- ✅ **Lazy loading** - Images load on scroll
- ✅ **Optimized images** - Proper sizing and formats
- ✅ **Pagination** - Loads 12 items per page
- ✅ **Efficient re-renders** - React optimization
- ✅ **Image caching** - Browser cache support

## 🎯 User Experience Features

### Visual Design
- Modern gradient backgrounds
- Smooth animations and transitions
- Consistent color scheme (#768f00 brand color)
- Professional typography
- Clear visual hierarchy
- Accessible contrast ratios

### Interactions
- Hover effects on cards
- Click/tap to enlarge
- Swipe/arrow navigation
- Smooth scrolling
- Visual feedback on all actions
- Loading indicators

### Information Display
- Image titles and descriptions
- Category classification
- Date stamps
- Result counts
- Page indicators
- Error messages

## 📱 Accessibility

- ✅ Keyboard navigation support
- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML structure
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Alt text on images

## 🔧 Configuration

### Items Per Page
```typescript
const itemsPerPage = 12; // Adjust as needed
```

### Default View Mode
```typescript
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
```

### API Endpoints
Configured in `.env`:
```env
VITE_BASE_API_URL=http://localhost:5500/api/v1
VITE_IMG_URL=http://localhost:5500
VITE_API_TOKEN=your_token_here
```

## 🎨 Styling

### Theme Colors
- **Primary**: #768f00 (Brand green)
- **Hover**: #5a6c00 (Darker green)
- **Background**: Gradient gray
- **Text**: Gray scale hierarchy

### Components Follow shadcn/ui Design System
- Consistent spacing
- Unified border radius
- Standard shadows
- Responsive typography

## 🚀 Usage

### Basic Navigation
1. Visit `/gallery` route
2. Browse images in grid or list view
3. Click any image to view full size
4. Use arrows or keyboard to navigate
5. Download images as needed

### Search and Filter
1. Type in search box to filter by name
2. Select category from dropdown
3. Results update automatically
4. Clear filters to reset

### Mobile Usage
1. Swipe to navigate images
2. Tap to open full view
3. Pinch to zoom (native)
4. All features work on touch

## 🔄 Data Flow

```
User Action
  ↓
Component State Update
  ↓
API Call (fetchGalleryMedia)
  ↓
Response Handling
  ↓
Fallback to Mock Data (if needed)
  ↓
Transform Data
  ↓
Update UI
  ↓
Render Cards/List Items
```

## 📊 API Response Structure

### Expected Format
```json
{
  "success": true,
  "data": {
    "media": [
      {
        "id": "uuid",
        "title": "Event Photo",
        "url": "/uploads/image.jpg",
        "type": "image",
        "isPublic": true,
        "createdAt": "2024-01-01",
        "event": {
          "title": "IBB Event",
          "category": "Conference"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 50,
      "pages": 5
    }
  }
}
```

## 🎁 Mock Data Fallback

If API fails, the gallery automatically switches to mock data with:
- 12 pre-loaded images
- 4 categories
- Full pagination support
- All features work identically

## 🔍 Search Features

### Searches In:
- Image titles
- Descriptions
- Event names
- Category names

### Search Behavior:
- Case-insensitive
- Partial matching
- Real-time results
- Combines with category filter

## 📷 Image Viewer Features

### Display
- Maximum 60vh height
- Centered on screen
- Black background
- Maintains aspect ratio

### Navigation
- Left/Right arrows
- Keyboard shortcuts
- Touch swipe (mobile)
- Circular navigation (loops)

### Information Panel
- Title (large, bold)
- Description (if available)
- Category badge
- Date formatted
- Download button

## 🎯 Best Practices Implemented

1. **Component Composition** - Small, reusable components
2. **TypeScript** - Full type safety
3. **Error Boundaries** - Graceful error handling
4. **Loading States** - Skeleton UI patterns
5. **Responsive Design** - Mobile-first approach
6. **Performance** - Lazy loading, pagination
7. **Accessibility** - WCAG compliance
8. **SEO** - Meta tags and structured data

## 🐛 Error Handling

### API Errors
- Displays warning banner
- Falls back to mock data
- Logs to console for debugging
- User can still browse

### Network Errors
- Retry mechanism
- Offline detection
- User-friendly messages
- Graceful degradation

### No Results
- Empty state UI
- Helpful message
- Clear filters button
- Suggestions to try

## 🎨 Customization

### Change Grid Columns
Update Tailwind classes:
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
```

### Change Brand Color
Replace `#768f00` throughout the file or add to Tailwind config.

### Adjust Pagination
```typescript
const itemsPerPage = 24; // More items per page
```

### Modify Animations
Update Tailwind animation classes or add custom CSS.

## 📝 File Structure

```
src/
├── pages/
│   └── Gallery.tsx          # Main gallery component
├── services/
│   └── galleryApi.ts        # API service layer
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   └── skeleton.tsx
│   └── common/
│       └── SEOHead.tsx      # SEO component
├── config/
│   └── seo.ts               # SEO configuration
└── common/
    └── Container.tsx        # Layout container
```

## 🚀 Future Enhancements

### Potential Features
- [ ] Image upload functionality
- [ ] Bulk download
- [ ] Image editing
- [ ] Share to social media
- [ ] Favorites/Bookmarks
- [ ] Slideshow mode
- [ ] Zoom controls
- [ ] Image comparison
- [ ] Comments/Reactions
- [ ] Advanced filters (date range, etc.)

## 📚 Dependencies

### Core
- React 19
- TypeScript
- Vite

### UI Libraries
- shadcn/ui components
- Radix UI primitives
- Tailwind CSS
- lucide-react icons

### Utilities
- axios (HTTP client)
- class-variance-authority
- clsx / tailwind-merge

## 🎉 Summary

This is a **production-ready, feature-complete gallery** built with modern React practices and shadcn/ui design system. It includes:

✅ All essential gallery features
✅ Professional UI/UX
✅ Full responsive design
✅ Comprehensive error handling
✅ SEO optimization
✅ Accessibility support
✅ Performance optimization
✅ TypeScript type safety

**Ready to use!** Just ensure your API is configured or use the built-in mock data fallback.

---

*Last Updated: October 11, 2025*  
*Version: 2.0*  
*Built with shadcn/ui & React 19*

