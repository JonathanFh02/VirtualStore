import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/productService';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState('');

  const handleSearch = async () => {
    const data = await getProductById(productId);
    setProduct(data);
  };

  return (
    <div>
      <h2>Buscar producto por ID</h2>
      <input
        type="number"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Ingresa el ID del producto"
      />
      <button onClick={handleSearch}>Buscar</button>

      {product ? (
        <div style={{ marginTop: '20px' }}>
          <h3>{product.name}</h3>
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
        </div>
      ) : (
        <p>No hay producto cargado.</p>
      )}
    </div>
  );
}
