import { C, FB } from '../theme';

function SLabel({ children, center = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
      justifyContent: center ? "center" : "flex-start",
    }}>
      <div style={{ width: 24, height: 2, background: C.orange, borderRadius: 2, transformOrigin: "left", animation: "slideW 0.5s ease both", flexShrink: 0 }} />
      <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: C.orange }}>
        {children}
      </span>
      {center && <div style={{ width: 24, height: 2, background: C.orange, borderRadius: 2, flexShrink: 0 }} />}
    </div>
  );
}

export default SLabel;