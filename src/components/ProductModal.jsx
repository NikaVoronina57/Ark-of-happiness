import React from 'react';

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="close-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Закрыть"
        >
          &times;
        </button>

        <div className="modal-body">
          <img
            src={product.image}
            alt={product.title}
            className="modal-image"
          />
          <div className="modal-info">
            <h2>{product.name}</h2>
            <p className="modal-description">{product.category}</p>
            <p className="modal-description">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
