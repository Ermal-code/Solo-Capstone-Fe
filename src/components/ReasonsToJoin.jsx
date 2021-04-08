import React from "react";
import { Col, Row } from "react-bootstrap";
import MemoBookAppointmentsSvg from "../svg/BookAppointmentsSvg";
import MemoDoctorsSvg from "../svg/DoctorsSvg";
import MemoDocumentsSvg from "../svg/DocumentsSvg";
import MemoNotificationSvg from "../svg/NotificationSvg";

const ReasonsToJoin = () => {
  return (
    <div className="my-5">
      <h5 className="text-center">Why choose Easy Doctor ?</h5>
      <Row className="mt-4">
        <Col md="3" xs="6">
          <div className="reasonsToJoin">
            <MemoDoctorsSvg />
            <h6 className="mt-3 text-center">
              Access to best proffesionals around
            </h6>
          </div>
        </Col>
        <Col md="3" xs="6">
          <div className="reasonsToJoin">
            <MemoBookAppointmentsSvg />
            <h6 className="mt-3 text-center">Book appointments 24/7</h6>
          </div>
        </Col>
        <Col md="3" xs="6">
          <div className="reasonsToJoin">
            <MemoDocumentsSvg />
            <h6 className="mt-3 text-center">
              Your medical documents in one place
            </h6>
          </div>
        </Col>
        <Col md="3" xs="6">
          <div className="reasonsToJoin">
            <MemoNotificationSvg />
            <h6 className="mt-3 text-center">
              Get notification about your appointment
            </h6>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReasonsToJoin;
