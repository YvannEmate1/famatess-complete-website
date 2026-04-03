import Topbar  from '../components/Topbar';
import Navbar  from '../components/NavbarClean';
import Footer  from '../components/Footer';

import LogisticsHero     from '../components/LogisticsHero';
import LogisticsServices from '../components/LogisticsServices';
import LogisticsNetwork  from '../components/LogisticsNetwork';
import LogisticsProcess  from '../components/LogisticsProcess';
import LogisticsStats    from '../components/LogisticsStats';




export default function Logistics() {
  return (
    <>
      <Topbar />
      <Navbar />
      <LogisticsHero />
      <LogisticsServices />
      <LogisticsStats />
      <LogisticsProcess />
      <LogisticsNetwork />
      <Footer />
    </>
  );
}
