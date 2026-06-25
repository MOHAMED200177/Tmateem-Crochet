import { useScrollReveal } from '../hooks/useScrollReveal';
import PhilosophySection from '../components/home/PhilosophySection';
import WhatsAppBanner from '../components/home/WhatsAppBanner';
import { ABOUT_HERO, ABOUT_VALUES } from '../data/about';
import './About.css';

export default function About() {
  const ref = useScrollReveal();

  return (
    <>
      <section className="about-hero" ref={ref}>
        <div className="container about-hero__grid">
          <div className="reveal">
            <p className="t-label" style={{ color: 'var(--clr-terracotta)' }}>{ABOUT_HERO.eyebrow}</p>
            <h1 className="about-hero__title t-display">
              {ABOUT_HERO.titleLine1}<br/><span className="t-serif">{ABOUT_HERO.titleLine2}</span>
            </h1>
            {ABOUT_HERO.paragraphs.map((p, i) => (
              <p key={i} className="about-hero__text">{p}</p>
            ))}
          </div>
          <div className="about-hero__img reveal reveal-delay-2">
            <img src={ABOUT_HERO.image} alt={ABOUT_HERO.imageAlt} />
          </div>
        </div>
      </section>

      <section className="about-values" ref={ref}>
        <div className="container">
          <div className="about-values__grid">
            {ABOUT_VALUES.map((v, i) => (
              <div key={v.label} className={`about-value reveal reveal-delay-${i + 1}`}>
                <span className="about-value__num t-display">{v.num}</span>
                <h3>{v.label}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhilosophySection />

      <WhatsAppBanner />
    </>
  );
}
