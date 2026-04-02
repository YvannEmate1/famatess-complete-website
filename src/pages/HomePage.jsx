import React from 'react';
import Topbar from '../components/Topbar';
import Navbar from '../components/NavbarClean';
import HeroMain from '../components/HeroMain';
import OurBusinesses from '../components/OurBusinesses';
import FamActivities from '../components/FamActivities';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Topbar />
      <Navbar />
      <HeroMain />
      <FamActivities />
      <OurBusinesses />
      <Partners />
      <Footer />
    </>
  );
}
