import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import SobreNosotros from './components/SobreNosotros';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Services />
      <Gallery />
      <Contact />
      <SobreNosotros />
      <Footer />
    </>
  );
}

export default App;
