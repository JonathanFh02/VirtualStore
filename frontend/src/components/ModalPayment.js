import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalPayment = ({ show, onHide, product }) => {
  const handlePayment = () => {
    // Aquí puedes implementar la lógica del pago
    alert('Procesando el pago...');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Pago del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Producto: {product?.name}</h5>
        <p>Precio: ${product?.price}</p>
        {/* Aquí puedes agregar más detalles del producto */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handlePayment}>
          Pagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPayment;
