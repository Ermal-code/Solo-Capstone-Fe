import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalAllowUser = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <p>
          Do you want to allow this doctor access to your profile and documents
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={handleClose}>
          Yes
        </Button>
        <Button variant="outline-primary" onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAllowUser;
