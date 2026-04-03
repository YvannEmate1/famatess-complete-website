import { C, FD, FB } from '../theme';
import useInView from '../utils/useInView';
import { useLanguage } from '../i18n';

function ActivitiesCTABanner() {
  const [ref, visible] = useInView(0.2);
  const { t } = useLanguage();

  return (
    <section ref={ref} style={{ background: C.orange, padding: "80px 0", position: "relative", overflow: "hidden" }}>
      
      <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", fontFamily: FD, fontSize: 180, fontWeight: 900, color: "rgba(180,70,0,0.12)", lineHeight: 1, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>
        {t("company.name")}
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}>
          
          <div style={{ animation: visible ? "fadeUp 0.7s ease both" : "none" }}>
            <p style={{ fontFamily: FB, fontSize: 16, color: "rgba(18,18,20,0.62)", lineHeight: 1.75, maxWidth: 500 }}>
              {t("parts.components.activitiesCTA.description")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ActivitiesCTABanner;