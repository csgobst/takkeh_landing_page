import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Header
    nav: {
      customer: 'Customer App',
      vendor: 'Become a Vendor',
      driver: 'Become a Driver'
    },
    
    // Customer Section
    customer: {
      title: 'Fast grocery & food delivery',
      subtitle: 'Takkeh brings what you need in minutes — simple, fast, and reliable.',
      benefits: [
        'Easy ordering from your favorite stores',
        'Live order tracking with real-time updates',
        'Secure payments with multiple options',
        '24/7 helpful customer support'
      ],
      downloadApp: 'Download Customer App',
      becomeVendor: 'Become a Vendor',
      becomeDriver: 'Become a Driver',
      appStore: 'Download on App Store',
      googlePlay: 'Get it on Google Play',
      appPreview: 'Customer App Preview'
    },
    
    // Vendor Section
    vendor: {
      title: 'Become a Vendor',
      subtitle: 'Sell groceries or meals on Takkeh. Reach more customers with a simple app.',
      benefits: [
        'Real-time orders and notifications',
        'Easy menu & inventory management',
        'Fast payouts and transparent pricing'
      ],
      features: {
        instantNotifications: 'Get instant notifications for new orders and manage them efficiently in real-time.',
        menuInventory: 'Update your menu, track inventory, and manage your store with powerful tools.',
        fastPayouts: 'Receive payments quickly with transparent fees and detailed analytics.'
      },
      stats: {
        activeVendors: 'Active Vendors',
        monthlyOrders: 'Monthly Orders',
        avgPrepTime: 'Avg. Prep Time',
        todaysOrders: "Today's Orders"
      },
      downloadApp: 'Download Vendor App',
      appPreview: 'Vendor App Preview'
    },
    
    // Driver Section
    driver: {
      title: 'Become a Driver',
      subtitle: 'Deliver with Takkeh. Flexible hours and quick earnings.',
      benefits: [
        'Choose when you work - complete flexibility',
        'In-app navigation & 24/7 support',
        'Track earnings and get instant payouts'
      ],
      features: {
        flexSchedule: 'Work whenever you want - mornings, evenings, weekends. You decide your schedule.',
        gpsSupport: 'Built-in GPS navigation and 24/7 driver support for any questions or issues.',
        instantPayouts: 'See your earnings in real-time and get paid instantly after each trip.'
      },
      stats: {
        activeDrivers: 'Active Drivers',
        serviceAreas: 'Service Areas',
        driverRating: 'Driver Rating'
      },
      metrics: {
        potentialEarnings: 'Potential Earnings',
        perHour: 'Per Hour',
        peakHours: 'Peak Hours',
        weekendBonus: 'Weekend Bonus',
        topDriversNote: 'Top drivers earn over $1,500 per week',
        todaysEarnings: "Today's Earnings"
      },
      dashboard: {
        heading: 'Driver Dashboard',
        online: 'Online',
        currentRoute: 'Current Route',
        gpsBadge: 'GPS navigation & earnings tracker'
      },
      downloadApp: 'Download Driver App',
      appPreview: 'Driver App Preview'
    },
    
    // Availability
    availability: 'Now launching in select cities. More locations coming soon.',
    
    // Footer
    footer: {
      description: 'Fast delivery for groceries and food.',
      contact: 'Contact Us',
      email: 'support@takkeh.app',
      hours: 'Business Hours: 9:00 AM - 6:00 PM',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    
    // Buttons
    buttons: {
      downloadIos: 'Download on App Store',
      downloadAndroid: 'Get it on Google Play'
    }
  },
  
  ar: {
    // Header
    nav: {
      customer: 'تطبيق العملاء',
      vendor: 'كن بائعاً',
      driver: 'كن سائقاً'
    },
    
    // Customer Section
    customer: {
      title: 'توصيل بقالة وأكل بسرعة',
      subtitle: 'تكة يجلب لك ما تحتاجه في دقائق — بسيط وسريع وموثوق.',
      benefits: [
        'طلب سهل من متاجرك المفضلة',
        'تتبع الطلب المباشر مع التحديثات الفورية',
        'دفع آمن مع خيارات متعددة',
        'دعم عملاء مفيد على مدار الساعة'
      ],
      downloadApp: 'حمل تطبيق العملاء',
      becomeVendor: 'كن بائعاً',
      becomeDriver: 'كن سائقاً',
      appStore: 'حمل من متجر التطبيقات',
      googlePlay: 'احصل عليه من جوجل بلاي',
      appPreview: 'معاينة تطبيق العملاء'
    },
    
    // Vendor Section
    vendor: {
      title: 'كن بائعاً',
      subtitle: 'بع البقالة أو الوجبات على تكة. وصل لعملاء أكثر بتطبيق بسيط.',
      benefits: [
        'طلبات فورية مع الإشعارات',
        'إدارة سهلة للقائمة والمخزون',
        'دفعات سريعة وأسعار شفافة'
      ],
      features: {
        instantNotifications: 'احصل على إشعارات فورية بالطلبات الجديدة وادِرها بكفاءة وفي الوقت الفعلي.',
        menuInventory: 'حدّث قائمتك، وتتبع المخزون، وادِر متجرك بأدوات قوية.',
        fastPayouts: 'استلم دفعاتك بسرعة مع رسوم شفافة وتحليلات مفصلة.'
      },
      stats: {
        activeVendors: 'البائعون النشطون',
        monthlyOrders: 'الطلبات الشهرية',
        avgPrepTime: 'متوسط زمن التحضير',
        todaysOrders: 'طلبات اليوم'
      },
      downloadApp: 'حمل تطبيق البائعين',
      appPreview: 'معاينة تطبيق البائعين'
    },
    
    // Driver Section
    driver: {
      title: 'كن سائقاً',
      subtitle: 'وصل مع تكة. ساعات مرنة وأرباح سريعة.',
      benefits: [
        'اختر متى تعمل - مرونة كاملة',
        'ملاحة داخل التطبيق ودعم على مدار الساعة',
        'تتبع الأرباح واحصل على دفعات فورية'
      ],
      features: {
        flexSchedule: 'اعمل في أي وقت تريده - صباحاً، مساءً، عطلات نهاية الأسبوع. أنت تحدد جدولك.',
        gpsSupport: 'ملاحة مدمجة داخل التطبيق ودعم للسائقين 24/7 لأي استفسارات أو مشاكل.',
        instantPayouts: 'شاهد أرباحك في الوقت الفعلي واحصل على دفعاتك فوراً بعد كل رحلة.'
      },
      stats: {
        activeDrivers: 'السائقون النشطون',
        serviceAreas: 'مناطق الخدمة',
        driverRating: 'تقييم السائق'
      },
      metrics: {
        potentialEarnings: 'الأرباح المحتملة',
        perHour: 'في الساعة',
        peakHours: 'ساعات الذروة',
        weekendBonus: 'مكافأة نهاية الأسبوع',
        topDriversNote: 'أفضل السائقين يربحون أكثر من 1500$ أسبوعياً',
        todaysEarnings: 'أرباح اليوم'
      },
      dashboard: {
        heading: 'لوحة تحكم السائق',
        online: 'متصل',
        currentRoute: 'المسار الحالي',
        gpsBadge: 'ملاحة GPS وتتبع الأرباح'
      },
      downloadApp: 'حمل تطبيق السائقين',
      appPreview: 'معاينة تطبيق السائقين'
    },
    
    // Availability
    availability: 'يتم الإطلاق الآن في مدن مختارة. المزيد من المواقع قريباً.',
    
    // Footer
    footer: {
      description: 'توصيل سريع للبقالة والطعام.',
      contact: 'اتصل بنا',
      email: 'support@takkeh.app',
      hours: 'ساعات العمل: 9:00 صباحاً - 6:00 مساءً',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة'
    },
    
    // Buttons
    buttons: {
      downloadIos: 'حمل من متجر التطبيقات',
      downloadAndroid: 'احصل عليه من جوجل بلاي'
    }
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update document attributes
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', currentLanguage);
  }, [direction, currentLanguage]);

  const t = translations[currentLanguage];

  const value = {
    currentLanguage,
    direction,
    switchLanguage,
    t,
    isRTL: direction === 'rtl'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};