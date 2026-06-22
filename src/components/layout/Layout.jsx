import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
