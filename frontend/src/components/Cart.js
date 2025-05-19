// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { getCart, removeToCart } from '../services/CartService';


function Cart() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const result = await getCart();
        console.log('Respuesta del carrito:', result);
        setItems(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error('Error cargando el carrito:', error);
        setItems([]);
      }
    }
    load();
  }, []);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const calculateTotalP = (item) => {
    return item.price * item.quantity;
  };

  const handleRemove = async (productId) => {
    const success = await removeToCart(121212, productId); // Usa tu función del service
    if (success) {
      setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    } else {
      alert('Error al quitar el producto del carrito.');
    }
  };

  return (
    <div className="product-list">
      {items.map(item => (
        <div key={item.id} className="product-card">
          <h2>{item.name}</h2>
          <p>{item.quantity}</p>
          <p><strong>Precio:</strong> ${item.price}</p>
          <h3>TotalP: ${calculateTotalP(item)}</h3>
          <h3>Total: ${calculateTotal()}</h3>
          <button onClick={() => handleRemove(item.productId)}>
            Quitar del carrito
          </button>
        </div>

      ))}
      <h3>Usuario</h3>
    </div>
  );
}

export default Cart;