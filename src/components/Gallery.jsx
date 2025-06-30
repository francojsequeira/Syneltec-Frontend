import React from 'react';
import styles from '../styles/Gallery.module.css';
import GalleryCard from "./GalleryCard";

// Importar imagenes y videos de la galería:
import galeria1 from '../assets/img/galeria1.jpeg';
import galeria2 from '../assets/img/galeria2.jpeg';
import galeria3Video from '../assets/img/galeria3.mp4';
import galeria4 from '../assets/img/galeria4.jpeg';
import galeria5 from '../assets/img/galeria5.jpeg';
import galeria6 from '../assets/img/galeria6.jpeg';
import galeria7 from '../assets/img/galeria7.jpeg';
import galeria8 from '../assets/img/galeria8.jpeg';

// Datos de la galería
const galleryItems = [
  {
    id: 1,
    type: 'image',
    src: galeria1,
    alt: 'Proyecto 1',
    title: 'Tablero de Control',
    description: 'Diseño y cableado de tablero para automatización de línea de producción.'
  },
  {
    id: 2,
    type: 'image',
    src: galeria2,
    alt: 'Proyecto 2',
    title: 'Programación PLC',
    description: 'Implementación de lógica de control en planta química.'
  },
  {
    id: 3,
    type: 'video',
    src: galeria3Video,
    alt: 'Proyecto 3',
    title: 'Instalación eléctrica',
    description: 'Montaje de bandejas, cañerías y cableado en planta industrial.'
  },
  {
    id: 4,
    type: 'image',
    src: galeria4,
    alt: 'Proyecto 4',
    title: 'Retrofit de máquina',
    description: 'Modernización de sistema de control con HMI y sensores nuevos.'
  },
  {
    id: 5,
    type: 'image',
    src: galeria5,
    alt: 'Proyecto 5',
    title: 'Supervisión SCADA',
    description: 'Desarrollo de interfaz de monitoreo y alarmas para operador.'
  },
  {
    id: 6,
    type: 'image',
    src: galeria6,
    alt: 'Proyecto 6',
    title: 'Integración de sistemas',
    description: 'Comunicación entre PLCs y variadores en red industrial.'
  },
  {
    id: 7,
    type: 'image',
    src: galeria7,
    alt: 'Proyecto 7',
    title: 'Supervisión SCADA',
    description: 'Desarrollo de interfaz de monitoreo y alarmas para operador.'
  },
  {
    id: 8,
    type: 'image',
    src: galeria8,
    alt: 'Proyecto 8',
    title: 'Supervisión SCADA',
    description: 'Desarrollo de interfaz de monitoreo y alarmas para operador.'
  }
];

export default function Gallery() {
  return (
    <section id="galeria" className={styles.intro}>
      <div className={styles.container}>
        <h2>Galería</h2>
        <p>Explorá nuestra experiencia en proyectos realizados.</p>

        <div className={styles.galleryColumns}>
          {galleryItems.map(item => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
