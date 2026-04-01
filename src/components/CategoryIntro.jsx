import { C, FD, FB } from '../theme';
import useInView from '../utils/useInView';
import { useLanguage } from '../i18n';

function CategoryIntro() {
  const [ref, _visible] = useInView(0.15);
  const { t } = useLanguage();

  // Safely get categories as an array
  const categories = t("parts.components.categoryIntro.categories", { returnObjects: true });
  const categoriesArray = Array.isArray(categories) ? categories : [];

  return (
    <section ref={ref} style={{ background: C.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

          {categoriesArray.map((cat, i) => (
            <div key={i} style={{ padding: 24, border: `1px solid ${C.silver}`, borderRadius: 4, transition: "all 0.3s", background: C.offwhite }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{cat.icon}</div>
              <h3 style={{ fontFamily: FD, fontSize: 22, fontWeight: 700, color: C.black, marginBottom: 8 }}>
                {cat.title}
              </h3>
              <span style={{ fontFamily: FB, fontSize: 14, color: C.graphite, marginBottom: 12, display: "block" }}>
                {cat.count}
              </span>
              <p style={{ fontFamily: FB, fontSize: 14, color: C.graphite, lineHeight: 1.6 }}>
                {cat.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default CategoryIntro;