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
   Static UI config. Text data comes from i18n
───────────────────────────────────────────── */
const ACTIVITIES_CONFIG = [
    {
        id: 'vehicles',
        icon: '🚗',
        color: C.orange,
        link: '/activities',
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
        image: '/Assets/elecamImage.jpg',
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
function ActivityCard({ activity, isActive, isPrev, isNext }) {
    const [hov, setHov] = useState(false);

    const scale = isActive ? 1 : 0.88;
    const opac = isActive ? 1 : 0.45;
    const zIndex = isActive ? 3 : 1;
    const blur = isActive ? 'none' : 'blur(1.5px)';

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                transform: `scale(${isActive && hov ? 1.01 : scale})`,
                opacity: opac,
                zIndex,
                filter: blur,
                transition: 'all 0.45s cubic-bezier(0.34,1.1,0.64,1)',
                pointerEvents: isActive ? 'auto' : 'none',
                background: C.cardBg,
                borderRadius: 10,
                overflow: 'hidden',
                border: `1px solid ${isActive && hov ? activity.color : isActive ? `${activity.color}50` : C.borderLight}`,
                boxShadow: isActive
                    ? `0 24px 64px rgba(0,0,0,0.12), 0 0 0 ${hov ? 3 : 1}px ${activity.color}30`
                    : '0 4px 16px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            }}
        >
            {/* ── Image zone ── */}
            <div style={{
                height: 'clamp(200px, 30vw, 320px)',
                background: C.cardImgBg,
                position: 'relative', overflow: 'hidden',
                flexShrink: 0,
            }}>
                <img
                    src={activity.image}
                    alt={activity.title}
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        transform: hov && isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.5s ease',
                    }}
                    onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                />
                {/* Image fallback */}
                <div style={{
                    display: 'none', position: 'absolute', inset: 0,
                    alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: 10,
                    background: C.cardImgBg, color: C.silver, fontFamily: FB,
                }}>
                    <span style={{ fontSize: 'clamp(40px, 7vw, 64px)', opacity: 0.18 }}>{activity.icon}</span>
                    <span style={{ fontSize: 12, opacity: 0.4 }}>Image à venir</span>
                </div>

                {/* Gradient overlay */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    pointerEvents: 'none',
                }} />

                {/* Category badge */}
                <div style={{
                    position: 'absolute', top: 14, left: 14,
                    background: activity.color, color: '#fff',
                    fontFamily: FB, fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '4px 12px', borderRadius: 3,
                    boxShadow: `0 2px 8px ${activity.color}50`,
                }}>
                    {activity.category}
                </div>

                {/* Icon badge top-right */}
                <div style={{
                    position: 'absolute', top: 14, right: 14,
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'rgba(18,18,20,0.7)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, border: '1px solid rgba(255,255,255,0.12)',
                }}>
                    {activity.icon}
                </div>
            </div>

            {/* ── Body ── */}
            <div style={{
                padding: 'clamp(18px, 3vw, 26px)',
                flex: 1, display: 'flex', flexDirection: 'column',
                borderTop: `1px solid ${C.borderLight}`,
            }}>
                <h3 style={{
                    fontFamily: FD,
                    fontSize: 'clamp(17px, 2.2vw, 21px)',
                    fontWeight: 700, color: C.textBody,
                    lineHeight: 1.2, marginBottom: 10,
                }}>
                    {activity.title}
                </h3>

                <p style={{
                    fontFamily: FB,
                    fontSize: 'clamp(12px, 1.6vw, 14px)',
                    fontWeight: 400, color: C.textMuted,
                    lineHeight: 1.75, marginBottom: 16,
                    flex: 1,
                }}>
                    {activity.desc}
                </p>

                {/* Highlights pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                    {activity.highlights.map(h => (
                        <span key={h} style={{
                            fontFamily: FB, fontSize: 11, fontWeight: 500,
                            color: C.graphite, background: C.offwhite,
                            border: `1px solid ${C.borderLight}`,
                            padding: '4px 10px', borderRadius: 3,
                        }}>
                            {h}
                        </span>
                    ))}
                </div>

                {/* CTA row */}
                <a href={activity.link} style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: 'auto',
                    textDecoration: 'none'
                }}>
                    <div style={{
                        width: 30, height: 30,
                        background: `${activity.color}14`,
                        border: `1px solid ${activity.color}30`,
                        borderRadius: 3,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: activity.color, fontSize: 13,
                        transition: 'all 0.2s',
                        opacity: hov ? 1 : 0.55,
                    }}>→</div>
                </a>
            </div>

            {/* Bottom colour stripe */}
            <div style={{
                height: 3, flexShrink: 0,
                background: isActive
                    ? `linear-gradient(to right, ${activity.color}, ${C.orange})`
                    : C.borderLight,
                transition: 'background 0.4s',
            }} />
        </div>
    );
}

/* ─────────────────────────────────────────────
   FamActivities — main exported component
   src/components/FamActivities.jsx
───────────────────────────────────────────── */
export default function FamActivities() {
    const { t } = useLanguage();
    const [ref, visible] = useInView(0.06);
    const [active, setActive] = useState(0);
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef(0);
    const autoRef = useRef(null);
    const total = ACTIVITIES_CONFIG.length;

    /* Text from translation (with fallbacks) */
    const data = t('parts.components.famActivities', { returnObjects: true }) || {};
    const label = data.label || 'Nos Activités';
    const title = data.title || 'Tout ce que nous';
    const emph = data.emphasis || 'faisons pour vous.';
    const sub = data.sub || "FAMATESS COMPANY opère dans six domaines d'activité complémentaires — du véhicule neuf au chantier de construction, en passant par la logistique et le terrassement.";
    const countLabel = data.countLabel || 'activités';
    const rawActivities = Array.isArray(data.activities) ? data.activities : [];

    /* Merge static UI config with translated text */
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

    /* ── Auto-play ── */
    const startAuto = useCallback(() => {
        clearInterval(autoRef.current);
        autoRef.current = setInterval(() => {
            setActive(p => (p + 1) % total);
        }, 4500);
    }, [total]);

    useEffect(() => {
        startAuto();
        return () => clearInterval(autoRef.current);
    }, [startAuto]);

    const goTo = (i) => {
        setActive(i);
        startAuto(); /* reset timer on manual navigation */
    };
    const prev = () => goTo((active - 1 + total) % total);
    const next = () => goTo((active + 1) % total);

    /* ── Touch / drag support ── */
    const onDragStart = (clientX) => {
        dragStart.current = clientX;
        setDragging(true);
        clearInterval(autoRef.current);
    };
    const onDragEnd = (clientX) => {
        if (!dragging) return;
        const diff = dragStart.current - clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        setDragging(false);
        startAuto();
    };

    /* ── Visible neighbours ── */
    const prevIdx = (active - 1 + total) % total;
    const nextIdx = (active + 1) % total;

    return (
        <section
            ref={ref}
            style={{
                background: C.pageBg,
                padding: 'clamp(64px, 10vw, 96px) 0',
                borderTop: `1px solid ${C.borderLight}`,
                overflow: 'hidden',
            }}
        >
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>

                {/* ── HEADER ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: 'clamp(20px, 4vw, 48px)',
                    alignItems: 'flex-end',
                    marginBottom: 'clamp(36px, 6vw, 56px)',
                    animation: visible ? 'famFadeUp 0.6s ease both' : 'none',
                }}>
                    <div>
                        <SLabel>{label}</SLabel>
                        <h2 style={{
                            fontFamily: FD,
                            fontSize: 'clamp(28px, 5vw, 48px)',
                            fontWeight: 700, color: C.textBody, lineHeight: 1.08,
                        }}>
                            {title}<br />
                            <em style={{ color: C.orange, fontStyle: 'italic' }}>{emph}</em>
                        </h2>
                    </div>
                    <p style={{
                        fontFamily: FB,
                        fontSize: 'clamp(13px, 1.7vw, 15px)',
                        fontWeight: 400, color: C.textMuted, lineHeight: 1.85,
                    }}>
                        {sub}
                    </p>
                </div>

                {/* ── CAROUSEL TRACK ── */}
                <div
                    style={{
                        position: 'relative',
                        userSelect: 'none',
                        animation: visible ? 'famFadeUp 0.7s ease 0.1s both' : 'none',
                    }}
                    onMouseDown={e => onDragStart(e.clientX)}
                    onMouseUp={e => onDragEnd(e.clientX)}
                    onMouseLeave={() => { if (dragging) { setDragging(false); startAuto(); } }}
                    onTouchStart={e => onDragStart(e.touches[0].clientX)}
                    onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
                >
                    {/* Three-card perspective layout */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr 1fr',
                        gap: 'clamp(10px, 2vw, 20px)',
                        alignItems: 'center',
                        minHeight: 'clamp(460px, 60vw, 620px)',
                    }}>
                        {/* Prev card */}
                        <div style={{ cursor: 'pointer' }} onClick={prev}>
                            <ActivityCard
                                activity={ACTIVITIES[prevIdx]}
                                isActive={false}
                                isPrev
                            />
                        </div>

                        {/* Active card */}
                        <ActivityCard
                            activity={ACTIVITIES[active]}
                            isActive
                        />

                        {/* Next card */}
                        <div style={{ cursor: 'pointer' }} onClick={next}>
                            <ActivityCard
                                activity={ACTIVITIES[nextIdx]}
                                isActive={false}
                                isNext
                            />
                        </div>
                    </div>

                    {/* ── Left / Right arrow buttons ── */}
                    {[
                        { dir: 'prev', action: prev, side: 'left', char: '←' },
                        { dir: 'next', action: next, side: 'right', char: '→' },
                    ].map(btn => (
                        <button
                            key={btn.dir}
                            onClick={btn.action}
                            style={{
                                position: 'absolute',
                                top: '50%', transform: 'translateY(-50%)',
                                [btn.side]: 'clamp(-12px, -1.5vw, -20px)',
                                width: 'clamp(36px, 5vw, 48px)',
                                height: 'clamp(36px, 5vw, 48px)',
                                borderRadius: '50%',
                                background: C.white,
                                border: `1.5px solid ${C.borderLight}`,
                                color: C.textBody,
                                fontSize: 'clamp(14px, 2vw, 18px)',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                                transition: 'all 0.2s',
                                zIndex: 10,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = C.orange;
                                e.currentTarget.style.color = C.black;
                                e.currentTarget.style.borderColor = C.orange;
                                e.currentTarget.style.boxShadow = `0 6px 20px ${C.orange}40`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = C.white;
                                e.currentTarget.style.color = C.textBody;
                                e.currentTarget.style.borderColor = C.borderLight;
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
                            }}
                        >
                            {btn.char}
                        </button>
                    ))}
                </div>

                {/* ── DOT INDICATORS + COUNT ── */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'clamp(16px, 3vw, 28px)',
                    marginTop: 'clamp(24px, 4vw, 36px)',
                    animation: visible ? 'famFadeUp 0.6s ease 0.2s both' : 'none',
                }}>
                    {/* Counter */}
                    <span style={{
                        fontFamily: FD, fontSize: 'clamp(12px, 1.5vw, 13px)',
                        color: C.graphite, fontStyle: 'italic', minWidth: 60,
                    }}>
                        {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>

                    {/* Dots */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {ACTIVITIES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                style={{
                                    width: i === active ? 'clamp(24px, 4vw, 32px)' : 8,
                                    height: 8,
                                    borderRadius: 4,
                                    background: i === active
                                        ? ACTIVITIES[active].color
                                        : C.silver,
                                    border: 'none', cursor: 'pointer', padding: 0,
                                    transition: 'all 0.35s ease',
                                    outline: 'none',
                                }}
                            />
                        ))}
                    </div>

                    {/* Activity label */}
                    <span style={{
                        fontFamily: FB, fontSize: 'clamp(11px, 1.4vw, 12px)', fontWeight: 600,
                        color: ACTIVITIES[active].color,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        minWidth: 80, textAlign: 'right',
                    }}>
                        {total} {countLabel}
                    </span>
                </div>

                {/* ── ACTIVITY QUICK-NAV STRIP ── */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                    justifyContent: 'center',
                    marginTop: 'clamp(20px, 3.5vw, 28px)',
                    animation: visible ? 'famFadeUp 0.6s ease 0.25s both' : 'none',
                }}>
                    {ACTIVITIES.map((act, i) => (
                        <button
                            key={act.id}
                            onClick={() => goTo(i)}
                            style={{
                                fontFamily: FB,
                                fontSize: 'clamp(11px, 1.4vw, 12px)',
                                fontWeight: i === active ? 700 : 500,
                                background: i === active ? `${act.color}14` : C.white,
                                border: `1.5px solid ${i === active ? act.color : C.borderLight}`,
                                color: i === active ? act.color : C.graphite,
                                padding: 'clamp(6px, 1vw, 8px) clamp(12px, 2vw, 18px)',
                                borderRadius: 4,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', gap: 6,
                            }}
                            onMouseEnter={e => {
                                if (i !== active) {
                                    e.currentTarget.style.borderColor = act.color;
                                    e.currentTarget.style.color = act.color;
                                    e.currentTarget.style.background = `${act.color}08`;
                                }
                            }}
                            onMouseLeave={e => {
                                if (i !== active) {
                                    e.currentTarget.style.borderColor = C.borderLight;
                                    e.currentTarget.style.color = C.graphite;
                                    e.currentTarget.style.background = C.white;
                                }
                            }}
                        >
                            <span style={{ fontSize: 14 }}>{act.icon}</span>
                            <span>{act.category}</span>
                        </button>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes famFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* On mobile: collapse to single-card layout */
        @media (max-width: 640px) {
          .fam-carousel-track {
            grid-template-columns: 1fr !important;
          }
          .fam-side-card {
            display: none !important;
          }
        }
      `}</style>
        </section>
    );
}