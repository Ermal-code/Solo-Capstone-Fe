import React, { useRef, useState } from "react";
import { Col, Modal, Row, Form, Button } from "react-bootstrap";

const ShowDocumentModal = ({
  show,
  setShow,
  selectedDocument,
  addOrEditDocument,
}) => {
  const [post, setPost] = useState(null);
  const [base64photo, setBase64photo] = useState(null);
  const inputRef = useRef();

  const fileUploadHandler = (e) => {
    const formData = new FormData();
    formData.append("document", e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      setBase64photo(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
    setPost(formData);
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName={addOrEditDocument ? "" : "documentModal"}
      aria-labelledby="custom-modal"
    >
      {addOrEditDocument ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="custom-modal">
              {selectedDocument ? "Edit document" : "Add document"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  rows="3"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="file"
                  id="fileUpload"
                  onChange={fileUploadHandler}
                  style={{ display: "none" }}
                  ref={inputRef}
                />
                <Button
                  className="rounded-pill mr-3 my-3 p-1 px-4 w-100"
                  variant="primary"
                  onClick={() => inputRef.current.click()}
                  // disabled={loading}
                >
                  Upload Image
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="custom-modal">
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
        </>
      )}
    </Modal>
  );
};

export default ShowDocumentModal;
