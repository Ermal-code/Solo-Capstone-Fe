import React, { useState } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  FormText,
} from "react-bootstrap";
import SingleMember from "./SingleMember";

const ModalStaff = ({ show, handleClose, staff, setStaff, addMember }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {addMember ? "Add Member" : "Delete Members"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addMember ? (
            <div>
              <InputGroup className="mb-3 w-75">
                <FormControl
                  placeholder="Search doctor by name"
                  aria-label="Search doctor by name"
                  aria-describedby="basic-addon2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.currentTarget.value)}
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary">Search</Button>
                </InputGroup.Append>
              </InputGroup>
              <FormText className="text-danger mb-4">
                Doctor should be a user of this app.
              </FormText>
              <hr />
            </div>
          ) : (
            <div>
              {staff.map((member, index) => (
                <div
                  key={`${member._id}${member.doctor._id}${index}`}
                  className="mb-2"
                >
                  <SingleMember
                    member={member}
                    deleteModal={"true"}
                    setStaff={setStaff}
                  />
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalStaff;
