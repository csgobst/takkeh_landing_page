import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Smartphone, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TakkehAppSlider } from './ui/interactive-image-accordion';

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
        className="h-40 w-auto"
      />
    </motion.a>
  );
};

const BenefitCard = ({ icon, text, delay = 0 }) => {
  const { isRTL } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${
        isRTL ? 'space-x-reverse' : ''
      }`}
    >
      <div className="flex-shrink-0">
        <CheckCircle className="w-6 h-6 text-takkeh-yellow" />
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </motion.div>
  );
};

const CustomerSection = () => {
  const { t, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('customer');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="customer" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-orange-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-takkeh-yellow/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 bg-orange-300/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-cols-2' : ''}`}>
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : (isRTL ? 100 : -100) }}
            transition={{ duration: 0.8 }}
            className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'} order-2 lg:order-1`}
          >
            {/* Hero Title */}
            <div>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  {t.customer.title.split(' ').slice(0, -1).join(' ')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-takkeh-yellow to-orange-500 bg-clip-text text-transparent animate-pulse">
                  {t.customer.title.split(' ').slice(-1)}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 mt-6 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t.customer.subtitle}
              </motion.p>
            </div>

            {/* Benefits */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t.customer.benefits.map((benefit, index) => (
                <BenefitCard 
                  key={index} 
                  text={benefit} 
                  delay={0.8 + index * 0.1}
                />
              ))}
            </motion.div>

            {/* Download Buttons */}
            <motion.div 
              className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <DownloadButton 
                href="https://example.com/download/takkeh-customer-ios"
                platform="ios"
              />
              
              <DownloadButton 
                href="https://example.com/download/takkeh-customer-android"
                platform="android"
              />
            </motion.div>

            {/* Secondary CTAs */}
            <motion.div 
              className={`flex flex-col sm:flex-row gap-4 pt-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <button
                onClick={() => scrollToSection('vendor')}
                className={`inline-flex items-center space-x-2 text-takkeh-yellow-dark font-semibold hover:text-takkeh-yellow transition-colors duration-200 ${
                  isRTL ? 'space-x-reverse' : ''
                }`}
              >
                <span>{t.customer.becomeVendor}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              
              <button
                onClick={() => scrollToSection('driver')}
                className={`inline-flex items-center space-x-2 text-takkeh-yellow-dark font-semibold hover:text-takkeh-yellow transition-colors duration-200 ${
                  isRTL ? 'space-x-reverse' : ''
                }`}
              >
                <span>{t.customer.becomeDriver}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <TakkehAppSlider />
            </div>
          </motion.div>

        </div>

        {/* Availability Notice */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <p className="text-gray-600 text-lg bg-white/80 backdrop-blur-sm rounded-2xl py-4 px-8 inline-block shadow-md">
            {t.availability}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerSection;