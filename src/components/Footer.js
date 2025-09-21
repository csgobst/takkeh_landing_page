import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DownloadButton = ({ href, platform, className = '' }) => {
  const isAppStore = platform === 'ios';
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-block bg-transparent hover:bg-transparent focus:bg-transparent transform transition-all duration-300 hover:shadow-lg border-none outline-none
        ${className}
      `}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={isAppStore 
          ? "/download-on-the-app-store-apple-logo-svgrepo-com.svg" 
          : "/google-play-badge-logo-svgrepo-com.svg"
        }
        alt={isAppStore ? "Download on the App Store" : "Get it on Google Play"}
        className="h-20 w-auto"
      />
    </motion.a>
  );
};

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-takkeh-yellow/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className={`grid md:grid-cols-3 gap-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Logo */}
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse justify-end' : ''}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-takkeh-yellow to-takkeh-yellow-dark rounded-xl flex items-center justify-center shadow-lg">
                <img 
                  src="/logo-takkeh.svg" 
                  alt="Takkeh Logo" 
                  className="w-8 h-8"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-takkeh-yellow to-orange-400 bg-clip-text text-transparent">
                Takkeh
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              {t.footer.description}
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Made with love for fast delivery</span>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-takkeh-yellow mb-4">
              {t.footer.contact}
            </h3>
            
            <div className="space-y-4">
              {/* Email */}
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className="w-10 h-10 bg-takkeh-yellow/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-takkeh-yellow" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a 
                    href={`mailto:${t.footer.email}`}
                    className="text-white hover:text-takkeh-yellow transition-colors duration-200"
                  >
                    {t.footer.email}
                  </a>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className="w-10 h-10 bg-takkeh-yellow/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-takkeh-yellow" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Hours</p>
                  <p className="text-white">{t.footer.hours}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-takkeh-yellow mb-4">
              Legal
            </h3>
            
            <div className="space-y-3">
              <motion.a
                href="#"
                className="block text-gray-300 hover:text-takkeh-yellow transition-colors duration-200"
                whileHover={{ x: isRTL ? -5 : 5 }}
              >
                {t.footer.privacy}
              </motion.a>
              
              <motion.a
                href="#"
                className="block text-gray-300 hover:text-takkeh-yellow transition-colors duration-200"
                whileHover={{ x: isRTL ? -5 : 5 }}
              >
                {t.footer.terms}
              </motion.a>
            </div>

            {/* App Download Links */}
            <div className="pt-6">
              <h4 className="text-lg font-medium text-white mb-4">Download Customer App</h4>
              <div className="space-y-3">
                <div className="flex flex-col space-y-2">
                  <DownloadButton 
                    href="https://example.com/download/takkeh-customer-ios"
                    platform="ios"
                  />
                  <DownloadButton 
                    href="https://example.com/download/takkeh-customer-android"
                    platform="android"
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 mt-12"
        >
          <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${
            isRTL ? 'md:flex-row-reverse' : ''
          }`}>
            <p className="text-gray-400 text-sm">
              © {currentYear} Takkeh. All rights reserved.
            </p>
            
            <div className="text-gray-400 text-sm">
              {t.availability}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;