import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CameraView from './components/CameraView';
import ProductList from './components/ProductList';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);

  const addProduct = (code) => {
    if (products.some(product => product.code === code)) {
      alert('This product already exists.');
    } else {
      const newProduct = { id: Date.now(), code, name: `Product ${products.length + 1}` };
      setProducts([...products, newProduct]);
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<CameraView addProduct={addProduct} />} />
          <Route path="/products" element={<ProductList products={products} onDelete={deleteProduct} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
