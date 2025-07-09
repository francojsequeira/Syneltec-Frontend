import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import SobreNosotros from './components/SobreNosotros';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
