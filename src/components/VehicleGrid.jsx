import { useState, useEffect } from "react";
import { C, FD, FB } from '../theme';
import useInView from '../utils/useInView';
import SLabel from './SLabel';
import VehicleCard from './VehicleCard';
import { useLanguage } from '../i18n';

function VehicleGrid() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [ref, visible] = useInView(0.05);
  const [isMobile, setIsMobile] = useState(false);

  // Track screen width to adjust grid columns
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const vehiclesData = t('parts.components.vehicles') || {};
  const VEHICLES = Array.isArray(vehiclesData.items) ? vehiclesData.items : [];
  const CATEGORIES = Array.isArray(vehiclesData.categories) ? vehiclesData.categories : [];
  const header = vehiclesData.header || {};

  const filtered = activeFilter === "all"
    ? VEHICLES
    : VEHICLES.filter(v => v.categoryKey === activeFilter);

  return (
    <section ref={ref} style={{ 
      background: C.pageBg, 
      padding: isMobile ? "64px 0" : "88px 0" 
    }}>
      <style>{`
        .category-pill:hover {
          background: rgba(255,140,30,0.1) !important;
          border-color: rgb(255,140,30) !important;
          color: rgb(200,85,5) !important;
        }
        .category-pill.active {
          background: rgb(255,140,30) !important;
          border-color: rgb(255,140,30) !important;
          color: rgb(18,18,20) !important;
          font-weight: 700 !important;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ 
        maxWidth: 1280, 
        margin: "0 auto", 
        padding: isMobile ? "0 24px" : "0 64px" 
      }}>
        {/* Header */}
        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end", 
          justifyContent: "space-between", 
          marginBottom: isMobile ? 32 : 48,
          gap: 20,
          animation: visible ? "fadeUp 0.6s ease both" : "none" 
        }}>
          <div>
            <SLabel>{header.label}</SLabel>
            <h2 style={{ 
              fontFamily: FD, 
              fontSize: isMobile ? 32 : 44, 
              fontWeight: 700, 
              color: C.textBody, 
              lineHeight: 1.05 
            }}>
              {header.line1}<br />
              <em style={{ color: C.orange, fontStyle: "italic" }}>
                {header.line2}
              </em>
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{ 
            display: "flex", 
            gap: 8, 
            flexWrap: "wrap" 
          }}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.key}
                className={`category-pill ${activeFilter === cat.key ? "active" : ""}`}
                onClick={() => setActiveFilter(cat.key)}
                style={{
                  fontFamily: FB, fontSize: 12, fontWeight: 500,
                  background: C.white, border: `1.5px solid ${C.borderLight}`,
                  color: C.graphite, padding: "9px 20px", borderRadius: 4,
                  cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.04em",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid - Stacks 1-column on mobile, 3-columns on desktop */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", 
          gap: 24 
        }}>
          {filtered.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} visible={visible} />
          ))}
        </div>

        {/* Count */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <span style={{ fontFamily: FB, fontSize: 13, color: C.textMuted }}>
            {vehiclesData.count?.replace('{count}', filtered.length)}
          </span>
        </div>
      </div>
    </section>
  );
}

export default VehicleGrid;