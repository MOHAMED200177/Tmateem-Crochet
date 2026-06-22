import { useScrollReveal } from '../../hooks/useScrollReveal';
import './PhilosophySection.css';

const PILLARS = [
  {
    mark: '✦',
    title: 'Handmade, Always',
    text: 'Every loop and stitch is made by hand, one piece at a time. No machines, no shortcuts — just patient, careful craft.',
  },
  {
    mark: '✦',
    title: 'Made For You',
    text: 'Most of our pieces are made to order — your size, your color, your request. What you imagine, we crochet.',
  },
  {
    mark: '✦',
    title: 'Built to Last',
    text: 'We use quality yarns like Himalaya Everyday and sturdy Egyptian macramé thread, so every piece holds up to daily life.',
  },
];

export default function PhilosophySection() {
  const ref = useScrollReveal();

  return (
    <section className="philosophy" ref={ref}>
      <div className="container">
        <div className="philosophy__intro reveal">
          <p className="t-label" style={{ color: 'var(--clr-clay)' }}>The Tmateem Way</p>
          <h2 className="philosophy__title t-display">
            Crafted by hand, <span className="t-serif philosophy__italic">made for you.</span>
          </h2>
        </div>

        <div className="philosophy__grid">
          {PILLARS.map((p, i) => (
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
