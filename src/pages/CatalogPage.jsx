import { useState } from "react";
import { Link } from "react-router-dom";
import "./CatalogPage.css";
import { useCart } from "../context/CartContext";
import CategoryFilter from "../components/CategoryFilter";
// Импортируем твои товары
import { products } from "../data/products";

function CatalogPage({ onOpenModal }) {
  const { addToCart, cart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");

  const isInCart = (productId) => cart.some((item) => item.id === productId);

  // Фильтруем товары по категории
  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((product) => product.category === activeCategory);

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <h1>Каталог товаров</h1>
        <p>Сделано с любовью и вниманием к деталям</p>
      </header>

      <div className="catalog-categories">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="catalog-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="catalog-card"
            onClick={() => onOpenModal(product)}
          >
            <div className="card-image-wrapper">
              <img
                // Используем product.image — это из твоего файла products.js
                src={product.image}
                alt={product.name}
                className="card-image"
                onError={(e) => {
                  e.target.src = "/images/placeholder.jpg";
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className="card-info">
              {/* Используем product.name — так в твоём файле */}
              <h3>{product.name}</h3>
              <p className="card-price">{product.price} ₽</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                disabled={isInCart(product.id)}
                className={`add-to-cart-btn ${isInCart(product.id) ? "added" : ""}`}
              >
                {isInCart(product.id) ? "✅ В корзине" : "🛒 В корзину"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default CatalogPage;




