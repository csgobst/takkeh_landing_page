import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Bell, CreditCard, TrendingUp, Users, Clock } from 'lucide-react';
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
          ? (process.env.PUBLIC_URL + '/download-on-the-app-store-apple-logo-svgrepo-com.svg') 
          : (process.env.PUBLIC_URL + '/google-play-badge-logo-svgrepo-com.svg')
        }
        alt={isAppStore ? "Download on the App Store" : "Get it on Google Play"}
        className="h-24 sm:h-28 md:h-32 lg:h-40 w-auto max-w-full"
      />
    </motion.a>
  );
};

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const { isRTL } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
    >
      <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-takkeh-yellow to-takkeh-yellow-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {React.cloneElement(icon, { className: 'w-6 h-6 text-white' })}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const AppPreview = ({ delay = 0 }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 overflow-hidden group cursor-pointer"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      
      {/* Phone Mockup */}
      <div className="relative z-10">
        <div className="mx-auto w-48 h-96 bg-black rounded-[2.5rem] p-2 shadow-2xl group-hover:scale-105 transition-transform duration-500">
          <div className="w-full h-full bg-gradient-to-br from-takkeh-yellow via-orange-400 to-orange-500 rounded-[2rem] relative overflow-hidden">
            {/* Screen Content */}
            <div className="p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-medium">Vendor Dashboard</div>
                <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              </div>
              
              {/* Stats Cards */}
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-xs opacity-80">Today's Orders</div>
                  <div className="text-2xl font-bold">47</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-xs opacity-80">Revenue</div>
                  <div className="text-2xl font-bold">$1,250</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-xs opacity-80">Rating</div>
                  <div className="text-2xl font-bold">4.9★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* App Preview Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <p className="text-white font-semibold text-lg">{t.vendor.appPreview}</p>
          <p className="text-gray-300 text-sm">Real-time dashboard & analytics</p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-6 right-6 w-8 h-8 bg-takkeh-yellow rounded-full opacity-60"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-6 w-6 h-6 bg-orange-400 rounded-full opacity-40"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

const VendorSection = () => {
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

    const section = document.getElementById('vendor');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Bell />,
      title: t.vendor.benefits[0],
      description: t.vendor.features?.instantNotifications || ''
    },
    {
      icon: <Store />,
      title: t.vendor.benefits[1],
      description: t.vendor.features?.menuInventory || ''
    },
    {
      icon: <CreditCard />,
      title: t.vendor.benefits[2],
      description: t.vendor.features?.fastPayouts || ''
    }
  ];

  const stats = [
    { icon: <TrendingUp />, value: '500+', label: t.vendor.stats?.activeVendors || '' },
    { icon: <Users />, value: '10K+', label: t.vendor.stats?.monthlyOrders || '' },
    { icon: <Clock />, value: isRTL ? '15 دقيقة' : '15min', label: t.vendor.stats?.avgPrepTime || '' }
  ];

  return (
  <section id="vendor" className="relative py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-60 h-60 bg-takkeh-yellow/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

  <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className={`text-center mb-12 md:mb-16 ${isRTL ? 'text-right' : 'text-left'} max-w-4xl mx-auto px-2`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t.vendor.title}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.vendor.subtitle}
          </motion.p>
        </motion.div>

  <div className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${isRTL ? 'md:grid-cols-2' : ''}`}>
          
          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : (isRTL ? 100 : -100) }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 md:mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-takkeh-yellow to-takkeh-yellow-dark rounded-xl flex items-center justify-center mx-auto mb-2">
                    {React.cloneElement(stat.icon, { className: 'w-5 h-5 text-white' })}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={0.7 + index * 0.1}
                />
              ))}
            </div>

            {/* Download Buttons */}
            <motion.div 
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 md:pt-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <DownloadButton 
                href="https://example.com/download/takkeh-vendor-ios"
                platform="ios"
              />
              
              <DownloadButton 
                href="https://example.com/download/takkeh-vendor-android"
                platform="android"
              />
            </motion.div>
          </motion.div>

          {/* App Preview */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : (isRTL ? -100 : 100) }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="max-w-sm md:max-w-full mx-auto">
              <AppPreview delay={0.7} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VendorSection;