import React from "react";
import { Col, Row } from "react-bootstrap";
import MemoBookAppointmentsSvg from "../svg/BookAppointmentsSvg";
import MemoDoctorsSvg from "../svg/DoctorsSvg";
import MemoDocumentsSvg from "../svg/DocumentsSvg";
import MemoNotificationSvg from "../svg/NotificationSvg";

const ReasonsToJoin = () => {
  return (
    <Row className="p-3" style={{ background: "white" }}>
      <h5 className="text-center py-5 w-100">Why choose Easy Doctor ?</h5>
      <Col md="3" xs="6" className="mb-4">
        <div className="reasonsToJoin">
          <MemoDoctorsSvg />
          <h6 className="text-center">Access to best proffesionals around</h6>
        </div>
      </Col>
      <Col md="3" xs="6" className="mb-4">
        <div className="reasonsToJoin">
          <MemoBookAppointmentsSvg />
          <h6 className="text-center">
            Book appointments online from anywhere 24/7
          </h6>
        </div>
      </Col>
      <Col md="3" xs="6" className="mb-4">
        <div className="reasonsToJoin">
          <MemoDocumentsSvg />
          <h6 className="text-center">Your medical documents in one place</h6>
        </div>
      </Col>
      <Col md="3" xs="6" className="mb-4">
        <div className="reasonsToJoin">
          <MemoNotificationSvg />
          <h6 className="text-center">
            Get notifications about your appointment
          </h6>
        </div>
      </Col>
    </Row>
  );
};

export default ReasonsToJoin;
