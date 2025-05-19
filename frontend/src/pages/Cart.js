import React, { useEffect, useState } from 'react';
import { getCart } from '../services/CartService';
import CartItem from '../components/Cart';

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function fetchCart() {
      const userId = localStorage.getItem('userId'); // o el token con ID
      const result = await getCart(userId);
      setCart(result);
    }

    fetchCart();
  }, []);

  if (!cart) return <p>Cargando carrito...</p>;

  return (
    <div>
      <h1>Mi Carrito</h1>
      {cart.items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="product-list">
          {cart.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
