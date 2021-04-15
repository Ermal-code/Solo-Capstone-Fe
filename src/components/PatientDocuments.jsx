import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { getPatientDocuments } from "../api/documentsApi";
import ShowDocumentModal from "./ShowDocumentModal";
import SingleDocument from "./SingleDocument";

const PatientDocuments = ({ profileId }) => {
  const [documents, setDocuments] = useState([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [addOrEditDocument, setAddOrEditDocument] = useState(false);

  const getDocuments = async () => {
    try {
      const response = await getPatientDocuments(profileId);

      if (response.statusText === "OK") {
        setDocuments(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div>
      <ShowDocumentModal
        getDocuments={getDocuments}
        show={showDocumentModal}
        setShow={setShowDocumentModal}
        selectedDocument={selectedDocument}
        addOrEditDocument={addOrEditDocument}
      />
      <div className="mt-5">
        <Button
          variant="outline-light"
          onClick={() => {
            setSelectedDocument(null);
            setAddOrEditDocument(true);
            setShowDocumentModal(true);
          }}
        >
          <i className="fas fa-plus"></i>Add a new document
        </Button>
      </div>
      <Row className="mt-5">
        {documents.map((document, index) => (
          <Col
            xs="6"
            sm="4"
            md="3"
            lg="2"
            key={`${document._id}${index}${document.patient}ss`}
          >
            <SingleDocument
              profileId={profileId}
              document={document}
              setShow={setShowDocumentModal}
              setSelectedDocument={() => setSelectedDocument(document)}
              setAddOrEditDocument={setAddOrEditDocument}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PatientDocuments;
