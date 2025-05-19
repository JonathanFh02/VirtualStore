import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/cart">Carrito</Link>
      <Link to="/login">Login</Link>
      <Link to="/product">Product</Link>
    </nav>
  );
}

export default Navbar;
