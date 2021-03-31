import React from "react";
import { Col, Row } from "react-bootstrap";
import PatientSidebar from "./PatientSidebar";

const ProfilePatient = ({ profile }) => {
  return (
    <div>
      <Row>
        <PatientSidebar profile={profile} />
        <Col md={8}></Col>
      </Row>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
};

export default ProfilePatient;
