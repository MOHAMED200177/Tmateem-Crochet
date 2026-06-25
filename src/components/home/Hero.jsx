import { Link } from 'react-router-dom';
import { useRevealOnMount } from '../../hooks/useScrollReveal';
import { PRODUCTS } from '../../data/products';
import { HERO_CONTENT } from '../../data/homeContent';
import './Hero.css';

export default function Hero() {
  const titleRef = useRevealOnMount(0);
  const subRef = useRevealOnMount(150);
  const ctaRef = useRevealOnMount(300);
  const imgRef = useRevealOnMount(200);

  const featured = PRODUCTS.filter((p) => p.featured);
  const heroMain = featured[0]?.images[0] || '/images/products/placeholder.svg';
  const heroFloat = featured[1]?.images[0] || '/images/products/placeholder.svg';

  return (
    <section className="hero">
      <div className="hero__texture" aria-hidden="true" />

      <div className="hero__decor hero__decor--1" aria-hidden="true">✦</div>
      <div className="hero__decor hero__decor--2" aria-hidden="true">○</div>
      <div className="hero__decor hero__decor--3" aria-hidden="true">🧶</div>

      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow reveal" ref={titleRef}>{HERO_CONTENT.eyebrow}</p>
          <h1 className="hero__title t-display reveal" ref={titleRef}>
            {HERO_CONTENT.titleLine1}<br/>
            <span className="hero__title-accent">{HERO_CONTENT.titleAccent}</span><br/>
            {HERO_CONTENT.titleLine2}
          </h1>
          <p className="hero__subtitle t-serif reveal" ref={subRef}>
            {HERO_CONTENT.subtitle}
          </p>
          <div className="hero__cta-group reveal" ref={ctaRef}>
            <Link to={HERO_CONTENT.ctaPrimary.to} className="hero__cta hero__cta--primary">
              {HERO_CONTENT.ctaPrimary.label}
            </Link>
            <Link to={HERO_CONTENT.ctaSecondary.to} className="hero__cta hero__cta--ghost">
              {HERO_CONTENT.ctaSecondary.label}
            </Link>
          </div>

          <div className="hero__stats reveal" ref={ctaRef}>
            {HERO_CONTENT.stats.map((stat, i) => (
              <div key={stat.label} style={{ display: 'contents' }}>
                <div className="hero__stat">
                  <span className="hero__stat-num t-display">{stat.num}</span>
                  <span className="hero__stat-label t-label">{stat.label}</span>
                </div>
                {i < HERO_CONTENT.stats.length - 1 && <div className="hero__stat-divider" />}
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual reveal" ref={imgRef}>
          <div className="hero__img-wrap hero__img-wrap--main">
            <img
              src={heroMain}
              alt={HERO_CONTENT.imageAlt.main}
              loading="eager"
            />
          </div>
          <div className="hero__img-wrap hero__img-wrap--float">
            <img
              src={heroFloat}
              alt={HERO_CONTENT.imageAlt.float}
              loading="eager"
            />
          </div>
          <div className="hero__badge-card">
            <span className="hero__badge-card-icon">✦</span>
            <div>
              <strong>{HERO_CONTENT.badge.title}</strong>
              <span>{HERO_CONTENT.badge.subtitle}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span className="t-label">{HERO_CONTENT.scrollHint}</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
