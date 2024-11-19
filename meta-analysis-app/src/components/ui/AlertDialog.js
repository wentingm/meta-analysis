import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertDialog = ({ 
  show, 
  onHide, 
  title = "Alert", 
  message = "Are you sure?", 
  confirmText = "Yes", 
  cancelText = "Cancel", 
  onConfirm 
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertDialog;
