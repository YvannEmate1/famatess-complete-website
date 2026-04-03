import { useState } from "react";
import { C, FD, FB } from '../theme';
import VehicleModal from './VehicleModal';
import { useLanguage } from '../i18n';

function VehicleCard({ vehicle, index, visible }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Use the name from the JSON object, or a fallback
  const name = vehicle?.name || "Vehicle";
  const desc = vehicle?.desc || "";
  const specs = Array.isArray(vehicle?.specs) ? vehicle.specs : [];
  const badge = vehicle?.badge || "";
  const category = vehicle?.category || "";

  return (
    <>
      <style>{`
        .vehicle-card {
          transition: transform 0.28s cubic-bezier(0.34,1.46,0.64,1),
                      box-shadow 0.28s ease,
                      border-color 0.28s ease !important;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 1px 8px rgba(0,0,0,0.05);
        }
        .vehicle-card:hover {
          transform: translateY(-8px) scale(1.015) !important;
          box-shadow: 0 24px 56px rgba(255,140,30,0.13), 0 6px 18px rgba(0,0,0,0.07) !important;
          border-color: ${C.orange || 'rgb(255,140,30)'} !important;
        }
        .vehicle-card:hover .card-img-wrap { background: rgb(230,234,240) !important; }
        .vehicle-card:hover .card-img { transform: scale(1.10) !important; }
        .vehicle-card:hover .card-arrow {
          opacity: 1 !important;
          transform: translateX(4px) !important;
          background: ${C.orange || 'rgb(255,140,30)'} !important;
          color: #121214 !important;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="vehicle-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
        role="button"
        aria-label={`View details for ${name}`}
        style={{
          background: C.cardBg || "#fff",
          border: `1px solid ${C.borderLight || "rgb(225,228,233)"}`,
          animation: visible ? `fadeUp 0.6s ease ${index * 0.08}s both` : "none",
        }}
      >
        {/* Badge */}
        {badge && (
          <div style={{
            position: "absolute", top: 14, left: 14, zIndex: 3,
            background: vehicle.badgeColor || C.orange,
            color: "#fff", fontFamily: FB, fontSize: 10, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "3px 10px", borderRadius: 3,
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}>
            {badge}
          </div>
        )}

        {/* Category chip */}
        <div style={{
          position: "absolute", top: 14, right: 14, zIndex: 3,
          background: "rgba(255,255,255,0.90)", backdropFilter: "blur(4px)",
          color: C.graphite, fontFamily: FB, fontSize: 10, fontWeight: 600,
          padding: "3px 10px", borderRadius: 3,
          border: `1px solid ${C.borderLight || "rgb(225,228,233)"}`,
        }}>
          {category}
        </div>

        {/* Image zone */}
        <div className="card-img-wrap" style={{
          height: 240, flexShrink: 0, background: C.cardImgBg || "rgb(238,241,245)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", position: "relative", transition: "background 0.3s",
          borderBottom: `1px solid ${C.borderLight || "rgb(225,228,233)"}`,
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse 70% 58% at 50% 72%, ${vehicle.badgeColor || C.orange}18 0%, transparent 70%)`,
          }} />

          <img
            className="card-img"
            src={vehicle.image}
            alt={name}
            style={{
              width: "88%", height: "88%", objectFit: "contain",
              transition: "transform 0.4s cubic-bezier(0.34,1.2,0.64,1)",
              zIndex: 1, filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.12))",
            }}
            onError={e => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
          <div style={{
            display: "none", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 8, position: "absolute", inset: 0,
            color: C.silver || "rgb(220,220,224)", fontFamily: FB, fontSize: 12,
          }}>
            <span style={{ fontSize: 44, opacity: 0.2 }}>
              {vehicle.categoryKey === "light" ? "🚗" : "🚧"}
            </span>
            <span style={{ opacity: 0.4 }}>{t('common.imageComingSoon', 'Image à venir')}</span>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: "18px 22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
          <h3 style={{
            fontFamily: FD, fontSize: 18, fontWeight: 700,
            color: C.textBody || "rgb(28,30,36)", lineHeight: 1.25, marginBottom: 10,
          }}>
            {name}
          </h3>

          <p style={{
            fontFamily: FB, fontSize: 13, color: C.textMuted || "rgb(90,96,108)",
            lineHeight: 1.75, margin: "0 0 14px 0",
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
            overflow: "hidden", minHeight: "68px",
          }}>
            {desc}
          </p>

          <div style={{ height: 1, background: C.borderLight || "rgb(225,228,233)", marginBottom: 14 }} />

          {/* Specs pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {specs.map((spec, i) => (
              <span key={i} style={{
                fontFamily: FB, fontSize: 11, fontWeight: 500,
                color: C.graphite || "rgb(80,80,88)", background: C.offwhite || "rgb(248,248,250)",
                border: `1px solid ${C.borderLight || "rgb(225,228,233)"}`,
                padding: "4px 10px", borderRadius: 3,
              }}>
                {spec}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
            <span style={{
              fontFamily: FB, fontSize: 12, fontWeight: 600, color: C.orange,
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              {/* FIXED: Using an existing key from translation.json */}
              {t('parts.components.aboutActivities.learnMore', 'View Details')}
            </span>

            <div className="card-arrow" style={{
              width: 30, height: 30, background: "rgba(255,140,30,0.09)",
              border: "1px solid rgba(255,140,30,0.28)", borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.orange, fontSize: 13, opacity: 0.65, transition: "all 0.22s",
            }}>
              →
            </div>
          </div>
        </div>

        {/* Accent stripe */}
        <div style={{
          height: 3, flexShrink: 0,
          background: hovered ? `linear-gradient(to right, ${vehicle.badgeColor || C.orange}, ${C.orange})` : C.borderLight,
          transition: "background 0.3s",
        }} />
      </div>

      {modalOpen && <VehicleModal vehicle={vehicle} onClose={() => setModalOpen(false)} />}
    </>
  );
}

export default VehicleCard;