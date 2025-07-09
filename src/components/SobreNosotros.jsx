import React from 'react';
import styles from '../styles/SobreNosotros.module.css';
import equipoImg from '../assets/img/fondo-principal.jpg'; // ajusta el path a tu imagen

export default function SobreNosotros() {
  return (
    <section id="sobrenosotros" className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sobre Nosotros</h1>
        <div className={styles.contentGrid}>
          <div className={styles.textBlock}>
            <h2 className={styles.subtitle}>Nuestra Visión</h2>
            <p className={styles.text}>
              Ser referentes en soluciones de automatización y control industrial, 
              llevando innovación y eficiencia a cada cliente, con un compromiso inquebrantable 
              con la calidad y la mejora continua.
            </p>

            <h2 className={styles.subtitle}>Nuestra Misión</h2>
            <p className={styles.text}>
              Diseñar, implementar y mantener sistemas avanzados de automatización que 
              optimicen procesos industriales, respaldados por un servicio post-venta 
              cercano y proactivo, asegurando la tranquilidad y el éxito de nuestros clientes.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img
              src={equipoImg}
              alt="Equipo de Syneltec en acción"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
