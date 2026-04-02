import { useState, useEffect, useRef, useCallback } from 'react';
import { C, FD, FB } from '../theme';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

/* ─────────────────────────────────────────────
   useInView
───────────────────────────────────────────── */
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
   ACTIVITIES DATA CONFIG
───────────────────────────────────────────── */
const ACTIVITIES_CONFIG = [
    {
        id: 'vehicles',
        icon: '🚗',
        color: C.orange,
        link: '/automobile', // Updated to match Famatess Automobile rebranding
        image: '/Assets/bulldozer1.webp',
    },
    {
        id: 'btp',
        icon: '🏗️',
        color: C.blue,
        link: '/btp',
        image: '/Assets/house2.jpg',
    },
    {
        id: 'logistics',
        icon: '🚛',
        color: C.green,
        link: '/logistics',
        image: '/Assets/containerHandling.jpg', // Generic image used per privacy guidelines
    },
    {
        id: 'earthworks',
        icon: '⛏️',
        color: C.yellow,
        link: '/btp',
        image: '/Assets/excaResi.avif',
    },
    {
        id: 'customs',
        icon: '📦',
        color: C.purple,
        link: '/logistics',
        image: '/Assets/containerHandling.jpg',
    },
];

/* ─────────────────────────────────────────────
   SLIDE CARD
───────────────────────────────────────────── */
function ActivityCard({ activity, isActive, isSide }) {
    const [hov, setHov] = useState(false);

    // Responsive scaling and visibility
    const scale = isActive ? 1 : 0.92;
    const opac = isActive ? 1 : 0.3;
    const zIndex = isActive ? 3 : 1;
    const blur = isActive ? 'none' : 'blur(2px)';

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className={isSide ? 'fam-side-card' : ''}
            style={{
                transform: `scale(${isActive && hov ? 1.02 : scale})`,
                opacity: opac,
                zIndex,
                filter: blur,
                transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                pointerEvents: isActive ? 'auto' : 'none',
                background: C.cardBg,
                borderRadius: 12,
                overflow: 'hidden',
                border: `1px solid ${isActive && hov ? activity.color : isActive ? `${activity.color}40` : C.borderLight}`,
                boxShadow: isActive
                    ? `0 20px 40px rgba(0,0,0,0.1), 0 0 0 ${hov ? 4 : 0}px ${activity.color}20`
                    : 'none',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                maxWidth: isActive ? '100%' : '90%',
                margin: '0 auto',
            }}
        >
            {/* Image zone */}
            <div style={{
                height: 'clamp(180px, 25vw, 280px)',
                background: C.cardImgBg,
                position: 'relative', overflow: 'hidden',
                flexShrink: 0,
            }}>
                <img
                    src={activity.image}
                    alt={activity.title}
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transform: hov && isActive ? 'scale(1.08)' : 'scale(1)',
                        transition: 'transform 0.6s ease',
                    }}
                />
                <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: activity.color, color: '#fff',
                    fontFamily: FB, fontSize: 10, fontWeight: 700,
                    padding: '4px 10px', borderRadius: 4,
                }}>
                    {activity.category}
                </div>
            </div>

            {/* Body */}
            <div style={{
                padding: 'clamp(16px, 4vw, 24px)',
                flex: 1, display: 'flex', flexDirection: 'column',
            }}>
                <h3 style={{
                    fontFamily: FD, fontSize: 'clamp(18px, 3vw, 22px)',
                    fontWeight: 700, color: C.textBody, marginBottom: 8,
                }}>{activity.title}</h3>

                <p style={{
                    fontFamily: FB, fontSize: 'clamp(13px, 2vw, 14px)',
                    color: C.textMuted, lineHeight: 1.6, marginBottom: 16,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>{activity.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                    {activity.highlights.slice(0, 3).map(h => (
                        <span key={h} style={{
                            fontSize: 10, fontWeight: 600, color: C.graphite,
                            background: C.offwhite, padding: '3px 8px', borderRadius: 4,
                        }}>{h}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function FamActivities() {
    const { t } = useLanguage();
    const [ref, visible] = useInView(0.05);
    const [active, setActive] = useState(0);
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef(0);
    const autoRef = useRef(null);
    const total = ACTIVITIES_CONFIG.length;

    const data = t('parts.components.famActivities', { returnObjects: true }) || {};
    const rawActivities = Array.isArray(data.activities) ? data.activities : [];

    const ACTIVITIES = ACTIVITIES_CONFIG.map((cfg, i) => {
        const textObj = rawActivities[i] || {};
        return {
            ...cfg,
            category: textObj.category || '',
            title: textObj.title || '',
            desc: textObj.desc || '',
            highlights: Array.isArray(textObj.highlights) ? textObj.highlights : []
        };
    });

    const startAuto = useCallback(() => {
        clearInterval(autoRef.current);
        autoRef.current = setInterval(() => setActive(p => (p + 1) % total), 5000);
    }, [total]);

    useEffect(() => {
        startAuto();
        return () => clearInterval(autoRef.current);
    }, [startAuto]);

    const goTo = (i) => { setActive(i); startAuto(); };
    const prev = () => goTo((active - 1 + total) % total);
    const next = () => goTo((active + 1) % total);

    const onDragStart = (x) => { dragStart.current = x; setDragging(true); clearInterval(autoRef.current); };
    const onDragEnd = (x) => {
        if (!dragging) return;
        const diff = dragStart.current - x;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        setDragging(false);
        startAuto();
    };

    return (
        <section ref={ref} style={{ background: C.pageBg, padding: 'clamp(48px, 8vw, 80px) 0', overflow: 'hidden' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

                {/* Header: Stacks on mobile */}
                <div style={{ marginBottom: 40, textAlign: 'center', maxWidth: 700, margin: '0 auto 48px' }}>
                    <SLabel>{data.label || 'Nos Activités'}</SLabel>
                    <h2 style={{ fontFamily: FD, fontSize: 'clamp(26px, 5vw, 42px)', color: C.textBody, margin: '12px 0' }}>
                        {data.title} <span style={{ color: C.orange, fontStyle: 'italic' }}>{data.emphasis}</span>
                    </h2>
                    <p style={{ fontFamily: FB, fontSize: 'clamp(14px, 2vw, 16px)', color: C.textMuted, lineHeight: 1.6 }}>
                        {data.sub}
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    style={{ position: 'relative', touchAction: 'pan-y' }}
                    onMouseDown={e => onDragStart(e.clientX)}
                    onMouseUp={e => onDragEnd(e.clientX)}
                    onTouchStart={e => onDragStart(e.touches[0].clientX)}
                    onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
                >
                    <div className="fam-carousel-grid" style={{
                        display: 'grid',
                        alignItems: 'center',
                        gap: 20,
                        minHeight: 450
                    }}>
                        <div onClick={prev} style={{ cursor: 'pointer' }} className="fam-side-card">
                            <ActivityCard activity={ACTIVITIES[(active - 1 + total) % total]} isSide />
                        </div>

                        <ActivityCard activity={ACTIVITIES[active]} isActive />

                        <div onClick={next} style={{ cursor: 'pointer' }} className="fam-side-card">
                            <ActivityCard activity={ACTIVITIES[(active + 1) % total]} isSide />
                        </div>
                    </div>

                    {/* Navigation Arrows: Hidden on very small screens */}
                    <button className="fam-nav-btn prev" onClick={prev}>←</button>
                    <button className="fam-nav-btn next" onClick={next}>→</button>
                </div>

                {/* Indicators */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
                    {ACTIVITIES.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => goTo(i)}
                            style={{
                                width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                                background: i === active ? ACTIVITIES[active].color : C.borderLight,
                                cursor: 'pointer', transition: 'all 0.3s'
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                .fam-carousel-grid {
                    grid-template-columns: 1fr 2fr 1fr;
                }
                .fam-nav-btn {
                    position: absolute; top: 50%; transform: translateY(-50%);
                    width: 44px; height: 44px; border-radius: 50%;
                    background: ${C.white}; border: 1px solid ${C.borderLight};
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    z-index: 10; transition: all 0.2s;
                }
                .fam-nav-btn.prev { left: -22px; }
                .fam-nav-btn.next { right: -22px; }
                .fam-nav-btn:hover { background: ${C.orange}; color: white; border-color: ${C.orange}; }

                @media (max-width: 900px) {
                    .fam-carousel-grid { grid-template-columns: 1fr; }
                    .fam-side-card { display: none; }
                    .fam-nav-btn { display: none; }
                }
            `}</style>
        </section>
    );
}
