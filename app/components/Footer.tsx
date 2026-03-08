'use client';

import Link from 'next/link';
import Image from 'next/image';
import useDarkMode from '../hooks/useDarkMode';

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-700 text-gray-200'}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Post a 100% free ad on 4Rent */}
          <div className="space-y-2 sm:space-y-4">
            <h3 className={`font-bold text-xs sm:text-base lg:text-lg ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>Post a 100% free ad on 4Rent</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/post/vehicle" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Offer Vehicle4rent
                </Link>
              </li>
              <li>
                <Link href="/post/building" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Offer Property4rent
                </Link>
              </li>
              <li>
                <Link href="/post/experience" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Offer an Experience
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
                <Link href="/stay-safe-online" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Stay Safe Online
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
                <Link href="/about-us" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={`text-xs sm:text-sm lg:text-base hover:${isDarkMode ? 'text-white' : 'text-white'} transition-colors`}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center justify-center">
              <Image
                src={isDarkMode ? "/images/white logo.png" : "/images/black logo.png"}
                alt="4Rent Logo"
                width={80}
                height={30}
                className="h-6 sm:h-8 w-auto"
                priority
              />
            </div>
            <div className={`text-xs sm:text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
              © 2025. All rights reserved. 4Rent Technologies
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
