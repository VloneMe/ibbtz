import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoadingControl } from '@/components/common/withPageLoading';
import { 
  fetchGalleryMedia, 
  getMockGalleryData, 
  getMediaUrl, 
  downloadMedia,
  type MediaItem, 
  type GalleryFilters 
} from '@/services/galleryApi';
import { seoConfig, generateStructuredData, generateBreadcrumb } from '@/config/seo';
import SEOHead from '@/components/common/SEOHead';
import { Container } from '@/common/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Grid3x3, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Image as ImageIcon,
  Calendar,
  // AlertCircle,
  LayoutGrid,
  List,
  Play,
  Pause
} from 'lucide-react';

export default function Gallery() {
  // State management
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [_, setError] = useState<string | null>(null);
  const { setLoadingWithMessage } = usePageLoadingControl();
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>(['all']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const itemsPerPage = 12;

  // Fetch gallery data
  const loadGalleryData = async (filters: GalleryFilters = {}) => {
    setLoadingWithMessage(true, 'Loading gallery...');
    setError(null);
    
    try {
      // Try to fetch from API first
      const response = await fetchGalleryMedia({
        page: filters.page || currentPage,
        limit: itemsPerPage,
        search: filters.search || searchTerm,
        category: filters.category || selectedCategory,
        ...filters,
      });
      
      setMediaItems(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalItems(response.pagination.totalItems);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(response.data.map(item => item.category).filter(Boolean) as string[])];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('API failed, using mock data:', err);
      
      // Fallback to mock data
      const mockResponse = getMockGalleryData({
        page: filters.page || currentPage,
        limit: itemsPerPage,
        search: filters.search || searchTerm,
        category: filters.category || selectedCategory,
      });
      
      setMediaItems(mockResponse.data);
      setTotalPages(mockResponse.pagination.totalPages);
      setTotalItems(mockResponse.pagination.totalItems);
      
      // Extract unique categories from mock data
      const uniqueCategories = ['all', ...new Set(mockResponse.data.map(item => item.category).filter(Boolean) as string[])];
      setCategories(uniqueCategories);
      
      setError('Using local gallery data. API connection unavailable.');
    } finally {
      setLoading(false);
      setLoadingWithMessage(false);
    }
  };

  // Load data on mount and when filters change
  useEffect(() => {
    loadGalleryData();
  }, [currentPage, setLoadingWithMessage]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadGalleryData({ search: searchTerm, category: selectedCategory });
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    loadGalleryData({ search: searchTerm, category });
  };

  // Handle image click
  const handleImageClick = (item: MediaItem) => {
    setSelectedImage(item);
    setIsAutoPlaying(true); // Start autoplay when image is clicked
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsAutoPlaying(false); // Stop autoplay when dialog closes
  };

  // Handle download
  const handleDownload = (item: MediaItem) => {
    downloadMedia(item);
  };

  // Navigate to next image in modal
  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = mediaItems.findIndex(item => item.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % mediaItems.length;
      setSelectedImage(mediaItems[nextIndex]);
      setIsAutoPlaying(false); // Pause autoplay when user manually navigates
    }
  };

  // Navigate to previous image in modal
  const handlePrevious = () => {
    if (selectedImage) {
      const currentIndex = mediaItems.findIndex(item => item.id === selectedImage.id);
      const previousIndex = currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1;
      setSelectedImage(mediaItems[previousIndex]);
      setIsAutoPlaying(false); // Pause autoplay when user manually navigates
    }
  };

  // Toggle autoplay
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!selectedImage || !isAutoPlaying) return;

    const autoPlayInterval = setInterval(() => {
      const currentIndex = mediaItems.findIndex(item => item.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % mediaItems.length;
      setSelectedImage(mediaItems[nextIndex]);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(autoPlayInterval);
  }, [selectedImage, isAutoPlaying, mediaItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, mediaItems]);

  // SEO structured data
  const structuredData = [
    generateStructuredData('organization'),
    generateBreadcrumb('Gallery', seoConfig.pages.gallery.url),
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "IBB+ Event Gallery",
      description: "Photos and videos from Impact Business Breakfast events in Tanzania",
      url: seoConfig.pages.gallery.url,
      image: mediaItems.map(item => getMediaUrl(item)),
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -8,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Remove the old loading skeleton since we're using the global page loader

  return (
    <>
      <SEOHead
        title={seoConfig.pages.gallery.title}
        description={seoConfig.pages.gallery.description}
        keywords={seoConfig.pages.gallery.keywords}
        url={seoConfig.pages.gallery.url}
        image={mediaItems[0] ? getMediaUrl(mediaItems[0]) : seoConfig.site.logo}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-500 via-white/500 to-[#012557] py-16">
        <Container className='px-4'>
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-[#768f00]/10 px-4 py-2 rounded-full text-[#768f00] text-sm font-medium mb-6"
            >
              <ImageIcon className="h-4 w-4" />
              <span>Photo Gallery</span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              Event Gallery
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Explore moments from our Impact Business Breakfast events
            </motion.p>
          </motion.div>

          {/* Search and Filters Bar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-8 border-gray-200 shadow-sm">
              <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search gallery..."
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" className="bg-[#768f00] hover:bg-[#5a6c00]">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>

                {/* Category Filter */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap">
                    <Filter className="w-4 h-4" />
                    <span>Category:</span>
                  </div>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Results count */}
              {!loading && (
                <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>
                    Showing {mediaItems.length} of {totalItems} images
                    {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                  </span>
                </div>
              )}
              </CardContent>
            </Card>
          </motion.div>


          {/* Loading state is now handled by the global page loader */}

          {/* Gallery Grid */}
          {!loading && mediaItems.length > 0 && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {mediaItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <Card
                    onClick={() => handleImageClick(item)}
                    className="group cursor-pointer overflow-hidden border-gray-200 shadow-md"
                  >
                  {viewMode === 'grid' ? (
                    <>
                      {/* Grid View */}
                      <div className="aspect-square overflow-hidden bg-gray-100 relative">
                        <img
                          src={getMediaUrl(item)}
                          alt={item.alt || item.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        {item.category && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-[#768f00] hover:bg-[#5a6c00] text-white shadow-md">
                              {item.category}
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#768f00] transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {item.description}
                          </p>
                        )}
                        {item.date && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </CardContent>
                    </>
                  ) : (
                    <>
                      {/* List View */}
                      <div className="flex gap-4 p-4">
                        <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={getMediaUrl(item)}
                            alt={item.alt || item.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-[#768f00] transition-colors">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3">
                            {item.category && (
                              <Badge variant="outline" className="border-[#768f00] text-[#768f00]">
                                {item.category}
                              </Badge>
                            )}
                            {item.date && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(item.date).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!loading && mediaItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-dashed border-2">
                <CardContent className="text-center py-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Grid3x3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setCurrentPage(1);
                        loadGalleryData({ search: '', category: 'all' });
                      }}
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <motion.div 
              className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setCurrentPage(pageNumber)}
                        className={currentPage === pageNumber ? 'bg-[#768f00] hover:bg-[#5a6c00]' : ''}
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </motion.div>
          )}
        </Container>
      </div>

      {/* Image Modal Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && handleCloseModal()}>
        {selectedImage && (
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
            <div className="relative">
              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={handlePrevious}
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              </motion.div>

              {/* Autoplay Toggle Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={toggleAutoPlay}
                  title={isAutoPlaying ? "Pause Autoplay (Space)" : "Resume Autoplay (Space)"}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isAutoPlaying ? 'pause' : 'play'}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isAutoPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={handleNext}
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </motion.div>

              {/* Image with AnimatePresence for smooth transitions */}
              <div className="w-full bg-black relative overflow-hidden">
                <AnimatePresence mode="wait" custom={1}>
                  <motion.img
                    key={selectedImage.id}
                    src={getMediaUrl(selectedImage)}
                    alt={selectedImage.alt || selectedImage.title}
                    className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>

              {/* Image Info */}
              <motion.div 
                className="p-6 bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-2">
                    {selectedImage.title}
                  </DialogTitle>
                  
                  {/* Conditional Description - Show custom info only for "New Event (8)" */}
                  {selectedImage.title === "New Event (8)" ? (
                    <div className="space-y-2 mt-3">
                      <DialogDescription className="text-base font-semibold text-gray-900">
                        Event: Annual Business Conference 2025
                      </DialogDescription>
                      <DialogDescription className="text-base text-gray-600">
                        10/12/2025
                      </DialogDescription>
                    </div>
                  ) : (
                    selectedImage.description && (
                      <DialogDescription className="text-base">
                        {selectedImage.description}
                      </DialogDescription>
                    )
                  )}
                </DialogHeader>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    {selectedImage.category && (
                      <Badge className="bg-[#768f00] hover:bg-[#5a6c00] text-white">
                        {selectedImage.category}
                      </Badge>
                    )}
                    {/* Show date only if NOT "New Event (8)" (since we show custom date above) */}
                    {selectedImage.date && selectedImage.title !== "New Event (8)" && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(selectedImage.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => handleDownload(selectedImage)}
                    className="bg-[#768f00] hover:bg-[#5a6c00]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </motion.div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

