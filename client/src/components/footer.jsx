import React from 'react';
import { Card, CardContent } from './ui/card';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const footerLinks = [
  {
    title: 'About Us',
    links: ['Company', 'Team', 'Careers'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Safety', 'Community'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Copyright'],
  },
  {
    title: 'Features',
    links: ['Projects', 'Messaging', 'Analytics'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Guides', 'Testimonials'],
  },
];

export default function Footer() {
  return (
    <Card as="footer" className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-12 rounded-none shadow-none">
      <CardContent className="container mx-auto px-6 py-12">
        {/* Top Section: Logo & Social */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/public/imges/Logo1.png" alt="HotelDesk Logo" width={140} height={160} />
            <span className="ml-3 text-2xl font-bold"></span>
          </div>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-400 transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 uppercase tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-10 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Ceylon Work Forge. All rights reserved.
        </div>
      </CardContent>
    </Card>
  );
}
