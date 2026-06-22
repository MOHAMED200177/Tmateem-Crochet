import './PageHeader.css';

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="page-header">
      <div className="container page-header__inner">
        {eyebrow && <p className="t-label page-header__eyebrow">{eyebrow}</p>}
        <h1 className="page-header__title t-display">{title}</h1>
        {subtitle && <p className="page-header__subtitle t-serif">{subtitle}</p>}
      </div>
    </div>
  );
}
