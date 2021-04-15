import React, { useState } from "react";
import { Col } from "react-bootstrap";
import ModalUploadPicture from "./ModalUploadPicture";

const PatientSidebar = ({ profile, setSelectedSection, selectedSection }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ModalUploadPicture show={show} handleClose={handleClose} />
      <Col md={3} className="d-none d-md-block patientSidebar shadow">
        <div className="d-flex justify-content-start aling-items-center pt-4 pb-2 border-bottom border-light">
          <div style={{ position: "relative", width: "70px", height: "70px" }}>
            <img
              src={profile.image}
              alt="User avatar"
              className="profileAvatar"
              style={{ width: "70px", height: "70px" }}
            />
            <div className="addProfileImage">
              <i className="fas fa-plus" onClick={() => handleShow()}></i>
            </div>
          </div>
          <div className="ml-3">
            <h4>{profile.name}</h4>
            <h4>{profile.surname}</h4>
          </div>
        </div>
        <div className="mt-3 sideBarSelector">
          <ul>
            <li
              className={selectedSection === 1 ? `sideBarSelectedItem` : ""}
              onClick={() => setSelectedSection(1)}
            >
              Info
            </li>
            <li
              className={selectedSection === 2 ? `sideBarSelectedItem` : ""}
              onClick={() => setSelectedSection(2)}
            >
              Appointments
            </li>
            <li
              className={selectedSection === 3 ? `sideBarSelectedItem` : ""}
              onClick={() => setSelectedSection(3)}
            >
              Documents
            </li>
          </ul>
        </div>
      </Col>
      <Col md={12} className="d-block d-md-none patientSidebarSm ">
        <div className="d-flex justify-content-start aling-items-center pt-4 pb-2">
          <div style={{ position: "relative", width: "90px", height: "90px" }}>
            <img
              src={profile.image}
              alt="User avatar"
              className="profileAvatar"
              style={{ width: "90px", height: "90px" }}
            />
            <div className="addProfileImage">
              <i className="fas fa-plus" onClick={() => handleShow()}></i>
            </div>
          </div>

          <h4 className="ml-3">
            {profile.name} {profile.surname}
          </h4>
        </div>
        <div className="mt-3 d-flex justify-content-between">
          <div
            className={selectedSection === 1 ? `sideBarSelectedItemSm` : ""}
            onClick={() => setSelectedSection(1)}
          >
            Info
          </div>
          <div
            className={selectedSection === 2 ? `sideBarSelectedItemSm` : ""}
            onClick={() => setSelectedSection(2)}
          >
            Appointments
          </div>
          <div
            className={selectedSection === 3 ? `sideBarSelectedItemSm` : ""}
            onClick={() => setSelectedSection(3)}
          >
            Documents
          </div>
        </div>
      </Col>
    </>
  );
};

export default PatientSidebar;
