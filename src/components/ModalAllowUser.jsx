import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalAllowUser = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <p>
          Do you want to allow this doctor access to your profile and documents!
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <div className="d-flex justify-content-between w-50">
          <Button variant="success" onClick={handleClose}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAllowUser;
