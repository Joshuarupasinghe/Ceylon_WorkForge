import React, { useState } from 'react';

// Sample data
const services = [
  { id: 1, title: 'Web Development', icon: '💻', color: 'bg-purple-600' },
  { id: 2, title: 'Logo Design', icon: '🎨', color: 'bg-blue-500' },
  { id: 3, title: 'SEO', icon: '🔍', color: 'bg-green-500' },
  { id: 4, title: 'Video Editing', icon: '🎥', color: 'bg-indigo-600' }
];

const features = [
  { id: 1, title: 'Feature 1', description: 'Find the perfect match for your project needs. Connect with skilled professionals.' },
  { id: 2, title: 'Feature 2', description: 'Secure payments, clear milestones, and guaranteed satisfaction with every project.' },
  { id: 3, title: 'Feature 3', description: 'Real-time collaboration tools and seamless communication channels.' }
];

const sellers = [
  { id: 1, name: 'John Smith', rating: 4.9, image: '/api/placeholder/80/80' },
  { id: 2, name: 'Emma Wilson', rating: 4.8, image: '/api/placeholder/80/80' },
  { id: 3, name: 'Michael Brown', rating: 4.9, image: '/api/placeholder/80/80' }
];

const resources = [
  { id: 1, title: 'Perfect Project Pitch', image: '/api/placeholder/400/250', description: 'Learn how to create compelling project proposals' },
  { id: 2, title: 'Freelance Success Guide', image: '/api/placeholder/400/250', description: 'Essential tips for freelancing success' },
  { id: 3, title: 'Business Growth Tips', image: '/api/placeholder/400/250', description: 'Strategies to scale your freelance business' }
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
              <p className="text-xl mb-6">FREELANCING MADE EASY!</p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="What skill are you looking for?"
                  className="w-full px-6 py-3 rounded-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-gray-500"
                />
                <button className=" absolute right-2 top-2 bg-teal-500 text-white px-6 py-1 rounded-full hover:bg-teal-600 transition">
                  Search
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 p-4 bg-gray-900">
  <div className="rounded-2xl overflow-hidden w-64 h-64">
    <img src="public/imges/hero 1.png" alt="Worker 1" className="w-full h-full object-cover" />
  </div>

  <div className="rounded-2xl overflow-hidden w-64 h-64">
    <img src="public/imges/hero2.png" alt="Worker 2" className="w-full h-full object-cover" />
  </div>


  <div className="rounded-2xl overflow-hidden w-full h-full relative">
  <img 
    src="public/imges/Group 6.png" 
    alt="3D Artist" 
    className="w-px-10 h-16 md:h-px10 lg:h-96 object-cover" 
  />
    
  </div>
</div>
          </div>
        </div>
      </header>

      {/* Popular Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Most Popular Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`${service.color} p-6 rounded-lg text-white hover:opacity-90 transition cursor-pointer`}
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Discover Our Outstanding Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Sellers */}
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
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Have Some Doubts To Get Started?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <img src={resource.image} alt={resource.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <button className="text-blue-500 font-semibold hover:text-blue-600">
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