import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, ...options }
    );

    // Observe the element and all children with .reveal class
    const revealEls = el.querySelectorAll('.reveal');
    if (el.classList.contains('reveal')) {
      observer.observe(el);
    }
    revealEls.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useRevealOnMount(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add('visible'), delay + 50);
    return () => clearTimeout(timer);
  }, [delay]);

  return ref;
}
