import React, { useState } from 'react';

function Cart() {
  const [cart] = useState([
    { id: 1, name: "Camiseta de deporte", price: 25.99, quantity: 2 },
    { id: 2, name: "Pantalón deportivo", price: 35.99, quantity: 1 },
  ]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Tu carrito de compras</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <button>Comprar</button>
    </div>
  );
}

export default Cart;
