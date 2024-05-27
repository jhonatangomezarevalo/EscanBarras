import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onDelete }) => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>Código: {product.code}</span>
            <span>Nombre: {product.name}</span>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
