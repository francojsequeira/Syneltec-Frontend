// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import SobreNosotros from './components/SobreNosotros';
import Login from './components/Auth/Login'; 
// Importo AuthProvider para envolver la app
import { AuthProvider } from './context/AuthProvider'; 

// Importo las nuevas vistas de gestión
import UserList from './components/Admin/UserList';
import ProductList from './components/Admin/ProductList';

function App() {
return (
    // Envuelvo la aplicación para que todos tengan acceso al estado de autenticación.
    <AuthProvider> 
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sobrenosotros" element={<SobreNosotros />} />
          <Route path="/login" element={<Login />} /> 
          
          {/* Rutas de Gestión del E-commerce */}
          <Route path="/gestion/productos" element={<ProductList />} />
          <Route path="/gestion/usuarios" element={<UserList />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </AuthProvider>
);
}

export default App;