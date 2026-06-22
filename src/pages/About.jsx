import { useScrollReveal } from '../hooks/useScrollReveal';
import PhilosophySection from '../components/home/PhilosophySection';
import WhatsAppBanner from '../components/home/WhatsAppBanner';
import './About.css';

export default function About() {
  const ref = useScrollReveal();

  return (
    <>
      <section className="about-hero" ref={ref}>
        <div className="container about-hero__grid">
          <div className="reveal">
            <p className="t-label" style={{ color: 'var(--clr-terracotta)' }}>Our Story</p>
            <h1 className="about-hero__title t-display">
              Made stitch<br/><span className="t-serif">by stitch.</span>
            </h1>
            <p className="about-hero__text">
              Tmateem Crochet started with a single hook, a ball of yarn, and a love for making
              things by hand. What began as a small hobby grew into a craft practiced with care,
              one loop at a time.
            </p>
            <p className="about-hero__text">
              Today, every cardigan, shawl, and pencil case we make is still crocheted entirely
              by hand — many made to order in the exact size and color you ask for. Nothing is
              mass-produced; every piece is made specifically for the person who ordered it.
            </p>
          </div>
          <div className="about-hero__img reveal reveal-delay-2">
            <img src="/images/products/placeholder.svg" alt="Handmade crochet piece" />
          </div>
        </div>
      </section>

      <section className="about-values" ref={ref}>
        <div className="container">
          <div className="about-values__grid">
            {[
              { num: '100%', label: 'Handmade', text: 'Every single piece is crocheted by hand, with no machine shortcuts.' },
              { num: '∞', label: 'Custom Options', text: 'Most pieces can be made in any size or color combination you request.' },
              { num: 'Top', label: 'Quality Yarns', text: 'We work with Himalaya Everyday yarn and durable Egyptian macramé thread.' },
            ].map((v, i) => (
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
