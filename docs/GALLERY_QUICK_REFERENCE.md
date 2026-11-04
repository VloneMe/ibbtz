# Gallery Quick Reference

## 🚀 Quick Start

Navigate to `/gallery` in your browser to see the gallery in action!

## 🎨 Built with shadcn/ui

All UI components use the shadcn/ui design system for consistency and accessibility.

## ⚡ Key Features

### View Modes
- **Grid View** - Default, responsive card layout
- **List View** - Detailed horizontal layout
- Toggle with buttons in the toolbar

### Search & Filter
```
1. Type in search box → Press Enter or Click Search
2. Select category from dropdown
3. Results update automatically
```

### Image Viewer
```
Click any image → Opens full-screen dialog
← → Arrow keys → Navigate images
Esc → Close dialog
Download button → Save image
```

### Pagination
```
12 images per page
Smart page navigation (shows 5 pages max)
Previous/Next buttons
```

## 🎯 shadcn/ui Components Used

| Component | Purpose |
|-----------|---------|
| `Card` | Gallery item containers |
| `Dialog` | Full-screen image viewer |
| `Button` | All interactive elements |
| `Input` | Search functionality |
| `Select` | Category dropdown |
| `Badge` | Category tags |
| `Skeleton` | Loading placeholders |

## 🎨 Brand Colors

- Primary: `#768f00` (Green)
- Hover: `#5a6c00` (Dark Green)

## 📱 Responsive Breakpoints

| Screen | Columns |
|--------|---------|
| Mobile | 1 |
| Tablet | 2 |
| Desktop | 3 |
| Large | 4 |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Close image viewer |
| `←` | Previous image |
| `→` | Next image |

## 🔧 Configuration

### Change Items Per Page
Line 53: `const itemsPerPage = 12;`

### Change Default View
Line 59: `const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');`

## 📦 New Components Installed

```bash
npm install @radix-ui/react-dialog @radix-ui/react-select
```

## 📁 Files Created/Modified

### New Files
- `src/components/ui/card.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/skeleton.tsx`

### Modified Files
- `src/pages/Gallery.tsx` (Complete rewrite with shadcn/ui)

## 🎨 Component Examples

### Card Usage
```tsx
<Card>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Dialog Usage
```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### Select Usage
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

## 🐛 Troubleshooting

### Images Not Loading?
1. Check `.env` file has correct API URLs
2. Check browser console for errors
3. Verify API is running
4. Gallery will fallback to mock data automatically

### Styling Issues?
1. Ensure Tailwind CSS is configured
2. Check `tailwind.config.js` has proper content paths
3. Verify all shadcn/ui components are in `src/components/ui/`

### TypeScript Errors?
1. Run `npm install` to ensure all deps are installed
2. Check `@radix-ui/react-dialog` and `@radix-ui/react-select` are installed
3. Restart TypeScript server in IDE

## 📊 API Integration

### Works With
- Real API (automatic detection)
- Mock data fallback (seamless)
- Proxy configuration (development)

### API Response Handling
```typescript
// Handles multiple response structures:
if (Array.isArray(data)) → Use directly
else if (data.data) → Extract data.data
else if (data.media) → Extract data.media
else → Use empty array
```

## ✨ Features Checklist

- ✅ Search functionality
- ✅ Category filtering
- ✅ Grid/List view toggle
- ✅ Pagination
- ✅ Full-screen image viewer
- ✅ Keyboard navigation
- ✅ Download images
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ SEO optimization
- ✅ Accessibility

## 🎯 Usage Tips

1. **For Best Performance**: Use pagination instead of loading all images
2. **For Better UX**: Enable lazy loading on images
3. **For SEO**: Ensure alt text on all images
4. **For Mobile**: Test touch gestures and responsive layout

## 🔐 Environment Variables

```env
VITE_BASE_API_URL=http://localhost:5500/api/v1
VITE_IMG_URL=http://localhost:5500
VITE_API_TOKEN=your_token
```

Leave empty in development to use Vite proxy.

## 📝 Next Steps

1. Configure your API endpoints in `.env`
2. Start dev server: `npm run dev`
3. Navigate to `/gallery`
4. Test all features
5. Customize colors/layout as needed

## 🎉 That's It!

You now have a fully-featured, production-ready gallery with shadcn/ui!

---

*Built with React 19, TypeScript, shadcn/ui, and Tailwind CSS*

