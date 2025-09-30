'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa';
import useDarkMode from '../hooks/useDarkMode';

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-700 text-gray-200'}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* More from 4Rent */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className={`font-bold text-xs sm:text-base lg:text-lg ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>More from 4Rent</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/post" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  List Property
                </Link>
              </li>
              <li>
                <Link href="/business-registration" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Business Registration
                </Link>
              </li>
              <li>
                <Link href="/advertising" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Banner Ads
                </Link>
              </li>
              <li>
                <Link href="/boost" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Boost Ad
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className={`font-bold text-xs sm:text-base lg:text-lg ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>Help & Support</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/faq" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/safety" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Stay Safe
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* About 4Rent */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className={`font-bold text-xs sm:text-base lg:text-lg ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>About 4Rent</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/about" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Sitemap
                </Link>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="flex space-x-2 sm:space-x-3 lg:space-x-4 pt-2 sm:pt-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'} transition-colors`}
                aria-label="Facebook"
              >
                <FaFacebookF size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'} transition-colors`}
                aria-label="Twitter"
              >
                <FaTwitter size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'} transition-colors`}
                aria-label="TikTok"
              >
                <FaTiktok size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'} transition-colors`}
                aria-label="YouTube"
              >
                <FaYoutube size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 gap-3">
            <div className={`text-xs sm:text-sm text-center md:text-left ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
              © 2025. All rights reserved. 4Rent Technologies
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={isDarkMode ? "/images/white logo.png" : "/images/black logo.png"}
                alt="4Rent Logo"
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
