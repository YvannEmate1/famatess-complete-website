import { C, FD, FB } from '../theme';
import SLabel from '../components/SLabel';
import useInView from '../utils/useInView';
import { useLanguage } from '../i18n';
import Footer from '../components/Footer';
import Navbar from '../components/NavbarClean';
import Topbar from '../components/Topbar';

function Localisation() {
  const [ref, visible] = useInView(0.1);
  const { t } = useLanguage();

  const locations = t('parts.components.localisation.locations', { returnObjects: true }) || [];
  const contacts = t('parts.components.localisation.contacts', { returnObjects: true }) || [];

  return (
    <>
    <Topbar />
    <Navbar />
    <section ref={ref} style={{ background: C.pageBg, borderTop: `1px solid ${C.borderLight}`, padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 22
          }}
        >
          {/* Location Card */}
          <div
            style={{
              background: C.white,
              padding: "52px 32px",
              borderRadius: 8,
              position: "relative",
              overflow: "hidden",
              animation: visible ? "fadeUp 0.6s ease both" : "none",
              borderRight: `1px solid ${C.borderLight}`,
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(to right, ${C.orange}, transparent)` }} />
            <SLabel>{t('parts.components.localisation.labelLocation')}</SLabel>
            <h3 style={{ fontFamily: FD, fontSize: 28, fontWeight: 700, color: C.textBody, marginBottom: 28 }}>
              {t('parts.components.localisation.titleLocation')}<br />
              <em style={{ color: C.orange, fontStyle: "italic" }}>
                {t('parts.components.localisation.highlightLocation')}
              </em>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {locations.map(item => (
                <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    background: "rgba(255,140,30,0.08)",
                    border: `1.5px solid rgba(255,140,30,0.25)`,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: C.orange, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontFamily: FB, fontSize: 14, color: C.textMuted, lineHeight: 1.5 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div
            style={{
              background: C.offwhite,
              padding: "52px 32px",
              borderRadius: 8,
              position: "relative",
              overflow: "hidden",
              animation: visible ? "fadeUp 0.6s ease 0.1s both" : "none",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(to right, transparent, ${C.orange})` }} />
            <SLabel>{t('parts.components.localisation.labelContact')}</SLabel>
            <h3 style={{ fontFamily: FD, fontSize: 28, fontWeight: 700, color: C.textBody, marginBottom: 28 }}>
              {t('parts.components.localisation.titleContact')}<br />
              <em style={{ color: C.orange, fontStyle: "italic" }}>
                {t('parts.components.localisation.highlightContact')}
              </em>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {contacts.map(item => (
                <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    background: "rgba(255,140,30,0.08)",
                    border: `1.5px solid rgba(255,140,30,0.25)`,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: C.orange, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontFamily: FB, fontSize: 14, color: C.textMuted, lineHeight: 1.5 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default Localisation;