import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products] = useState([
    { id: 1, name: "Camiseta de deporte", price: 25.99, image: "/images/camiseta.jpg"},
    { id: 2, name: "Pantalón deportivo", price: 35.99, image: "/images/product1.jpg" },
    { id: 3, name: "Zapatillas de running", price: 59.99, image: "/images/brasil.jpg" },
  ]);

  return (
    <div>
      <h1>Bienvenido a nuestra tienda de ropa deportiva</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
