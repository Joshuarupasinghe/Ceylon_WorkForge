import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const ServiceCard = ({ title, imageUrl, color }) => (
  <div className={`${color} rounded-lg overflow-hidden h-64 transition-transform hover:scale-105 cursor-pointer`}>
    <div className="relative h-full">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg- bg-opacity-40 flex items-end">
        <h3 className="text-xl font-bold text-white p-6 w-full text-center">
          {title}
        </h3>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const services = [
    { id: 1, title: "WEB DEVELOPMENT", imageUrl: "/imges/WEB develeper.png", color: "bg-purple-600" },
    { id: 2, title: "LOGO DESIGN", imageUrl: "/imges/logo desing.png", color: "bg-blue-500" },
    { id: 3, title: "SEO", imageUrl: "/imges/SEO.png", color: "bg-green-500" },
    { id: 4, title: "VIDEO EDITING", imageUrl: "/imges/Video Editing.png", color: "bg-indigo-600" },
    { id: 5, title: "MOBILE APPS", imageUrl: "/imges/mobile dev.png", color: "bg-pink-500" },
    { id: 6, title: "UI/UX DESIGN", imageUrl: "/imges/Ui:Ux .png", color: "bg-yellow-500" },
    { id: 7, title: "CONTENT WRITING", imageUrl: "/imges/content writing.png", color: "bg-teal-500" },
    { id: 8, title: "DIGITAL MARKETING", imageUrl: "/imges/Digital marketing.png", color: "bg-orange-500" }
  ];
  
  

  const features = [
    { id: 1, title: 'Feature 1', description: 'Find the perfect match for your project needs. Connect with skilled professionals.' },
    { id: 2, title: 'Feature 2', description: 'Secure payments, clear milestones, and guaranteed satisfaction with every project.' },
    { id: 3, title: 'Feature 3', description: 'Real-time collaboration tools and seamless communication channels.' }
  ];

  const sellers = [
    { id: 1, name: 'John Smith', rating: 4.9, image: 'imges/john smith.webp' },
    { id: 2, name: 'Emma Wilson', rating: 4.8, image: 'imges/emma wilson.jpeg' },
    { id: 3, name: 'Michael Brown', rating: 4.9, image: 'imges/michael brown .webp' }
  ];

  const resources = [
    { id: 1, title: 'Perfect Project Pitch', image: 'public/imges/perfect project .png', description: 'Learn how to create compelling project proposals' },
    { id: 2, title: 'Freelance Success Guide', image: 'imges/freelance succes.png', description: 'Essential tips for freelancing success' },
    { id: 3, title: 'Business Growth Tips', image: 'imges/tips.png', description: 'Strategies to scale your freelance business' }
  ];

  const categoriesData = [
    { name: 'IT Services', image: 'imges/IT services.png', link: '/it-services'},
    { name: 'Transportation', image: 'imges/Transportation.png', link: '/transportation' },
    { name: 'Communication', image: 'imges/Communication.png', link: '/communication' },
    { name: 'Audio & Music', image: 'imges/Audio&music.png', link: '/audio-music' },
    { name: 'Construction', image: 'imges/Construction.png', link: '/construction' },
    { name: 'Consulting', image: 'imges/Consulting.png', link: '/consulting' },
    { name: 'Article writing', image: 'imges/Article writing.png', link: '/article-writing' },
    { name: 'Teaching', image: 'public/imges/teaching.png', link: '/teaching' }
  ];

  const visibleServices = 4;
  const maxIndex = services.length - visibleServices;

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Ceylon WorkForce
              </h1>
              <p className="text-xl mb-6">FREELANCING MADE EASier!</p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="What skill are you looking for?"
                  className="w-full px-6 py-3 rounded-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-gray-500"
                />
                <button className="absolute right-2 top-2 bg-teal-500 text-white px-6 py-1 rounded-full hover:bg-teal-600 transition">
                  Search
                </button>
              </div>
            </div> 
            {/* hero section imges */}
            <div className="grid grid-cols-2 gap-8 p-4 bg-gray-900">
              <div className="rounded-2xl overflow-hidden w-64 h-64">
                <img src="public/imges/hero 1.png" alt="Worker 1" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden w-64 h-64">
                <img src="public/imges/hero2.png" alt="Worker 2" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden w-full h-full relative">
                <img 
                  src="public/imges/hero3.png" 
                  alt="3D Artist" 
                  className="w-px-10 h-16 md:h-px10 lg:h-96 object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* Popular Services Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Most Popular Services</h2>
            <button className="text-teal-500 flex items-center">
              View All
              <ChevronRight className="ml-1" />
            </button>
          </div>
          
          <div className="relative">
            <div 
              className="flex gap-6 transition-transform duration-300" 
              style={{ transform: `translateX(-${currentIndex * 25}%)` }}
            >
              {services.map((service, index) => (
                <div key={service.id} className="min-w-[calc(25%-1rem)]">
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
            
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white shadow-lg rounded-full p-2 ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white shadow-lg rounded-full p-2 ${
                currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-teal-500' : 'w-2 bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#edecd4d0]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-teal-600">
              Discover Our Outstanding Features
            </h2>
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.id} className="bg-gray-300 opacity-70 p-6 rounded-lg shadow-md flex items-start space-x-4 ">
                  <div className="text-green-500 text-2xl">✔</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="relative flex space-x-4">
              {["public/imges/discover imag.png"].map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Feature ${index + 1}`} 
                  className="w-3xl h-fit object-cover  "
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-left mb-8">
            Here are Something You'd Need
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoriesData.map((category, index) => (
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
            <a href="#" className="text-teal-500 hover:text-teal-700 font-medium inline-flex items-center">
              More Categories
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 py-16 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 paddingBottom-16 h-96 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">
            Sign Up or Login to Explore Various Features that our Sellers & Freelancers Experience. It's Just Free
          </p>
          <a href="#" className="bg-teal-500 hover:bg-teal-300 text-white font-bold py-2 px-4 rounded">
            Get Started It's Free
          </a>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 bg-gray-700 w-40 h-40 rounded-full transform -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 bg-gray-700 w-40 h-40 rounded-full transform translate-x-20 translate-y-20"></div>
        </div>
      </div>

      {/* Trending Sellers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Sellers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <div key={seller.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <div className="flex items-center space-x-4">
                  <img src={seller.image} alt={seller.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{seller.name}</h3>
                    <div className="flex items-center text-yellow-400">
                      ★★★★★ <span className="text-gray-600 ml-1">{seller.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-32 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Have Some Doubts To Get Started?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <img src={resource.image} alt={resource.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <button className="text-teal-500 font-semibold hover:text-teal-600">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h4 className="font-semibold mb-4">About Us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Company</a></li>
                <li><a href="#" className="hover:text-blue-400">Team</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400">Safety</a></li>
                <li><a href="#" className="hover:text-blue-400">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400">Copyright</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Projects</a></li>
                <li><a href="#" className="hover:text-blue-400">Messaging</a></li>
                <li><a href="#" className="hover:text-blue-400">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400">Guides</a></li>
                <li><a href="#" className="hover:text-blue-400">Testimonials</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;