import { useState, useEffect, useRef } from "react";
import Topbar from '../components/Topbar';
import Navbar from '../components/NavbarClean';
import Footer from '../components/Footer';
import ActivitiesHeroBanner from '../components/ActivitiesHeroBanner';
import CategoryIntro from '../components/CategoryIntro';
import VehicleGrid from '../components/VehicleGrid';
import WhyFamatess from '../components/WhyFamatess';
import Achievement from "../components/Achievement";


export default function Activities() {
  return (
    <>
      <Topbar />
      <Navbar />
      <ActivitiesHeroBanner />
      <CategoryIntro />
      <VehicleGrid />
      <WhyFamatess />
      <Achievement />
      <Footer />
    </>
  );
}