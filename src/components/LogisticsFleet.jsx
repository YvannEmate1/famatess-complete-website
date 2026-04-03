import { useRef, useState, useEffect } from 'react';
import { C, FD, FB } from '../theme';
import SLabel from './SLabel';

function useInView(th = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: th }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [th]);
  return [ref, v];
}

/* ─────────────────────────────────────────────
   FLEET DATA
   ↓ Replace each `image` with your public/ path
   e.g.  image: "/logistics/fleet/low-loader.jpg"
───────────────────────────────────────────── */
const FLEET = [
  {
    id: 1,
    type: 'Heavy Haulage',
    typeColor: C.orange,
    name: 'Low-Loader Trailer',
    capacity: 'Up to 80 tonnes',
    desc: 'Purpose-built for transporting excavators, bulldozers and heavy industrial machinery over long distances.',
    specs: ['80T payload', 'Hydraulic ramps', 'GPS tracked', 'Escort capable'],
    image: '/logistics/fleet/low-loader.jpg',      // ↓ REPLACE
    size: 'large',
  },
  {
    id: 2,
    type: 'Freight',
    typeColor: C.green,
    name: 'Curtainsider Truck',
    capacity: '25 tonnes',
    desc: 'Versatile enclosed truck for general cargo, packaged goods, and distribution across urban and regional routes.',
    specs: ['25T payload', 'Curtain sides', 'Tail lift', 'Refrigerated option'],
    image: '/logistics/fleet/curtainsider.jpg',    // ↓ REPLACE
    size: 'normal',
  },
  {
    id: 3,
    type: 'Heavy Haulage',
    typeColor: C.orange,
    name: 'Flatbed Trailer',
    capacity: '40 tonnes',
    desc: 'Ideal for construction materials, steel, pipes, and any oversized or irregularly shaped loads.',
    specs: ['40T payload', 'Extendable bed', 'Tie-down rings', 'Crane loadable'],
    image: '/logistics/fleet/flatbed.jpg',         // ↓ REPLACE
    size: 'normal',
  },
  {
    id: 4,
    type: 'Distribution',
    typeColor: C.blue,
    name: 'Light Delivery Van',
    capacity: '3.5 tonnes',
    desc: 'Fast urban and last-mile delivery for documents, spare parts, light cargo and time-critical shipments.',
    specs: ['3.5T payload', 'Urban capable', 'Express delivery', 'GPS tracked'],
    image: '/logistics/fleet/delivery-van.jpg',    // ↓ REPLACE
    size: 'normal',
  },
  {
    id: 5,
    type: 'Freight',
    typeColor: C.green,
    name: 'Tipper Truck',
    capacity: '15 tonnes',
    desc: 'For bulk material transport — sand, gravel, soil and construction aggregates across Cameroon.',
    specs: ['15T payload', 'Hydraulic tipper', 'Reinforced bed', 'Off-road capable'],
    image: '/logistics/fleet/tipper.jpg',          // ↓ REPLACE
    size: 'normal',
  },
  {
    id: 6,
    type: 'Storage',
    typeColor: C.purple,
    name: 'Warehouse Unit — Douala',
    capacity: '2 000 m²',
    desc: 'Secure enclosed warehouse facility at the Douala logistics hub, equipped for container destuffing and re-palletising.',
    specs: ['2 000 m²', 'Container access', '24/7 security', 'CCTV monitored'],
    image: '/logistics/fleet/warehouse-douala.jpg',// ↓ REPLACE
    size: 'large',
  },
];

/* ── Fleet Card ── */
function FleetCard({ item, index, visible }) {
  const [hov, setHov] = useState(false);
  const isLarge = item.size === 'large';

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
        background: C.cardBg,
        border: `1px solid ${hov ? item.typeColor : C.borderLight}`,
        borderRadius: 6, overflow: 'hidden',
        boxShadow: hov ? `0 20px 48px rgba(0,0,0,0.09)` : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.2,0.64,1)',
        animation: visible ? `lgFadeUp 0.6s ease ${index * 0.08}s both` : 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: isLarge ? 'row' : 'column',
      }}
    >
      {/* Image zone */}
      <div style={{
        height: isLarge ? 'auto' : 200,
        width: isLarge ? '55%' : '100%',
        minHeight: isLarge ? 260 : 'auto',
        background: C.cardImgBg,
        position: 'relative', overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            display: 'block',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
          onError={e => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback */}
        <div style={{
          display: 'none', position: 'absolute', inset: 0,
          alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8,
          color: C.silver, fontFamily: FB, fontSize: 12,
        }}>
          <span style={{ fontSize: 44, opacity: 0.2 }}>🚛</span>
          <span style={{ opacity: 0.4 }}>Image coming soon</span>
        </div>
        {/* Gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
          pointerEvents: 'none',
        }} />
        {/* Type badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: item.typeColor, color: '#fff',
          fontFamily: FB, fontSize: 10, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 3,
        }}>
          {item.type}
        </div>
        {/* Capacity */}
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(18,18,20,0.78)', backdropFilter: 'blur(4px)',
          color: C.orangeTint, fontFamily: FD, fontSize: 13, fontWeight: 700,
          padding: '4px 12px', borderRadius: 3,
        }}>
          {item.capacity}
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: '20px 22px 22px',
        display: 'flex', flexDirection: 'column', flex: 1,
        borderTop: isLarge ? 'none' : `1px solid ${C.borderLight}`,
        borderLeft: isLarge ? `1px solid ${C.borderLight}` : 'none',
      }}>
        <h3 style={{
          fontFamily: FD, fontSize: 18, fontWeight: 700,
          color: C.textBody, lineHeight: 1.25, marginBottom: 8,
        }}>
          {item.name}
        </h3>
        <p style={{
          fontFamily: FB, fontSize: 13, fontWeight: 400,
          color: C.textMuted, lineHeight: 1.7, marginBottom: 16,
          flex: 1,
        }}>
          {item.desc}
        </p>

        {/* Specs pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {item.specs.map(spec => (
            <span key={spec} style={{
              fontFamily: FB, fontSize: 11, fontWeight: 500,
              color: C.graphite,
              background: C.offwhite,
              border: `1px solid ${C.borderLight}`,
              padding: '4px 10px', borderRadius: 3,
            }}>
              {spec}
            </span>
          ))}
        </div>

        
      </div>

      {/* Bottom stripe */}
      <div style={{
        height: 3, flexShrink: 0,
        background: hov
          ? `linear-gradient(to right, ${item.typeColor}, ${C.orange})`
          : C.borderLight,
        transition: 'background 0.3s',
        /* for column layout this sits at bottom; for row layout we use absolute positioning */
        ...(isLarge ? {
          position: 'absolute', bottom: 0, left: 0, right: 0,
        } : {}),
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   LogisticsFleet — exported component
───────────────────────────────────────────── */
export default function LogisticsFleet() {
  const [ref, visible] = useInView(0.08);
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Heavy Haulage', 'Freight', 'Distribution', 'Storage'];
  const filtered = filter === 'All' ? FLEET : FLEET.filter(f => f.type === filter);

  return (
    <section style={{ background: C.white, padding: '96px 0', borderTop: `1px solid ${C.borderLight}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>

        {/* Header */}
        <div ref={ref} style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 52,
          animation: visible ? 'lgFadeUp 0.6s ease both' : 'none',
        }}>
          <div>
            <SLabel>Our Fleet & Facilities</SLabel>
            <h2 style={{ fontFamily: FD, fontSize: 48, fontWeight: 700, color: C.textBody, lineHeight: 1.08 }}>
              The equipment that<br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>drives our logistics.</em>
            </h2>
          </div>
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{
                  fontFamily: FB, fontSize: 12,
                  fontWeight: filter === f ? 700 : 500,
                  background: filter === f ? C.orange : C.white,
                  border: `1.5px solid ${filter === f ? C.orange : C.borderLight}`,
                  color: filter === f ? C.black : C.graphite,
                  padding: '8px 18px', borderRadius: 4,
                  cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.04em',
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {filtered.map((item, i) => (
            <FleetCard key={item.id} item={item} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lgFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
