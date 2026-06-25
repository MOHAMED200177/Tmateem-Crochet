import { useScrollReveal } from '../../hooks/useScrollReveal';
import { PHILOSOPHY_CONTENT } from '../../data/homeContent';
import './PhilosophySection.css';

export default function PhilosophySection() {
  const ref = useScrollReveal();

  return (
    <section className="philosophy" ref={ref}>
      <div className="container">
        <div className="philosophy__intro reveal">
          <p className="t-label" style={{ color: 'var(--clr-clay)' }}>{PHILOSOPHY_CONTENT.eyebrow}</p>
          <h2 className="philosophy__title t-display">
            {PHILOSOPHY_CONTENT.titleMain} <span className="t-serif philosophy__italic">{PHILOSOPHY_CONTENT.titleAccent}</span>
          </h2>
        </div>

        <div className="philosophy__grid">
          {PHILOSOPHY_CONTENT.pillars.map((p, i) => (
            <div key={p.title} className={`philosophy__card reveal reveal-delay-${i + 1}`}>
              <span className="philosophy__mark">{p.mark}</span>
              <h3 className="philosophy__card-title">{p.title}</h3>
              <p className="philosophy__card-text">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
