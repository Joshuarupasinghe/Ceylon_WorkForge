import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Category data with relevant images
const categoriesData = [
  { name: 'IT Services', image: '/public/imges/defining-what-is-an-it-service.png', link: '/it-services', count: 145 },
  { name: 'Construction', image: '/public/imges/Construction.png', link: '/construction', count: 64 },
  { name: 'Communication', image: '/public/imges/commu.webp', link: '/communication', count: 112 },
  { name: 'Audio & Music', image: '/public/imges/Audio&music.png', link: '/audio-music', count: 78 },
  { name: 'Transportation', image: '/public/imges/Transportation.png', link: '/transportation', count: 89 },
  { name: 'Consulting', image: '/public/imges/Consulting.png', link: '/consulting', count: 93 },
  { name: 'Article writing', image: '/public/imges/Article-Rewriter-.webp', link: '/article-writing', count: 127 },
  { name: 'Teaching', image: '/public/imges/teaching.png', link: '/teaching', count: 86 },
  { name: 'Marketing', image: '/public/imges/Marketing-Digital.png', link: '/marketing', count: 155 },
  { name: 'Design', image: '/public/imges/Design.jpg', link: '/design', count: 168 },
  { name: 'Photography & Video', image: '/public/imges/Photography & Video.jpeg', link: '/photography-video', count: 93 },
  { name: 'Event Organizing', image: '/public/imges/Event Organizing.jpg', link: '/event-organizing', count: 58 },
  
];


const CategoryPage = () => {
  const [categories, setCategories] = useState(categoriesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Custom color scheme
  const colors = {
    darkNavy: '#222831',
    slateGray: '#393E46',
    teal: '#00ADB5',
    offWhite: '#EEEEEE'
  };

  // Filter categories based on search query
  useEffect(() => {
    const filtered = searchQuery 
      ? categoriesData.filter(category => 
          category.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : categoriesData;
    
    setCategories(filtered);
  }, [searchQuery]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // This would typically navigate to a category detail page or update the UI
    // For demo purposes, we're just storing the selected category
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      {/* Header Section */}
      <header className="bg-white shadow-sm ">
        <div className="container mx-auto px-4 py-6 ">
          <h1 className="text-3xl font-bold text-gray-800">Service Categories</h1>
          <p className="text-gray-600 mt-2">Find freelance services by category</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderColor: colors.teal }}
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="w-full md:w-auto flex space-x-2">
            <select 
              className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{ borderColor: colors.teal }}
            >
              <option>All Categories</option>
              <option>Popular Categories</option>
              <option>New Categories</option>
            </select>
            
            <button 
              className="py-3 px-6 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.teal }}
            >
              Filter
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No categories found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategorySelect(category);
                }}
              >
                <div className="relative h-48">
                  {/* Replace with actual images when available */}
                  <img
                    src={category.image || `/api/placeholder/400/300?text=${encodeURIComponent(category.name)}`}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{category.count} jobs available</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Popular Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoriesData.slice(0, 4).map((category, index) => (
              <a
                key={`popular-${index}`}
                href={category.link}
                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ borderLeft: `4px solid ${colors.teal}` }}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} jobs</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Category Section */}
{categoriesData.length > 0 && (
  <div className="mt-16 bg-white rounded-xl shadow-md overflow-hidden p-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Categories</h2>
    
    <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
      {categoriesData.slice(0, 3).map((category, index) => (
        <div key={index} className="flex-shrink-0 w-full md:w-1/3 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={category.image || `/api/placeholder/600/400?text=${encodeURIComponent(category.name)}`}
              alt={category.name}
              className="h-64 w-full object-cover"
            />
            <div 
              className="absolute top-3 left-3 px-3 py-1 text-sm rounded-full bg-opacity-50"
              style={{ backgroundColor: `${colors.teal}20`, color: colors.teal }}
            >
              Featured
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
            <p className="mt-2 text-gray-600">
              Discover high-quality services in {category.name}. With {category.count} active jobs, your next opportunity awaits!
            </p>
            <a
              href={category.link}
              className="mt-4 inline-block px-6 py-3 rounded-lg text-white font-medium transition duration-300 hover:shadow-lg"
              style={{ backgroundColor: colors.teal }}
            >
              Explore {category.name}
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

  </main>

      
      <div className="mt-16 py-12 text-center" style={{ backgroundColor: colors.slateGray }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Join thousands of freelancers and clients who are already using our platform
            to connect, collaborate, and create amazing work together.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              className="px-8 py-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.teal }}
            >
              Find Services
            </button>
            <button 
              className="px-8 py-3 rounded-lg font-medium border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Offer Services


            </button>
          </div>
        </div>
      </div>
      <div className="bg-white py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
    <p className="text-gray-600 mb-8">Discover the benefits of joining our freelancing marketplace.</p>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Feature 1 */}
      <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-gray-100 hover:shadow-lg transition">
        <img src="/public/imges/securesvg.svg" alt="Security" className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800">Secure Transactions</h3>
        <p className="text-gray-600 mt-2">Your payments are protected, ensuring a safe and reliable experience.</p>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-gray-100 hover:shadow-lg transition">
        <img src="/public/imges/community-svgrepo-com.svg" alt="Community" className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800">Trusted Community</h3>
        <p className="text-gray-600 mt-2">Join thousands of verified freelancers and clients worldwide.</p>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col items-center p-6 rounded-lg shadow-md bg-gray-100 hover:shadow-lg transition">
        <img src="/public/imges/support-svgrepo-com.svg" alt="Support" className="h-16 w-16 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800"> Good Support</h3>
        <p className="text-gray-600 mt-2">Our support team is available around the clock to assist you.</p>
      </div>

    </div>
  </div>
</div>

    </div>

    
  );
};

export default CategoryPage;