import React from 'react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className="mb-1">&copy; 2025 SYNELTEC - Todos los derechos reservados</p>
        <div className={styles.footerIcons}>
          <i className={`fas fa-industry ${styles.footerIcon}`}></i>
          <i className={`fas fa-microchip ${styles.footerIcon}`}></i>
          <i className={`fas fa-tools ${styles.footerIcon}`}></i>
        </div>
      </div>
    </footer>
  );
}
