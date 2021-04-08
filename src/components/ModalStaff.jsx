import React, { useState } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  FormText,
} from "react-bootstrap";
import { getDoctorsAndClinics } from "../api/usersApi";
import ModalStaffSingleDoctor from "./ModalStaffSingleDoctor";
import SingleMember from "./SingleMember";

const ModalStaff = ({ show, handleClose, staff, setStaff, addMember }) => {
  const [searchText, setSearchText] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [showNoSearchResult, setShowNoSearchResult] = useState(false);

  const getDoctors = async () => {
    try {
      const query = `?name=${searchText}`;
      const response = await getDoctorsAndClinics(query);

      if (response.statusText === "OK") {
        const doctorResult = response.data.filter(
          (user) => user.role === "doctor"
        );
        if (doctorResult.length === 0) {
          setShowNoSearchResult(true);
        } else {
          setShowNoSearchResult(false);
        }

        setDoctors(doctorResult);
        setSearchText("");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {addMember ? "Add Member" : "Remove staff members"}
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
                  <Button
                    variant="outline-secondary"
                    onClick={() => getDoctors()}
                    disabled={searchText === ""}
                  >
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <FormText className="text-danger mb-4">
                Doctor should be a user of this app.
              </FormText>
              <hr />
              <div>
                {doctors.map((doctor, index) => (
                  <div key={`${doctor._id}${doctor.name}${index}`}>
                    <ModalStaffSingleDoctor
                      doctor={doctor}
                      setStaff={setStaff}
                    />
                  </div>
                ))}
                {showNoSearchResult && <h3>No search result were found</h3>}
              </div>
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
