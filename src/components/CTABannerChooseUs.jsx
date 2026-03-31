import { useState } from "react";
import { C, FD, FB } from '../theme';
import useInView from '../utils/useInView';
import { useLanguage } from '../i18n';

function CTABannerChooseUs() {
  const [ref, visible] = useInView(0.2);
  const { t } = useLanguage();

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.phone) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
  };

  const fields = t("parts.components.ctaChooseUs.form.fields", { returnObjects: true });

  return (
    <section ref={ref}>

      <div>
        <h2>
          {t("parts.components.ctaChooseUs.title")}
        </h2>

        <p>{t("parts.components.ctaChooseUs.description")}</p>

        <div>
          {t("parts.components.ctaChooseUs.buttons", { returnObjects: true }).map((b, i) => (
            <a key={i} href={b.href}>{b.label}</a>
          ))}
        </div>
      </div>

      <div>
        <div>
          <div>{t("parts.components.ctaChooseUs.form.title")}</div>

          {fields.map((f, i) => (
            <input
              key={i}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
            />
          ))}

          <button onClick={handleSubmit}>
            {sent
              ? t("parts.components.ctaChooseUs.form.sent")
              : t("parts.components.ctaChooseUs.form.button")}
          </button>
        </div>
      </div>

    </section>
  );
}

export default CTABannerChooseUs;