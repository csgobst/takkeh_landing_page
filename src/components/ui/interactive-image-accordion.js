import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../../translations';
import { useLanguage } from '../../context/LanguageContext';

// We'll build the items dynamically based on current language

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onActivate }) => {
  const [justActivated, setJustActivated] = useState(false);
  const wasActiveRef = useRef(isActive);

  useEffect(() => {
    if (!wasActiveRef.current && isActive) {
      // transitioned from inactive to active
      setJustActivated(true);
    }
    wasActiveRef.current = isActive;
  }, [isActive]);

  const handleAnimationEnd = () => {
    setJustActivated(false);
  };
  // Calculate phone dimensions maintaining 412:917 aspect ratio
  const phoneWidth = isActive ? 200 : 60;
  const phoneHeight = isActive ? (phoneWidth * 917) / 412 : 60;
  
  return (
    <div
      className={`
        relative rounded-2xl overflow-visible cursor-pointer
        transition-all duration-700 ease-in-out bg-gradient-to-br from-gray-100 to-gray-200
        hover:shadow-xl transform hover:-translate-y-1 flex flex-col
        ${isActive ? 'w-[230px] sm:w-[260px] md:w-[280px] h-[430px] sm:h-[500px] md:h-[550px]' : 'w-[65px] sm:w-[70px] md:w-[80px] h-[360px] sm:h-[420px] md:h-[450px]'}
      `}
      onMouseEnter={onActivate}
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); } }}
      aria-expanded={isActive}
      aria-label={item.title}
    >
      {/* Background with Takkeh brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-takkeh-yellow/20 via-orange-100/30 to-takkeh-yellow-light/20 rounded-2xl"></div>
      
      {/* Phone Container - Upper section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className={`
          transition-all duration-700 ease-in-out flex flex-col items-center
        `}>
          {/* Phone Frame with proper aspect ratio */}
          <div 
            className={`
              bg-gray-900 rounded-[1.5rem] p-1 shadow-2xl
              transition-all duration-700 ease-in-out
            `}
            style={{
              width: `${phoneWidth}px`,
              height: `${phoneHeight}px`,
            }}
          >
            <div className={`
              bg-white rounded-[1.2rem] overflow-hidden h-full w-full relative
              transition-all duration-700 ease-in-out
              ${isActive ? 'opacity-100' : 'opacity-70'}
            `}>
              {/* Screen Content */}
              {isActive ? (
                <div className="h-full flex flex-col">
                  {/* Status Bar */}
                  <div className="h-4 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* App Screen with proper aspect ratio */}
                  <div className="flex-1 flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      style={{ aspectRatio: '412/917' }}
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEyIiBoZWlnaHQ9IjkxNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkJCRjI0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFwcCBTY3JlZW48L3RleHQ+PC9zdmc+'; 
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-takkeh-yellow rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Text Content - appears after fall animation */}
      <div
        className={`
          px-4 pb-[0.3em] text-center
          transition-all duration-600 ease-[cubic-bezier(0.22,0.61,0.36,1)]
          ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        style={isActive ? { transitionDelay: justActivated ? '120ms' : '0ms' } : undefined}
      >
        <h3 className="text-base font-bold text-gray-800 mb-[0.4em] leading-snug">{item.title}</h3>
        <p className="text-xs text-gray-600 leading-tight pb-[0.1em]">{item.description}</p>
      </div>

      {/* Static vertical label for inactive state */}
      {!isActive && !justActivated && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
          <span
            className="block text-gray-700 text-sm font-semibold leading-none select-none pb-[0.3em]"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {item.title}
          </span>
        </div>
      )}

      {/* Fall & rise animation label (transitional) */}
      {justActivated && (
        <span
          className="absolute left-1/2 bottom-0 -translate-x-1/2 text-gray-700 text-sm font-semibold select-none pointer-events-none"
          style={{ animation: 'fallAndRise 420ms cubic-bezier(0.3, 0.7, 0.4, 1) forwards' }}
          onAnimationEnd={handleAnimationEnd}
        >
          {item.title}
        </span>
      )}
    </div>
  );
};

// --- Main Takkeh App Slider Component ---
export function TakkehAppSlider() {
  const { currentLanguage, direction } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const accordionItems = [
    {
      id: 1,
      title: t.screenHomeTitle,
      description: t.screenHomeDesc,
  imageUrl: process.env.PUBLIC_URL + '/customerScreen/Home.svg',
    },
    {
      id: 2,
      title: t.screenFavoritesTitle,
      description: t.screenFavoritesDesc,
  imageUrl: process.env.PUBLIC_URL + '/customerScreen/Favorite.svg',
    },
    {
      id: 3,
      title: t.screenTrackingTitle,
      description: t.screenTrackingDesc,
  imageUrl: process.env.PUBLIC_URL + '/customerScreen/Requests.svg',
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActivate = (index) => {
    setActiveIndex(index);
  };

  return (
  <div className={`w-full h-[470px] sm:h-[520px] md:h-[550px] flex items-center justify-center overflow-visible ${direction === 'rtl' ? 'rtl' : ''}`}>
      {/* Keyframes injected once (harmless duplicates if multiple items) */}
      <style>{`
        @keyframes fallAndRise {
          0% { transform: rotate(-90deg) translateY(0); opacity:1; transform-origin: bottom center; }
          40% { transform: rotate(-20deg) translateY(2px); opacity:1; }
          60% { transform: rotate(0deg) translateY(8px); opacity:1; }
          72% { transform: rotate(0deg) translateY(8px); opacity:1; }
          100% { transform: rotate(0deg) translateY(-10px); opacity:0; }
        }
      `}</style>
      <div className="flex flex-row items-start justify-center gap-3 sm:gap-4 p-2 sm:p-4 touch-pan-y select-none">
        {accordionItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            isActive={index === activeIndex}
            onActivate={() => handleActivate(index)}
          />
        ))}
      </div>
    </div>
  );
}