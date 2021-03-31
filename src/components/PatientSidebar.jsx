import React from "react";
import { Col } from "react-bootstrap";

const PatientSidebar = ({ profile }) => {
  return (
    <Col md={4}>
      <div className="d-flex justify-content-start pt-4">
        <img
          src={profile.image}
          alt="User avatar"
          className="profileAvatar"
          style={{ width: "100px", height: "100px" }}
        />
        <div className="ml-4">
          <p>
            Name: <strong>{profile.name}</strong>
          </p>
          <p>
            Last name: <strong>{profile.surname}</strong>
          </p>
        </div>
      </div>
    </Col>
  );
};

export default PatientSidebar;
