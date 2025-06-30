import React from "react";
import Cards from "./Cards";
import services1 from '../assets/img/services1.png';
import services2 from '../assets/img/services2.png';
import services3 from '../assets/img/services3.png';


export default function Services() {
  return (
    <section id="services" className="container my-5">
      <h2 className="text-center mb-4">Servicios</h2>
      <div className="d-flex flex-wrap justify-content-center">
        <Cards
          title="Programación de PLC"
          description="Reprogramación y optimización de sistemas industriales."
          image={services1}
        />
        <Cards
          title="Instalación de Tableros Eléctricos"
          description="Montaje profesional y puesta en marcha segura."
          image={services2}
        />
        <Cards
          title="Montaje y Cableado Industrial"
          description="Tendidos eléctricos industriales bajo normas."
           image={services3}
        />
        <Cards
          title="Mantenimiento Preventivo y Correctivo"
          description="Garantía de funcionamiento continuo en planta."
           image={services1}
        />
        <Cards
          title="Automatización de Procesos"
          description="Diseño e integración de soluciones automáticas."
          image={services2}
        />
        <Cards
          title="Actualización de Sistemas SCADA y HMI"
          description="Modernización y optimización de interfaces gráficas."
          image={services3}
        />
      </div>
    </section>
  );
}
