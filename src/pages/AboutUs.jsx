import Topbar  from '../components/Topbar';
import Navbar  from '../components/NavbarClean';
import Footer  from '../components/Footer';

import AboutHero       from '../components/AboutHero';
import AboutStory      from '../components/AboutStory';
import AboutValues     from '../components/AboutValues';
import AboutActivities from '../components/AboutActivities';



export default function AboutUs() {
  return (
    <>
      <Topbar />
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutActivities />
      <Footer />
    </>
  );
}
