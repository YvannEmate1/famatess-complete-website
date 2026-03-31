import './App.css';
import React, { useEffect, useState } from 'react';
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

function Router() {
  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return '/home';
    // Remove the leading # and split by anchor if necessary
    const hashPath = window.location.hash.replace(/^#/, '');
    const [base] = hashPath.split('#');
    return base || '/home';
  });

  const [anchor, setAnchor] = useState(() => {
    if (typeof window === 'undefined') return '';
    const hashPath = window.location.hash.replace(/^#/, '');
    const [, hashAnchor] = hashPath.split('#');
    return hashAnchor || '';
  });

  useEffect(() => {
    // If no hash is present, default to home
    if (!window.location.hash) {
      window.location.hash = '#/home';
    }

    const onHash = () => {
      const hashPath = window.location.hash.replace(/^#/, '');
      const [base, hashAnchor] = hashPath.split('#');
      setRoute(base || '/home');
      setAnchor(hashAnchor || '');
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Routing Logic
  switch (route) {
    case '/home':
      return <Home />;
    case '/about-us':
      return <AboutUs />;
    case '/choose-us':
      return <ChooseUs anchor={anchor} />;
    case '/automobile':
      return <Activities />;
    case '/btp':
      return <BTP />;
    case '/logistics':
      return <Logistics />;
    case '/localisation':
    case '/contact': // Directing contact to localisation for now
      return <Localisation />;
    
    default:
      return <NotFound />;
  }
}

function App() {
  return (
    <LanguageProvider>
      <div className="app-container">
        {/* Router handles the page rendering based on URL hash */}
        <Router />
      </div>
    </LanguageProvider>
  );
}

export default App;