import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import useInView from '../utils/useInView';
import { useLanguage } from '../i18n';

function FleetShowcase() {
  const [ref, visible] = useInView(0.1);
  const { t } = useLanguage();

  // Get fleet items safely
  const fleetRaw = t('parts.components.fleetShowcase.items', { returnObjects: true });
  const fleet = Array.isArray(fleetRaw) ? fleetRaw : [];

  // Get description
  const fleetDesc = t('parts.components.fleetShowcase.desc');

  return (
    <section
      ref={ref}
      style={{
        background: C.white,
        padding: "96px 0",
        borderTop: `1px solid ${C.borderLight}`
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 56,
            animation: visible ? "fadeUp 0.6s ease both" : "none"
          }}
        >
          <SLabel center>
            {t('parts.components.fleetShowcase.label')}
          </SLabel>

          <h2 style={{ fontFamily: FD, fontSize: 48, fontWeight: 700, lineHeight: 1.1 }}>
            {t('parts.components.fleetShowcase.titleLine1')}<br />
            <em style={{ color: C.orange }}>
              {t('parts.components.fleetShowcase.titleHighlight')}
            </em>
          </h2>

          {/* Description paragraph */}
          {fleetDesc && (
            <p style={{
              fontFamily: FB,
              fontSize: 15,
              fontWeight: 400,
              color: C.textMuted,
              maxWidth: 560,
              margin: "16px auto 0",
              lineHeight: 1.8
            }}>
              {fleetDesc}
            </p>
          )}
        </div>

        {/* Fleet Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 22
          }}
        >
          {fleet.map((f, i) => (
            <div
              key={i}
              style={{
                background: C.cardBg,
                border: `1px solid ${C.borderLight}`,
                borderRadius: 8,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.25s",
              }}
            >
              {/* Image */}
              <div style={{ width: "100%", paddingTop: "60%", position: "relative", overflow: "hidden" }}>
                <img
                  src={f.image}
                  alt={f.label}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={(e) => e.currentTarget.style.display = "none"}
                />
              </div>

              {/* Content */}
              <div style={{ padding: 20, flex: 1 }}>
                <h3 style={{
                  fontFamily: FD,
                  fontSize: 18,
                  marginBottom: 8
                }}>
                  {f.label}
                </h3>
                <p style={{
                  fontFamily: FB,
                  fontSize: 14,
                  color: C.textMuted,
                  lineHeight: 1.7
                }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FleetShowcase;