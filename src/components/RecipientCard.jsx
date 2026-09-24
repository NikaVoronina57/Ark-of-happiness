import React from 'react';
import './RecipientCard.css';

function RecipientCard({ name, description, image,year }) {
  return (
    <article className="recipient-card">
      <div className="card-image-wrapper">
        <img
          src={image}
          alt={`Фото ${name}`}
          className="card-image"
          loading="lazy"
        />
      </div>
      <h3 className="card-title">{name}</h3>
      <p className='card-year'>{year}</p>
      <p className="card-description">{description}</p>
      
    </article>
  );
}

export default RecipientCard;
