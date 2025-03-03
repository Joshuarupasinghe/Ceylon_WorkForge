import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Enhanced categories with more specific dummy images
const categoriesData = [
  { name: 'IT Services', image: '/api/placeholder/200/120?text=IT+Services', link: '/it-services', count: 145 },
  { name: 'Transportation', image: '/api/placeholder/200/120?text=Transportation', link: '/transportation', count: 89 },
  { name: 'Communication', image: '/api/placeholder/200/120?text=Communication', link: '/communication', count: 112 },
  { name: 'Audio & Music', image: '/api/placeholder/200/120?text=Audio+%26+Music', link: '/audio-music', count: 78 },
  { name: 'Construction', image: '/api/placeholder/200/120?text=Construction', link: '/construction', count: 64 },
  { name: 'Consulting', image: '/api/placeholder/200/120?text=Consulting', link: '/consulting', count: 93 },
  { name: 'Article writing', image: '/api/placeholder/200/120?text=Article+Writing', link: '/article-writing', count: 127 },
  { name: 'Teaching', image: '/api/placeholder/200/120?text=Teaching', link: '/teaching', count: 86 },
  { name: 'Marketing', image: '/api/placeholder/200/120?text=Marketing', link: '/marketing', count: 155 },
  { name: 'Design', image: '/api/placeholder/200/120?text=Design', link: '/design', count: 168 },
  { name: 'Video Production', image: '/api/placeholder/200/120?text=Video+Production', link: '/video-production', count: 72 },
  { name: 'Photography', image: '/api/placeholder/200/120?text=Photography', link: '/photography', count: 93 },
];

// Enhanced sellers with more realistic dummy images
const sellersData = [
  { id: 1, name: 'Abinesh Jino', image: '/api/placeholder/150/150?text=Abinesh+J', role: 'UI/UX Designer' },
  { id: 2, name: 'Hrithik Tiwari', image: '/api/placeholder/150/150?text=Hrithik+T', role: 'Blockchain Dev' },
  { id: 3, name: 'Helen Thompson', image: '/api/placeholder/150/150?text=Helen+T', role: 'Data Scientist' },
  { id: 4, name: 'David Smith', image: '/api/placeholder/150/150?text=David+S', role: 'Web Developer' },
  { id: 5, name: 'Sarah Johnson', image: '/api/placeholder/150/150?text=Sarah+J', role: 'Mobile App Developer' },
  { id: 6, name: 'Michael Brown', image: '/api/placeholder/150/150?text=Michael+B', role: 'Data Analyst' },
];

const EnhancedCategorySection = () => {
  const [categories, setCategories] = useState(categoriesData);
  const [visibleCategories, setVisibleCategories] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShowingAll, setIsShowingAll] = useState(false);

  // Custom color scheme from the provided image
  const colors = {
    darkNavy: '#222831',
    slateGray: '#393E46',
    teal: '#00ADB5',
    offWhite: '#EEEEEE'
  };

  useEffect(() => {
    const filtered = searchQuery 
      ? categoriesData.filter(category => 
          category.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : categoriesData;
    
    setCategories(filtered);
  }, [searchQuery]);

  const handleShowMore = () => {
    if (isShowingAll) {
      setVisibleCategories(8);
    } else {
      setVisibleCategories(categories.length);
    }
    setIsShowingAll(!isShowingAll);
  };

  // Function to create a themed placeholder image URL with a background color matching our theme
  const getThemedImageUrl = (category) => {
    const baseUrl = category.image;
    // Add a background color parameter that matches our theme's teal color
    return `${baseUrl}&bg=${encodeURIComponent(colors.teal.replace('#', ''))}&text_color=FFFFFF`;
  };

  return (
    <div style={{ backgroundColor: colors.slateGray }} className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold" style={{ color: colors.darkNavy }}>
            Explore Jobs by Category
          </h2>
          
          {/* Search bar */}
          <div className="relative mt-4 md:mt-0 w-full md:w-64">
            <input
              type="text"
              placeholder="Search categories"
              className="w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ 
                backgroundColor: colors.offWhite, 
                borderColor: colors.slateGray,
                color: colors.darkNavy,
                focusRing: colors.teal 
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5" style={{ color: colors.slateGray }} />
          </div>
        </div>
        
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p style={{ color: colors.slateGray }}>No categories found matching your search.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.slice(0, visibleCategories).map((category, index) => (
                <a
                  key={index}
                  href={category.link}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                  style={{ backgroundColor: colors.slateGray }}
                >
                  <div className="relative">
                    <img
                      src={getThemedImageUrl(category)}
                      alt={category.name}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ backgroundColor: 'rgba(0, 173, 181, 0.85)' }}>
                      <span className="text-white font-bold text-lg block text-center">{category.name}</span>
                      <span className="text-white/90 text-sm mt-1 block text-center">{category.count} jobs available</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            {categories.length > 8 && (
              <div className="mt-8 text-center">
                <button 
                  onClick={handleShowMore} 
                  className="font-medium py-2 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
                  style={{ 
                    backgroundColor: colors.teal,
                    color: colors.offWhite
                  }}
                >
                  {isShowingAll ? 'Show Less' : 'View All Categories'}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className={`w-5 h-5 ml-1 transition-transform ${isShowingAll ? 'rotate-180' : ''}`}
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedCategorySection;