import { useState, useRef, useEffect } from 'react';
import { C, FD, FB } from '../theme';

function useInView(th = 0.2) {
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
   LogisticsCTA — exported component
───────────────────────────────────────────── */
export default function LogisticsCTA() {
  const [ref, visible] = useInView(0.2);
  const [form, setForm] = useState({
    name: '', phone: '', service: '', origin: '', destination: '', message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.phone) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <section ref={ref} style={{
      background: C.orange,
      padding: '80px 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ghost watermark */}
      <div style={{
        position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)',
        fontFamily: FD, fontSize: 200, fontWeight: 900,
        color: 'rgba(180,70,0,0.11)', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        CARGO
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left — headline + contact */}
          <div style={{ animation: visible ? 'lgFadeUp 0.7s ease both' : 'none' }}>
            <h2 style={{
              fontFamily: FD, fontSize: 50, fontWeight: 900,
              color: C.black, lineHeight: 1.0, marginBottom: 16,
            }}>
              Ready to ship<br />your cargo?
            </h2>
            <p style={{
              fontFamily: FB, fontSize: 16, color: 'rgba(18,18,20,0.62)',
              lineHeight: 1.78, maxWidth: 440, marginBottom: 28,
            }}>
              Whether you need to move heavy machinery, import goods through Douala port,
              or organise last-mile delivery — our logistics team will provide a fast,
              competitive and transparent quote.
            </p>

            {/* Contact buttons */}
            <div style={{ display: 'flex', gap: 14 }}>
              {[
                { label: '📞 Call us', href: 'tel:+237691455677' },
                { label: '💬 WhatsApp', href: 'https://wa.me/237671893467' },
              ].map(btn => (
                <a key={btn.label} href={btn.href}
                  style={{
                    fontFamily: FB, fontSize: 13, fontWeight: 700,
                    background: C.black, color: C.white,
                    padding: '12px 22px', borderRadius: 3,
                    textDecoration: 'none', letterSpacing: '0.04em',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.charcoal}
                  onMouseLeave={e => e.currentTarget.style.background = C.black}
                >
                  {btn.label}
                </a>
              ))}
            </div>

            {/* Info strip */}
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '📍', text: 'Yaoundé-Ekoumdoum, next to Hôtel Iris — Yaoundé, Cameroon' },
                { icon: '✉️', text: 'famatesscompanysa@gmail.com' },
                { icon: '⚡', text: 'Quote response guaranteed within 24 hours' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  fontFamily: FB, fontSize: 13, color: 'rgba(18,18,20,0.55)',
                }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — freight quote form */}
          <div style={{ animation: visible ? 'lgFadeUp 0.7s ease 0.12s both' : 'none' }}>
            <div style={{
              background: C.black, borderRadius: 6,
              padding: '30px 28px',
              border: '1px solid rgba(255,140,30,0.2)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}>
              <div style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 20 }}>
                Request a freight quote
              </div>

              {/* Service type selector */}
              <select
                value={form.service}
                onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                style={{
                  width: '100%', background: C.charcoal,
                  border: '1px solid rgba(80,80,88,0.5)',
                  borderRadius: 3, color: form.service ? C.white : C.graphite,
                  fontFamily: FB, fontSize: 13, padding: '11px 14px',
                  marginBottom: 12, outline: 'none', cursor: 'pointer',
                }}
                onFocus={e => e.target.style.borderColor = C.orange}
                onBlur={e => e.target.style.borderColor = 'rgba(80,80,88,0.5)'}
              >
                <option value="" disabled>Select service type</option>
                <option value="import">🚢 Import / Export</option>
                <option value="heavy">🚛 Heavy Haulage</option>
                <option value="road">🚐 Road Transport</option>
                <option value="warehouse">🏭 Warehousing</option>
                <option value="other">📦 Other</option>
              </select>

              {/* Origin + Destination */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 0 }}>
                {[
                  { key: 'origin',      placeholder: 'Origin (city / port)',      type: 'text' },
                  { key: 'destination', placeholder: 'Destination (city / site)', type: 'text' },
                ].map(field => (
                  <input key={field.key} type={field.type} placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    style={{
                      width: '100%', background: C.charcoal,
                      border: '1px solid rgba(80,80,88,0.5)',
                      borderRadius: 3, color: C.white,
                      fontFamily: FB, fontSize: 13, padding: '11px 14px',
                      marginBottom: 12, outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = C.orange}
                    onBlur={e => e.target.style.borderColor = 'rgba(80,80,88,0.5)'}
                  />
                ))}
              </div>

              {/* Name + Phone */}
              {[
                { key: 'name',  placeholder: 'Your full name',        type: 'text' },
                { key: 'phone', placeholder: 'Your phone number',     type: 'tel' },
              ].map(field => (
                <input key={field.key} type={field.type} placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                  style={{
                    width: '100%', background: C.charcoal,
                    border: '1px solid rgba(80,80,88,0.5)',
                    borderRadius: 3, color: C.white,
                    fontFamily: FB, fontSize: 13, padding: '11px 14px',
                    marginBottom: 12, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = C.orange}
                  onBlur={e => e.target.style.borderColor = 'rgba(80,80,88,0.5)'}
                />
              ))}

              {/* Message */}
              <textarea
                placeholder="Cargo details (type, weight, dimensions, special requirements...)"
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{
                  width: '100%', background: C.charcoal,
                  border: '1px solid rgba(80,80,88,0.5)',
                  borderRadius: 3, color: C.white,
                  fontFamily: FB, fontSize: 13, padding: '11px 14px',
                  marginBottom: 12, resize: 'vertical', minHeight: 72, outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = C.orange}
                onBlur={e => e.target.style.borderColor = 'rgba(80,80,88,0.5)'}
              />

              <button onClick={handleSubmit}
                style={{
                  width: '100%', background: C.orange, border: 'none',
                  color: C.black, fontFamily: FB, fontSize: 13, fontWeight: 700,
                  padding: '13px 0', borderRadius: 3, cursor: 'pointer',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.orangeDeep}
                onMouseLeave={e => e.currentTarget.style.background = C.orange}
              >
                {sent ? '✓ Request sent!' : 'Send freight request →'}
              </button>

              <p style={{ fontFamily: FB, fontSize: 11, color: C.graphite, textAlign: 'center', marginTop: 10 }}>
                ⚡ Free quote — Response within 24 hours
              </p>
            </div>
          </div>
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
