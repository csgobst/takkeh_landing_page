import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import CustomerSection from './components/CustomerSection';
import VendorSection from './components/VendorSection';
import DriverSection from './components/DriverSection';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <div className="scroll-smooth">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="overflow-hidden">
          {/* Customer Hero Section */}
          <CustomerSection />
          
          {/* Vendor Section */}
          <VendorSection />
          
          {/* Driver Section */}
          <DriverSection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
