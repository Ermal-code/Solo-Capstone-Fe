import React from "react";
import { Col, Modal, Row } from "react-bootstrap";

const ShowDocumentModal = ({ show, setShow, selectedDocument }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="documentModal"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {selectedDocument && selectedDocument.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {selectedDocument && (
            <Col md={8} lg={9}>
              <img
                src={selectedDocument.file}
                style={{ width: "100%", height: "100vh" }}
              />
            </Col>
          )}
          <Col md={4} lg={3}>
            <h4>Description</h4>
            <p>{selectedDocument && selectedDocument.description}</p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ShowDocumentModal;
