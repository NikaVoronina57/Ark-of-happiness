import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";




function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content-layer">
        <h2 className="hero-title">Ковчег радости — место, где важен каждый труд</h2>
        
        <p className="hero-subtitle">
          Покупайте с добром: каждая покупка помогает людям с тяжёлой ментальной инвалидностью и поддерживает их творчество.
        </p>

        <Link to="/catalog" className="catalog-btn">
          Перейти в каталог
        </Link>
        

        <p className="hero-description">
          В мире, где порой так не хватает опоры, „Ковчег радости“ становится тем самым местом, где можно почувствовать: ты не один. Мы помогаем тем, кто особенно нуждается в заботе, и даём возможность каждому стать частью доброго дела. Присоединяйтесь — вместе мы создаём пространство тепла, поддержки и реальных перемен.
        </p>
          <a href="/about#help" className="btn2 help-project-btn">
  <span className="btn-text">Помочь проекту</span>
  <svg className="bird" viewBox="0 0 85 67" xmlns="http://www.w3.org/2000/svg">
    <path d="M59.0574 66.1366L17.5083 64.1728L0.522217 26.7218L5.4061 2.03143L22.3261 56.4548L22.4413 56.8256L22.8287 56.8063L82.0033 53.7609L59.0574 66.1366Z" />
  </svg>
</a> 
    <div className="hero-info-box">
        <p>Узнать подробней о деятельности центра</p>
        <p>на <a href="https://kradosti.ru" target="_blank" rel="noopener noreferrer">kradosti.ru</a></p>
      </div>
      </div>
      
      </section>
    
  );
}

export default HeroSection;


