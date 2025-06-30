import React from 'react';
import styles from '../styles/Home.module.css';
import fondoPrincipal from '../assets/img/fondo-principal.jpg';

export default function Home() {
  return (
    <section id="inicio" className={styles.principal}>
      <div className={styles.principalOverlay}>
        <img
          src={fondoPrincipal}
          alt="Fondo principal"
          className={styles.principalImage}
        />
        <div className={styles.principalText}>
          <h1>
            Soluciones integrales en automatización y control industrial
          </h1>
          <p>
            Ingeniería, instalación, programación y mantenimiento al servicio
            de la industria.
          </p>
        </div>
      </div>
    </section>
  );
}
