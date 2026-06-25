import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
