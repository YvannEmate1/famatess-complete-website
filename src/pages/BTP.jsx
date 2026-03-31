import Topbar  from '../components/Topbar';
import Navbar  from '../components/NavbarClean';
import Footer  from '../components/Footer';

import BTPHero     from '../components/BTPHero';
import BTPServices from '../components/BTPServices';
import BTPProjects from '../components/BTPProjects';
import BTPProcess  from '../components/BTPProcess';
import BTPStats    from '../components/BTPStats';
import BTPCTA      from '../components/BTPCTA';


export default function BTP() {
  return (
    <>
      <Topbar />
      <Navbar />
      <BTPHero />
      <BTPServices />
      <BTPStats />
      <BTPProcess />
      <BTPProjects />

      <Footer />
    </>
  );
}