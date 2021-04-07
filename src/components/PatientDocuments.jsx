import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { getPatientDocuments } from "../api/documentsApi";
import SingleDocument from "./SingleDocument";

export class PatientDocuments extends Component {
  state = {
    documents: [],
  };

  getDocuments = async () => {
    try {
      const response = await getPatientDocuments(this.props.patientId);

      if (response.statusText === "OK") {
        const documents = response.data;
        this.setState({ documents });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  componentDidMount = () => {
    this.getDocuments();
  };

  render() {
    return (
      <div>
        <Row className="mt-5">
          {this.state.documents.map((document, index) => (
            <Col md="4" key={`${document._id}${index}${document.patient}ss`}>
              <SingleDocument document={document} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default PatientDocuments;
