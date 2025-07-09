import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Contact() {
  // Estados
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular envío (acá se podría integrar emailjs, backend, etc.)
    alert(`¡Formulario enviado!\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`);

    // Limpiar campos
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <section id="contact" className="container my-5">
      <h2 className="text-center mb-4">Contacto</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea
                className="form-control"
                id="mensaje"
                rows="4"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
}
