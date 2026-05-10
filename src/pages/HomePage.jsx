import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Portfolio from '../components/Portfolio.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="space-y-12 md:space-y-16">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
