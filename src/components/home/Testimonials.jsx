import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'Customer Name',
    role: 'Replace with a real review',
    text: 'The cardigan fit perfectly in the color I asked for. You can tell every stitch was made with care.',
    rating: 5,
  },
  {
    name: 'Customer Name',
    role: 'Replace with a real review',
    text: 'Ordered through WhatsApp and it felt so personal — they kept me updated the whole time it was being made.',
    rating: 5,
  },
  {
    name: 'Customer Name',
    role: 'Replace with a real review',
    text: 'My daughter loves her pencil case — it\'s sturdy, adorable, and clearly made to last.',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section className="testimonials" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <p className="t-label section-head__eyebrow">Words From Our Wearers</p>
          <h2 className="section-head__title t-display">Loved, Imperfectly</h2>
          <div className="divider-organic" />
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
              <div className="testimonial-card__stars">
                {Array.from({ length: t.rating }).map((_, j) => <span key={j} className="star star--filled">★</span>)}
              </div>
              <p className="testimonial-card__text t-serif">"{t.text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.name[0]}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
