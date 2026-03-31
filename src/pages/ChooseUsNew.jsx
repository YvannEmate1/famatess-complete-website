import Topbar from '../components/Topbar';
import Navbar from '../components/NavbarClean';
import Footer from '../components/Footer';
import HeroBannerChooseUs from '../components/HeroBannerChooseUs';
import WhyChooseUs from '../components/WhyChooseUs';
import CommercialOps from '../components/CommercialOps';
import FleetShowcase from '../components/FleetShowcase';
import BrandsSection from '../components/BrandsSection';


export default function ChooseUs() {
  return (
    <>
      <Topbar />
      <Navbar />
      <HeroBannerChooseUs />
      <WhyChooseUs />
      <CommercialOps />
      <FleetShowcase />
      <BrandsSection />
      <Footer />
    </>
  );
}