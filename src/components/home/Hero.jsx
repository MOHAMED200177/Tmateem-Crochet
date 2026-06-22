import { Link } from 'react-router-dom';
import { useRevealOnMount } from '../../hooks/useScrollReveal';
import { PRODUCTS } from '../../data/products';
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
          <p className="hero__eyebrow reveal" ref={titleRef}>✦ Handmade, Stitch by Stitch</p>
          <h1 className="hero__title t-display reveal" ref={titleRef}>
            Crochet<br/>
            <span className="hero__title-accent">made by hand,</span><br/>
            made for you.
          </h1>
          <p className="hero__subtitle t-serif reveal" ref={subRef}>
            Custom sizes, custom colors — every piece is crocheted
            one loop at a time, just for you.
          </p>
          <div className="hero__cta-group reveal" ref={ctaRef}>
            <Link to="/shop" className="hero__cta hero__cta--primary">
              Explore the Collection
            </Link>
            <Link to="/about" className="hero__cta hero__cta--ghost">
              Our Story
            </Link>
          </div>

          <div className="hero__stats reveal" ref={ctaRef}>
            <div className="hero__stat">
              <span className="hero__stat-num t-display">100%</span>
              <span className="hero__stat-label t-label">Handmade</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num t-display">∞</span>
              <span className="hero__stat-label t-label">Custom Colors</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num t-display">✦</span>
              <span className="hero__stat-label t-label">Made to Order</span>
            </div>
          </div>
        </div>

        <div className="hero__visual reveal" ref={imgRef}>
          <div className="hero__img-wrap hero__img-wrap--main">
            <img
              src={heroMain}
              alt="Tmateem Crochet handmade piece"
              loading="eager"
            />
          </div>
          <div className="hero__img-wrap hero__img-wrap--float">
            <img
              src={heroFloat}
              alt="Close-up detail of hand-crocheted stitches"
              loading="eager"
            />
          </div>
          <div className="hero__badge-card">
            <span className="hero__badge-card-icon">✦</span>
            <div>
              <strong>Hand-Crocheted</strong>
              <span>Every single loop</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span className="t-label">Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
