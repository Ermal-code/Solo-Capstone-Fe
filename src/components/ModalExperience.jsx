import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalExperience = ({ show, handleClose, selectedExperience, userId }) => {
  let experienceSchema = {
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    area: "",
    user: userId,
  };

  useEffect(() => {
    if (selectedExperience) {
      experienceSchema = selectedExperience;
    }
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedExperience ? "Edit experience" : "Add experience"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {selectedExperience ? "Save changes" : "Add experience"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalExperience;
