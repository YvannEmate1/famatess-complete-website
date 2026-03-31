import { useEffect, useState } from "react";
import { C, FD, FB } from '../theme';
import { useLanguage } from '../i18n';

function VehicleModal({ vehicle, onClose }) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const handler = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    
    return () => { 
      window.removeEventListener('resize', handleResize);
      document.removeEventListener("keydown", handler); 
      document.body.style.overflow = ""; 
    };
  }, [onClose]);

  if (!vehicle) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(18,18,20,0.65)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "12px" : "24px", 
      animation: "fadeIn 0.2s ease both",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.white,
        border: `1px solid ${C.borderLight}`,
        borderRadius: 8,
        maxWidth: 740, width: "100%",
        maxHeight: isMobile ? "90vh" : "auto",
        overflowY: isMobile ? "auto" : "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
        animation: "scaleIn 0.25s cubic-bezier(0.34,1.3,0.64,1) both",
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          background: C.black, 
          padding: isMobile ? "12px 16px" : "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: `3px solid ${C.orange}`,
          position: 'sticky', top: 0, zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              background: vehicle.badgeColor, color: "#fff",
              fontFamily: FB, fontSize: 10, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "3px 10px", borderRadius: 3,
            }}>
              {vehicle.badge}
            </div>
            {!isMobile && (
              <span style={{ fontFamily: FB, fontSize: 12, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {vehicle.category}
              </span>
            )}
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)",
            color: C.silver, width: 32, height: 32, borderRadius: 3,
            cursor: "pointer", fontSize: 18, display: "flex",
            alignItems: "center", justifyContent: "center", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.orange; e.currentTarget.style.color = C.black; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = C.silver; }}
          >×</button>
        </div>

        {/* Body - Switches to 1 column on mobile */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" 
        }}>
          {/* Image Side */}
          <div style={{
            background: C.cardImgBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "30px 20px" : "40px 32px", 
            position: "relative", 
            minHeight: isMobile ? 220 : 300,
          }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 60%, ${vehicle.badgeColor}18 0%, transparent 68%)` }} />
            <img
              src={vehicle.image} alt={vehicle.name}
              style={{
                maxWidth: "100%", 
                maxHeight: isMobile ? 160 : 220, 
                objectFit: "contain",
                filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.12))",
                position: "relative", zIndex: 1,
              }}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
          </div>

          {/* Content Side */}
          <div style={{ 
            padding: isMobile ? "24px 20px 28px" : "28px 30px 32px", 
            background: C.white 
          }}>
            <h2 style={{ 
              fontFamily: FD, 
              fontSize: 'clamp(20px, 4vw, 24px)', 
              fontWeight: 900, 
              color: C.textBody, 
              lineHeight: 1.2, 
              marginBottom: 12 
            }}>
              {vehicle.name}
            </h2>
            <p style={{ 
              fontFamily: FB, 
              fontSize: 'clamp(13px, 1.8vw, 14px)', 
              fontWeight: 400, 
              color: C.textMuted, 
              lineHeight: 1.8, 
              marginBottom: 22 
            }}>
              {vehicle.desc}
            </p>

            <div style={{ marginBottom: 10 }}>
              <div style={{ 
                fontFamily: FB, 
                fontSize: 10, 
                fontWeight: 700, 
                letterSpacing: "0.16em", 
                textTransform: "uppercase", 
                color: C.orange, 
                marginBottom: 12 
              }}>
                Technical Specifications
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {vehicle.specs && vehicle.specs.map((spec, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: vehicle.badgeColor, flexShrink: 0 }} />
                    <span style={{ 
                      fontFamily: FB, 
                      fontSize: 'clamp(12px, 1.6vw, 13px)', 
                      color: C.textBody 
                    }}>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { 
          from { opacity: 0; transform: scale(0.96) translateY(10px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
      `}</style>
    </div>
  );
}

export default VehicleModal;