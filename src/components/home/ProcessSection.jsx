import { useScrollReveal } from '../../hooks/useScrollReveal';
import { PROCESS_CONTENT } from '../../data/homeContent';
import './ProcessSection.css';

export default function ProcessSection() {
  const ref = useScrollReveal();
  const { steps } = PROCESS_CONTENT;

  return (
    <section className="process" ref={ref}>
      <div className="container">
        <div className="process__head reveal">
          <p className="t-label section-head__eyebrow">{PROCESS_CONTENT.eyebrow}</p>
          <h2 className="section-head__title t-display">{PROCESS_CONTENT.title}</h2>
        </div>

        <div className="process__steps">
          {steps.map((s, i) => (
            <div key={s.num} className={`process__step reveal reveal-delay-${i + 1}`}>
              <span className="process__num t-display">{s.num}</span>
              <h3 className="process__title">{s.title}</h3>
              <p className="process__text">{s.text}</p>
              {i < steps.length - 1 && <span className="process__connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
