import React from 'react';

export default function Cards({ title, description, image }) {
  return (
    <div className="card" style={{ width: '18rem', margin: '1rem' }}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

