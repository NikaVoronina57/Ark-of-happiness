import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";
<section className="hero-section"></section>
function CartPage() {
  
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    
    return (
      <section className="hero-section">
      <div className="cart-empty">
        <h1>Ваша корзина пуста </h1>
        <p>Добавьте товары из каталога,<br/> чтобы оформить заказ.</p>
        <Link to="/catalog" className="btn">
          Перейти в каталог
        </Link>
      </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
    <div className="cart-page">
      <h1>Корзина</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image-wrapper">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image" 
                  loading="lazy"
                />
              </div>
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Цена: {item.price} ₽</p>
              <p>Количество: {item.quantity} шт.</p>
            </div>
            <div className="cart-item-actions">
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Удалить
              </button>
              <p className="item-total">
                Итого: {item.price * item.quantity} ₽
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Общая сумма: {totalPrice} ₽</h2>
        <Link to="/order" className="checkout-btn">
          Оформить заказ
        </Link>
        <button onClick={clearCart} className="clear-btn">
          Очистить корзину
        </button>
      </div>
    </div>
    </section>
  );
}

export default CartPage;
