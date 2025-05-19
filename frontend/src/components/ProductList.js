import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function load() {
      const result = await getProducts();
      setProducts(result);
    }
    load();
  }, []);

  const handleAddToCart = async (userId, productId, name, price) => {

    const quantity = Number(document.getElementById(productId).value);

    if (isNaN(quantity) || quantity <= 0) {
      console.error('La cantidad no es válida');
      return;
    }
    // Verifica que los datos sean válidos antes de enviarlos
    if (!name || typeof name !== 'string') {
      console.error('El nombre del producto es inválido');
      return false;
    }

    if (typeof price !== 'number' || isNaN(price)) {
      console.error('El precio del producto es inválido');
      return false;
    }

    try {
      const response = await fetch(`http://localhost:4000/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId,
          name,
          price,
          quantity,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      return data.isSuccess;
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      return false;
    }
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: '200px', borderRadius: '8px' }}
            />
          )}

          <input
            type="number"
            min="1"
            defaultValue={1}
            style={{ width: '60px', marginRight: '10px' }}
            id={product.id}
          />

          <button onClick={() => {
            const quantity = document.getElementById(product.id).value;
            handleAddToCart(121212, product.id, product.name, product.price, quantity)
          }}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
