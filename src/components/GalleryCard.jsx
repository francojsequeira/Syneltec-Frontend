import React from 'react';
import styles from '../styles/Gallery.module.css';

export default function GalleryCard({ item }) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          {item.type === 'image' ? (
            <img src={item.src} alt={item.alt} />
          ) : (
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className={styles.flipCardBack}>
          <h5>{item.title}</h5>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
}
