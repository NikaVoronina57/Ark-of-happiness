import { useState } from "react";
import "./CategoryFilter.css";

const categories = {
  textile: "Текстильная мастерская",
 // tableware: "Посуда",
  ceramics: "Керамическая мастерская",
  mosaic: "Мастерская мозаики",
  souvenirs: "Мастерская дизайна",
  all: "Все товары",
};

function CategoryFilter({ activeCategory, onCategoryChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (categoryKey) => {
    onCategoryChange(categoryKey);
    setIsOpen(false);
  };

  const getCategoryIcon = (key) => {
    const icons = {
      all: "",
      textile: "",
      tableware: "",
      ceramics: "",
      mosaic: "",
      souvenirs: ""
    };
    return icons[key] || "";
  };

  return (
    <div className="category-filter">
      {/* Мобильная версия 
      <div className="category-dropdown-mobile">
        <button 
          className="dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="dropdown-label">
            {getCategoryIcon(activeCategory)} {categories[activeCategory] || "Все товары"}
          </span>
          <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
            ▼
          </span>
        </button>
        
        {isOpen && (
          <div className="dropdown-menu">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                className={`dropdown-item ${activeCategory === key ? "active" : ""}`}
                onClick={() => handleCategoryClick(key)}
              >
              
                {label}
              </button>
            ))}
          </div>
        )}
      </div>*/}

      {/* Десктопная версия */}
     
      <div className="category-tabs">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            className={`category-tab ${activeCategory === key ? "active" : ""}`}
            onClick={() => onCategoryChange(key)}
          >
            <span className="tab-icon">{getCategoryIcon(key)}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;