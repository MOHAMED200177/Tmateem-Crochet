import { Link } from 'react-router-dom';
import { BRAND } from '../data/site';
import { NOT_FOUND_PAGE } from '../data/pageContent';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="container notfound__inner">
        <span className="notfound__mark">{BRAND.logoMark}</span>
        <h1 className="notfound__title t-display">{NOT_FOUND_PAGE.title}</h1>
        <p className="notfound__text t-serif">{NOT_FOUND_PAGE.text}</p>
        <p className="notfound__subtext">{NOT_FOUND_PAGE.subtext}</p>
        <Link to="/" className="notfound__btn">{NOT_FOUND_PAGE.buttonLabel}</Link>
      </div>
    </div>
  );
}
