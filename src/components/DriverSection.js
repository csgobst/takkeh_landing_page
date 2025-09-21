import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Navigation, DollarSign, Smartphone, Download, MapPin, Clock, Star } from 'lucide-react';
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
        className="h-40 w-auto"
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
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
      className="relative bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 overflow-hidden group cursor-pointer"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      
      {/* Phone Mockup */}
      <div className="relative z-10">
        <div className="mx-auto w-48 h-96 bg-black rounded-[2.5rem] p-2 shadow-2xl group-hover:scale-105 transition-transform duration-500">
          <div className="w-full h-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-[2rem] relative overflow-hidden">
            {/* Screen Content */}
            <div className="p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-medium">{t.driver.dashboard?.heading}</div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <div className="text-xs">{t.driver.dashboard?.online}</div>
                </div>
              </div>
              
              {/* Map Preview */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="text-xs opacity-80 mb-2">{t.driver.dashboard?.currentRoute}</div>
                <div className="relative h-20 bg-white/10 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-green-400/30"></div>
                  <motion.div
                    className="absolute top-2 left-2 w-2 h-2 bg-takkeh-yellow rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-xs opacity-80">{t.driver.metrics?.todaysEarnings}</div>
                  <div className="text-lg font-bold">$89</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="text-xs opacity-80">Trips</div>
                  <div className="text-lg font-bold">12</div>
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
          <p className="text-white font-semibold text-lg">{t.driver.appPreview}</p>
          <p className="text-green-100 text-sm">{t.driver.dashboard?.gpsBadge}</p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-6 right-6 w-8 h-8 bg-green-400 rounded-full opacity-60"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-6 w-6 h-6 bg-emerald-400 rounded-full opacity-40"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

const EarningsCard = ({ delay = 0 }) => {
  const { isRTL, t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-takkeh-yellow to-orange-500 rounded-2xl p-6 text-white shadow-xl"
    >
      <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
  <h3 className="text-lg font-semibold">{t.driver.metrics?.potentialEarnings}</h3>
        <DollarSign className="w-6 h-6" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">Per Hour</span>
          <span className="text-2xl font-bold">$15-25</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">Peak Hours</span>
          <span className="text-2xl font-bold">$30+</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">Weekend Bonus</span>
          <span className="text-lg font-semibold">+20%</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl">
        <p className="text-sm">
          {t.driver.metrics?.topDriversNote}
        </p>
      </div>
    </motion.div>
  );
};

const DriverSection = () => {
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

    const section = document.getElementById('driver');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Clock />,
      title: t.driver.benefits[0],
      description: t.driver.features?.flexSchedule || ''
    },
    {
      icon: <Navigation />,
      title: t.driver.benefits[1],
      description: t.driver.features?.gpsSupport || ''
    },
    {
      icon: <DollarSign />,
      title: t.driver.benefits[2],
      description: t.driver.features?.instantPayouts || ''
    }
  ];

  const stats = [
    { icon: <Car />, value: '1K+', label: t.driver.stats?.activeDrivers || '' },
    { icon: <MapPin />, value: '25+', label: t.driver.stats?.serviceAreas || '' },
    { icon: <Star />, value: '4.8', label: t.driver.stats?.driverRating || '' }
  ];

  return (
    <section id="driver" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-60 h-60 bg-emerald-300/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'} max-w-4xl mx-auto`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {t.driver.title}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.driver.subtitle}
          </motion.p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-16 items-start ${isRTL ? 'lg:grid-cols-2' : ''}`}>
          
          {/* App Preview */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : (isRTL ? 100 : -100) }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <AppPreview delay={0.5} />
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : (isRTL ? -100 : 100) }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                    {React.cloneElement(stat.icon, { className: 'w-5 h-5 text-white' })}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Earnings Card */}
            <EarningsCard delay={1.0} />

            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={1.2 + index * 0.1}
                />
              ))}
            </div>

            {/* Download Buttons */}
            <motion.div 
              className={`flex flex-col sm:flex-row gap-4 pt-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <DownloadButton 
                href="https://example.com/download/takkeh-driver-ios"
                platform="ios"
              />
              
              <DownloadButton 
                href="https://example.com/download/takkeh-driver-android"
                platform="android"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DriverSection;