import React from "react";
import { Col } from "react-bootstrap";

const PatientSidebar = ({ profile, setSelectedSection, selectedSection }) => {
  return (
    <Col md={3} className="d-none d-md-block patientSidebar shadow">
      <div className="d-flex justify-content-start aling-items-center pt-4 pb-2 border-bottom border-light">
        <img
          src={profile.image}
          alt="User avatar"
          className="profileAvatar"
          style={{ width: "70px", height: "70px" }}
        />
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
  );
};

export default PatientSidebar;
