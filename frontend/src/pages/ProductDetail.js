import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const product = {
    id,
    name: "Camiseta de deporte",
    description: "Camiseta ideal para entrenamientos intensos.",
    price: 25.99,
    image: "/images/product1.jpg"
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <button>Agregar al carrito</button>
    </div>
  );
}

export default ProductDetail;
