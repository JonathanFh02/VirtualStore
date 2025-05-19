export async function getProductById(id) {
  try {
    const response = await fetch(`http://localhost:4000/product/${id}`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return null;
  }
}

export async function getProducts() {
  const response = await fetch('http://localhost:4000/product');
  const data = await response.json();
  return data.data;
}
  