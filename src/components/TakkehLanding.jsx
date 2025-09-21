import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Smartphone, 
  Store, 
  Truck, 
  Download, 
  CheckCircle, 
  Star,
  Globe,
  Clock,
  Shield,
  Headphones,
  MapPin,
  DollarSign,
  Navigation,
  BarChart3
} from 'lucide-react';
import Hero3D from './Hero3D';
import { translations } from '../translations';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Animated Section Wrapper
function AnimatedSection({ children, className = "", id = "" }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {children}
    </motion.section>
  );
}

// Download Button Component
function DownloadButton({ platform, url, icon: Icon, t, language }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-3 rtl:space-x-reverse bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-6 h-6 group-hover:text-takkeh-yellow transition-colors" />
      <div className="text-left rtl:text-right">
        <div className="text-xs opacity-75">
          {platform === 'ios' ? t.downloadOn : t.getItOn}
        </div>
        <div className="font-semibold">
          {platform === 'ios' ? t.appStore : t.googlePlay}
        </div>
      </div>
    </motion.a>
  );
}

// App Preview Card
function AppPreviewCard({ title, className = "" }) {
  return (
    <motion.div
      className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-100 card-3d ${className}`}
      whileHover={{ y: -10, rotateY: 5, rotateX: 5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-[9/16] bg-gradient-to-br from-takkeh-yellow-light to-takkeh-yellow rounded-xl flex items-center justify-center">
        <div className="text-center">
          <Smartphone className="w-16 h-16 text-white mx-auto mb-4" />
          <p className="text-white font-medium">{title}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-takkeh-yellow/20 to-transparent rounded-2xl pointer-events-none" />
    </motion.div>
  );
}

// Benefit Item Component
function BenefitItem({ icon: Icon, text, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center space-x-3 rtl:space-x-reverse"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="flex-shrink-0 w-8 h-8 bg-takkeh-yellow rounded-full flex items-center justify-center">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </motion.div>
  );
}

export default function TakkehLanding() {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);

  const t = translations[language];
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen gradient-bg scroll-smooth ${isRTL ? 'font-arabic' : ''}`}>
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass"
        style={{ opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 rtl:space-x-reverse"
              whileHover={{ scale: 1.05 }}
            >
              <img src={process.env.PUBLIC_URL + '/logo-takkeh.svg'} alt="Takkeh" className="w-10 h-10" loading="lazy" width={40} height={40} />
              <span className="text-2xl font-bold text-takkeh-yellow">Takkeh</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {['customer', 'vendor', 'driver'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-700 hover:text-takkeh-yellow font-medium transition-colors duration-200"
                >
                  {t[section]}
                </button>
              ))}
            </nav>

            {/* Language Toggle */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                  language === 'en' 
                    ? 'bg-takkeh-yellow text-white' 
                    : 'text-gray-600 hover:text-takkeh-yellow'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                  language === 'ar' 
                    ? 'bg-takkeh-yellow text-white' 
                    : 'text-gray-600 hover:text-takkeh-yellow'
                }`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <AnimatedSection id="customer" className="relative min-h-screen flex items-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16"
          style={{ y: heroY }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left rtl:lg:text-right"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight"
                variants={fadeInUp}
              >
                <span className="block">{t.heroTitle.split(' ').slice(0, 2).join(' ')}</span>
                <span className="text-takkeh-yellow block">
                  {t.heroTitle.split(' ').slice(2).join(' ')}
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 mb-8 max-w-2xl"
                variants={fadeInUp}
              >
                {t.heroSubtitle}
              </motion.p>

              {/* Benefits */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                variants={staggerContainer}
              >
                <BenefitItem icon={CheckCircle} text={t.benefit1} delay={0.1} />
                <BenefitItem icon={MapPin} text={t.benefit2} delay={0.2} />
                <BenefitItem icon={Shield} text={t.benefit3} delay={0.3} />
                <BenefitItem icon={Headphones} text={t.benefit4} delay={0.4} />
              </motion.div>

              {/* Download Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                variants={fadeInUp}
              >
                <DownloadButton
                  platform="ios"
                  url="https://example.com/download/takkeh-customer-ios"
                  icon={Download}
                  t={t}
                  language={language}
                />
                <DownloadButton
                  platform="android"
                  url="https://example.com/download/takkeh-customer-android"
                  icon={Download}
                  t={t}
                  language={language}
                />
              </motion.div>

              {/* Secondary CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <button
                  onClick={() => scrollToSection('vendor')}
                  className="px-6 py-3 bg-white text-takkeh-yellow border-2 border-takkeh-yellow rounded-xl font-semibold hover:bg-takkeh-yellow hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  {t.becomeVendor}
                </button>
                <button
                  onClick={() => scrollToSection('driver')}
                  className="px-6 py-3 bg-white text-takkeh-yellow border-2 border-takkeh-yellow rounded-xl font-semibold hover:bg-takkeh-yellow hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  {t.becomeDriver}
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - App Preview */}
            <motion.div
              className="flex justify-center lg:justify-end rtl:lg:justify-start"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <AppPreviewCard title={t.customerAppPreview} className="max-w-xs" />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-takkeh-yellow rounded-full flex justify-center">
            <div className="w-1 h-3 bg-takkeh-yellow rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Vendor Section */}
      <AnimatedSection id="vendor" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - App Preview */}
            <motion.div
              className="flex justify-center lg:justify-start rtl:lg:justify-end order-2 lg:order-1"
              variants={scaleIn}
            >
              <AppPreviewCard title={t.vendorAppPreview} className="max-w-xs" />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              className="text-center lg:text-left rtl:lg:text-right order-1 lg:order-2"
              variants={staggerContainer}
            >
              <motion.div className="flex items-center justify-center lg:justify-start rtl:lg:justify-end mb-6" variants={fadeInUp}>
                <div className="w-16 h-16 bg-takkeh-yellow rounded-2xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t.vendorTitle}</h2>
              </motion.div>

              <motion.p className="text-xl text-gray-600 mb-8" variants={fadeInUp}>
                {t.vendorPitch}
              </motion.p>

              <motion.div className="space-y-4 mb-8" variants={staggerContainer}>
                <BenefitItem icon={Clock} text={t.vendorBenefit1} delay={0.1} />
                <BenefitItem icon={BarChart3} text={t.vendorBenefit2} delay={0.2} />
                <BenefitItem icon={DollarSign} text={t.vendorBenefit3} delay={0.3} />
              </motion.div>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                <DownloadButton
                  platform="ios"
                  url="https://example.com/download/takkeh-vendor-ios"
                  icon={Download}
                  t={t}
                  language={language}
                />
                <DownloadButton
                  platform="android"
                  url="https://example.com/download/takkeh-vendor-android"
                  icon={Download}
                  t={t}
                  language={language}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Driver Section */}
      <AnimatedSection id="driver" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              className="text-center lg:text-left rtl:lg:text-right"
              variants={staggerContainer}
            >
              <motion.div className="flex items-center justify-center lg:justify-start rtl:lg:justify-end mb-6" variants={fadeInUp}>
                <div className="w-16 h-16 bg-takkeh-yellow rounded-2xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t.driverTitle}</h2>
              </motion.div>

              <motion.p className="text-xl text-gray-600 mb-8" variants={fadeInUp}>
                {t.driverPitch}
              </motion.p>

              <motion.div className="space-y-4 mb-8" variants={staggerContainer}>
                <BenefitItem icon={Clock} text={t.driverBenefit1} delay={0.1} />
                <BenefitItem icon={Navigation} text={t.driverBenefit2} delay={0.2} />
                <BenefitItem icon={BarChart3} text={t.driverBenefit3} delay={0.3} />
              </motion.div>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                <DownloadButton
                  platform="ios"
                  url="https://example.com/download/takkeh-driver-ios"
                  icon={Download}
                  t={t}
                  language={language}
                />
                <DownloadButton
                  platform="android"
                  url="https://example.com/download/takkeh-driver-android"
                  icon={Download}
                  t={t}
                  language={language}
                />
              </motion.div>
            </motion.div>

            {/* Right - App Preview */}
            <motion.div
              className="flex justify-center lg:justify-end rtl:lg:justify-start"
              variants={scaleIn}
            >
              <AppPreviewCard title={t.driverAppPreview} className="max-w-xs" />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Availability Note */}
      <AnimatedSection className="py-12 bg-takkeh-yellow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="flex items-center justify-center mb-4"
            variants={fadeInUp}
          >
            <Globe className="w-8 h-8 text-white mr-3 rtl:mr-0 rtl:ml-3" />
            <p className="text-xl font-semibold text-white">{t.availabilityNote}</p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left - Logo & Description */}
            <div className="text-center md:text-left rtl:md:text-right">
              <div className="flex items-center justify-center md:justify-start rtl:md:justify-end mb-4">
                <img src={process.env.PUBLIC_URL + '/logo-takkeh.svg'} alt="Takkeh" className="w-10 h-10 mr-3 rtl:mr-0 rtl:ml-3" loading="lazy" width={40} height={40} />
                <span className="text-2xl font-bold text-takkeh-yellow">Takkeh</span>
              </div>
              <p className="text-gray-400">{t.footerDescription}</p>
            </div>

            {/* Middle - Contact */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">{t.contact}</h3>
              <p className="text-gray-400 mb-2">{t.supportEmail}</p>
              <p className="text-gray-400">{t.businessHours}</p>
            </div>

            {/* Right - Legal */}
            <div className="text-center md:text-right rtl:md:text-left">
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-takkeh-yellow transition-colors">
                  {t.privacyPolicy}
                </a>
                <a href="#" className="block text-gray-400 hover:text-takkeh-yellow transition-colors">
                  {t.termsOfService}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Takkeh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
