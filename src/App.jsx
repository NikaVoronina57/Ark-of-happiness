import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import CatalogPage from "./pages/CatalogPage.jsx";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage.jsx";
import "./App.css";
import ProductModal from "./components/ProductModal";
import GalleryPage from "./pages/GalleryPage.jsx";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleClose = () => setSelectedProduct(null);

  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/catalog"
              element={<CatalogPage onOpenModal={setSelectedProduct} />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleClose} />
      )}
    </Router>
  );
}
export default App;
