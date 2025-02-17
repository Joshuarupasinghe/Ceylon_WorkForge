import React, { useState, useRef, useEffect } from 'react';

const categoriesData = [
  { name: 'IT Services', image: 'https://via.placeholder.com/200x120?text=IT+Services', link: '/it-services' },
  { name: 'Transportation', image: 'https://via.placeholder.com/200x120?text=Transportation', link: '/transportation' },
  { name: 'Communication', image: 'https://via.placeholder.com/200x120?text=Communication', link: '/communication' },
  { name: 'Audio & Music', image: 'https://via.placeholder.com/200x120?text=Audio+&+Music', link: '/audio-music' },
  { name: 'Construction', image: 'https://via.placeholder.com/200x120?text=Construction', link: '/construction' },
  { name: 'Consulting', image: 'https://via.placeholder.com/200x120?text=Consulting', link: '/consulting' },
  { name: 'Article writing', image: 'https://via.placeholder.com/200x120?text=Article+Writing', link: '/article-writing' },
  { name: 'Teaching', image: 'https://via.placeholder.com/200x120?text=Teaching', link: '/teaching' },
  { name: 'IT Services', image: 'https://via.placeholder.com/200x120?text=IT+Services', link: '/it-services' },
  { name: 'Transportation', image: 'https://via.placeholder.com/200x120?text=Transportation', link: '/transportation' },
  { name: 'Communication', image: 'https://via.placeholder.com/200x120?text=Communication', link: '/communication' },
  { name: 'Audio & Music', image: 'https://via.placeholder.com/200x120?text=Audio+&+Music', link: '/audio-music' },
  { name: 'Construction', image: 'https://via.placeholder.com/200x120?text=Construction', link: '/construction' },
  { name: 'Consulting', image: 'https://via.placeholder.com/200x120?text=Consulting', link: '/consulting' },
  { name: 'Article writing', image: 'https://via.placeholder.com/200x120?text=Article+Writing', link: '/article-writing' },
  { name: 'Teaching', image: 'https://via.placeholder.com/200x120?text=Teaching', link: '/teaching' },
  { name: 'Audio & Music', image: 'https://via.placeholder.com/200x120?text=Audio+&+Music', link: '/audio-music' },
  { name: 'Construction', image: 'https://via.placeholder.com/200x120?text=Construction', link: '/construction' },
  { name: 'Consulting', image: 'https://via.placeholder.com/200x120?text=Consulting', link: '/consulting' },
  { name: 'Article writing', image: 'https://via.placeholder.com/200x120?text=Article+Writing', link: '/article-writing' },
  { name: 'Teaching', image: 'https://via.placeholder.com/200x120?text=Teaching', link: '/teaching' },
  { name: 'Consulting', image: 'https://via.placeholder.com/200x120?text=Consulting', link: '/consulting' },
  { name: 'Article writing', image: 'https://via.placeholder.com/200x120?text=Article+Writing', link: '/article-writing' },
  { name: 'Teaching', image: 'https://via.placeholder.com/200x120?text=Teaching', link: '/teaching' },
];

const sellersData = [
  { id: 1, name: 'Abinesh Jino', image: 'https://via.placeholder.com/150?text=Abinesh', role: 'UI/UX Designer' },
  { id: 2, name: 'Hrithik Tiwari', image: 'https://via.placeholder.com/150?text=Hrithik', role: 'Blockchain Dev' },
  { id: 3, name: 'Helen', image: 'https://via.placeholder.com/150?text=Helen', role: 'Data Scientist' },
  { id: 4, name: 'David Smith', image: 'https://via.placeholder.com/150?text=David', role: 'Web Developer' },
  { id: 5, name: 'Sarah Johnson', image: 'https://via.placeholder.com/150?text=Sarah', role: 'Mobile App Developer' },
  { id: 6, name: 'Michael Brown', image: 'https://via.placeholder.com/150?text=Michael', role: 'Data Analyst' },
];

const CombinedSection = () => {
  const [categories, setCategories] = useState(categoriesData);
  const [sellers, setSellers] = useState(sellersData.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(sellersData.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(sellersData.length / 3)) % Math.ceil(sellersData.length / 3));
  };

  useEffect(() => {
    setSellers(sellersData.slice(currentIndex * 3, (currentIndex + 1) * 3));
  }, [currentIndex]);

  const totalPages = Math.ceil(sellersData.length / 3);

  return (
    <div>
      {/* Here are Something You'd Need */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-left mb-8">
          Explore Jobs by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 block"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{category.name}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6 text-left">
            <a href="#" className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center">
              More Categories
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CombinedSection;
