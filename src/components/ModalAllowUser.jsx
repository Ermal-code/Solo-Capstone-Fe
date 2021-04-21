import React from "react";
import { Modal, Button } from "react-bootstrap";
import { addAllowedUser } from "../api/usersApi";

const ModalAllowUser = ({ show, handleClose, profileId }) => {
  const addDoctorToAllowedUserList = async () => {
    try {
      const response = await addAllowedUser(profileId);

      if (response.status === 201) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button variant="success" onClick={addDoctorToAllowedUserList}>
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
