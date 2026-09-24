import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
        <img src="/images/LogMon.svg" alt="" className="logo-icon" />
          Ковчег радости
        </Link>

       
        <button 
          className={`mobile-burger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`main-nav ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="link" onClick={() => setIsMenuOpen(false)}>Главная</Link>
          <Link to="/about" className="link" onClick={() => setIsMenuOpen(false)}>О фонде</Link>
          <Link to="/contacts" className="link" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
          <Link to="/catalog" className="link" onClick={() => setIsMenuOpen(false)}>Каталог</Link>
          <Link to="/gallery" className="link" onClick={() => setIsMenuOpen(false)}>Галерея</Link>
        </nav>

        <Link to="/cart" className="cart-btn" onClick={() => setIsMenuOpen(false)}>
          {`Корзина${totalItems > 0 ? ` ${totalItems}` : ''}`}
        </Link>
      </div>

     
      {isMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}>
          <nav className="mobile-menu">
            <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Главная</Link>
            <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>О фонде</Link>
            <Link to="/contacts" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
            <Link to="/catalog" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Каталог</Link>
            <Link to="/gallery" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Галерея</Link>
            <Link to="/cart" className="mobile-link cart-link" onClick={() => setIsMenuOpen(false)}>
              {`Корзина${totalItems > 0 ? ` ${totalItems}` : ''}`}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

