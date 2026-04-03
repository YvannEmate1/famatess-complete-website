import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n';

// Pages
import Home from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Activities from './pages/Activities';
import ChooseUs from './pages/ChooseUsNew';
import BTP from './pages/BTP';
import Logistics from './pages/Logistics';
import Localisation from './pages/Localisation';
import NotFound from './pages/NotFound'; // Import the 404 page

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <div className="app-container">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/choose-us" element={<ChooseUs />} />
            <Route path="/automobile" element={<Activities />} />
            <Route path="/btp" element={<BTP />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/localisation" element={<Localisation />} />
            <Route path="/contact" element={<Localisation />} />
            {/* Catch-all for undefined routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;