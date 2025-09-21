import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, switchLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { key: 'customer', label: t.nav.customer, id: 'customer' },
    { key: 'vendor', label: t.nav.vendor, id: 'vendor' },
    { key: 'driver', label: t.nav.driver, id: 'driver' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <motion.div 
            className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-takkeh-yellow to-takkeh-yellow-dark rounded-xl flex items-center justify-center shadow-lg">
              <img 
                src="/logo-takkeh.svg" 
                alt="Takkeh Logo" 
                className="w-8 h-8"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-takkeh-yellow to-takkeh-yellow-dark bg-clip-text text-transparent">
              Takkeh
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          {/* For Arabic, add a bit more breathing room between nav items */}
          <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-14' : 'space-x-8'}`}>
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className={`text-gray-700 hover:text-takkeh-yellow-dark font-medium transition-colors duration-200 relative group ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-takkeh-yellow group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            {/* Language Toggle */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <motion.button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentLanguage === 'en'
                    ? 'bg-takkeh-yellow text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                EN
              </motion.button>
              <motion.button
                onClick={() => switchLanguage('ar')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentLanguage === 'ar'
                    ? 'bg-takkeh-yellow text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                عربي
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block w-full text-left py-3 px-4 rounded-xl hover:bg-takkeh-yellow/10 hover:text-takkeh-yellow-dark font-medium transition-all duration-200 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;