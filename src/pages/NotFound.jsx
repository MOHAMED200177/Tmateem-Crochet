import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="container notfound__inner">
        <span className="notfound__mark">🧶</span>
        <h1 className="notfound__title t-display">404</h1>
        <p className="notfound__text t-serif">This piece seems to have unraveled.</p>
        <p className="notfound__subtext">The page you're looking for doesn't exist, or may have been moved.</p>
        <Link to="/" className="notfound__btn">Return Home</Link>
      </div>
    </div>
  );
}
