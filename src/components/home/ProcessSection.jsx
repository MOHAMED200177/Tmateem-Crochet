import { useScrollReveal } from '../../hooks/useScrollReveal';
import './ProcessSection.css';

const STEPS = [
  { num: '01', title: 'Choose', text: 'You pick the piece, size, and color — every order starts with your exact request.' },
  { num: '02', title: 'Yarn Up', text: 'We select quality yarn and thread, like Himalaya Everyday or Egyptian macramé, to match your piece.' },
  { num: '03', title: 'Crochet', text: 'Hand-crocheted loop by loop, with no machines involved — just hook, thread, and time.' },
  { num: '04', title: 'Finish', text: 'Final quality check and careful packaging — ready to be sent your way.' },
];

export default function ProcessSection() {
  const ref = useScrollReveal();

  return (
    <section className="process" ref={ref}>
      <div className="container">
        <div className="process__head reveal">
          <p className="t-label section-head__eyebrow">Our Craft</p>
          <h2 className="section-head__title t-display">From Fiber to Finished Piece</h2>
        </div>

        <div className="process__steps">
          {STEPS.map((s, i) => (
            <div key={s.num} className={`process__step reveal reveal-delay-${i + 1}`}>
              <span className="process__num t-display">{s.num}</span>
              <h3 className="process__title">{s.title}</h3>
              <p className="process__text">{s.text}</p>
              {i < STEPS.length - 1 && <span className="process__connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
