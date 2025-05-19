export async function getCart() {
  const response = await fetch(`http://localhost:4000/cart/121212`);
  const data = await response.json();
  return data.isSuccess ? data.value.items : [];

}

export async function addToCart(userId, productId, name, price, quantity) {
  try {
    const response = await fetch(`http://localhost:4000/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, name, price, quantity }),
    });

    const data = await response.json();
    console.log(data);
    return data.isSuccess;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    return false;
  }
}

export async function removeToCart(userId, productId) {
  try {
    const response = await fetch(`http://localhost:4000/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId }),
    });

    const data = await response.json();
    console.log(data);
    return data.isSuccess;
  } catch (error) {
    console.error('Error al quitar del carrito:', error);
    return false;
  }
}
