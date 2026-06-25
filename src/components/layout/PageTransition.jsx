import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lightweight fade+rise transition between route changes.
 * No animation library needed — reuses the .page-enter / .page-enter-active
 * classes already defined in styles/globals.css.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [animationClass, setAnimationClass] = useState('page-enter-active');
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setAnimationClass('page-enter');
      setDisplayChildren(children);
      const raf = requestAnimationFrame(() => setAnimationClass('page-enter-active'));
      return () => cancelAnimationFrame(raf);
    }
    setDisplayChildren(children);
  }, [pathname, children]);

  return <div className={animationClass}>{displayChildren}</div>;
}
