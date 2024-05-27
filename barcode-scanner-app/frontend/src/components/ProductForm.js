import React, { useState } from 'react';
import axios from 'axios';
import "./ProductForm.css";

function ProductForm({ onAdd }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', { code, name });
      onAdd(response.data);
      setCode('');
      setName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
