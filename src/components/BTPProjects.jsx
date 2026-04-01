import { useState } from 'react';
import { C, FD, FB } from '../theme';
import useInView from '../utils/useInView';
import SLabel from './SLabel';
import { useLanguage } from '../i18n';

function ProjectCard({ project, index, visible }) {
  const [hov, setHov] = useState(false);
  const isLarge = project.size === 'large';

  // Safe color fallback
  const categoryColor = project.categoryColor || C.orange;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={isLarge ? 'project-card-large' : 'project-card-standard'}
      style={{
        background: C.cardBg,
        border: `1px solid ${hov ? categoryColor : C.borderLight}`,
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: hov ? `0 20px 48px rgba(0,0,0,0.10)` : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.2,0.64,1)',
        animation: visible ? `btpFadeUp 0.6s ease ${index * 0.08}s both` : 'none',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{
        height: isLarge ? 'clamp(240px, 35vw, 320px)' : 'clamp(200px, 25vw, 220px)',
        background: C.cardImgBg,
        position: 'relative', overflow: 'hidden',
      }}>
        <img
          src={project.image || '/placeholder.jpg'}
          alt={project.title || 'Project'}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            display: 'block',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
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
          <span style={{ fontSize: 44, opacity: 0.22 }}>🏗️</span>
          <span style={{ opacity: 0.4 }}>Image coming soon</span>
        </div>
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
          pointerEvents: 'none',
        }} />
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: categoryColor, color: '#fff',
          fontFamily: FB, fontSize: 10, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 3,
        }}>
          {project.category || 'Project'}
        </div>
        {/* Year */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(18,18,20,0.75)', backdropFilter: 'blur(4px)',
          color: C.silver, fontFamily: FB, fontSize: 11, fontWeight: 500,
          padding: '3px 10px', borderRadius: 3,
          border: '1px solid rgba(80,80,88,0.4)',
        }}>
          {project.year || ''}
        </div>
        {/* Location on image */}
        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          display: 'flex', alignItems: 'center', gap: 5,
          color: 'rgba(255,255,255,0.85)', fontFamily: FB, fontSize: 12,
        }}>
          <span>📍</span>
          <span>{project.location || ''}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(18px, 3vw, 22px)', borderTop: `1px solid ${C.borderLight}` }}>
        <h3 style={{
          fontFamily: FD, fontSize: 'clamp(17px, 2vw, 18px)', fontWeight: 700,
          color: C.textBody, lineHeight: 1.25, marginBottom: 8,
        }}>
          {project.title || 'Project Title'}
        </h3>
        <p style={{
          fontFamily: FB, fontSize: 'clamp(12px, 1.5vw, 13px)', fontWeight: 400,
          color: C.textMuted, lineHeight: 1.7, marginBottom: 14,
        }}>
          {project.desc || ''}
        </p>

      </div>
      {/* Bottom stripe */}
      <div style={{
        height: 3,
        background: hov
          ? `linear-gradient(to right, ${categoryColor}, ${C.orange})`
          : C.borderLight,
        transition: 'background 0.3s',
      }} />
    </div>
  );
}

export default function BTPProjects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, visible] = useInView(0.08);

  // Safe data access
  const data = t('parts.components.btpProjects') || {};
  const header = data.header || {};
  const filters = Array.isArray(data.filters) ? data.filters : ['All'];
  const projects = Array.isArray(data.projects) ? data.projects : [];

  // Safe header splitting
  const titleParts = header.title && header.emphasis
    ? header.title.split(header.emphasis)
    : [header.title || ''];
  const titleBeforeEmphasis = titleParts[0] || '';
  const safeEmphasis = header.emphasis || '';

  // Filter projects
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section style={{ background: C.white, padding: 'clamp(64px, 10vw, 96px) 0', borderTop: `1px solid ${C.borderLight}` }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px)'
      }}>

        {/* Header */}
        <div ref={ref} className="projects-header-wrapper" style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 'clamp(32px, 6vw, 48px)',
          animation: visible ? 'btpFadeUp 0.6s ease both' : 'none',
        }}>
          <div>
            <SLabel>{header.label || 'Recent Projects'}</SLabel>
            <h2 style={{
              fontFamily: FD,
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 700,
              color: C.textBody,
              lineHeight: 1.08
            }}>
              {titleBeforeEmphasis}<br />
              <em style={{ color: C.orange, fontStyle: 'italic' }}>{safeEmphasis}</em>
            </h2>
          </div>
          {/* Filter pills */}
          <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginTop: 20
          }}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  fontFamily: FB, fontSize: 'clamp(11px, 1.2vw, 12px)',
                  background: activeFilter === filter ? C.orange : C.white,
                  border: `1.5px solid ${activeFilter === filter ? C.orange : C.borderLight}`,
                  color: activeFilter === filter ? C.white : C.graphite,
                  padding: 'clamp(6px, 1vw, 8px) clamp(14px, 1.5vw, 18px)',
                  borderRadius: 4,
                  cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.04em',
                  fontWeight: activeFilter === filter ? 700 : 500,
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20
        }}>
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* Count */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <span style={{ fontFamily: FB, fontSize: 13, color: C.textMuted }}>
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} shown
          </span>
        </div>
      </div>

      <style>{`
        @keyframes btpFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 900px) {
          .project-card-large {
            grid-column: span 2 !important;
          }
        }

        @media (max-width: 820px) {
          .projects-header-wrapper {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}