import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, Row, Form, Button } from "react-bootstrap";
import {
  addNewDocument,
  addFileDocument,
  editNewDocument,
  deleteDocument,
} from "../api/documentsApi";

const ShowDocumentModal = ({
  show,
  setShow,
  selectedDocument,
  addOrEditDocument,
  getDocuments,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState(null);
  const [base64photo, setBase64photo] = useState(null);
  const [isSubmmiting, setIsSubmmiting] = useState(false);
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

  useEffect(() => {
    if (selectedDocument && addOrEditDocument) {
      setTitle(selectedDocument.title);
      setDescription(selectedDocument.description);
      setBase64photo(selectedDocument.file);
    } else {
      setTitle("");
      setDescription("");
      setBase64photo(null);
    }
  }, [selectedDocument, addOrEditDocument]);

  const uploadPicture = async (documentId) => {
    try {
      const response = await addFileDocument(documentId, post);
      if (response.status === 201) {
        getDocuments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitDelete = async () => {
    try {
      setIsSubmmiting(true);
      const response = await deleteDocument(selectedDocument._id);
      if (response.status === 203) {
        getDocuments();
        setIsSubmmiting(false);
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitDocument = async (e) => {
    e.preventDefault();
    try {
      setIsSubmmiting(true);
      let response;
      if (selectedDocument) {
        response = await editNewDocument(selectedDocument._id, {
          title,
          description,
        });
      } else {
        response = await addNewDocument({ title, description });
      }

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        if (post) {
          uploadPicture(response.data._id);
        }
        getDocuments();
        setTitle("");
        setDescription("");
        setPost(null);
        setBase64photo(null);
        setShow(false);
        setIsSubmmiting(false);
      }
    } catch (error) {
      console.log(error);
    }
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
            <Form onSubmit={submitDocument}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                {!post && !selectedDocument ? (
                  <div
                    style={{
                      height: "300px",
                      width: "300px",
                      border: "2px dashed black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h5>Image</h5>
                  </div>
                ) : (
                  <img
                    alt="Upload"
                    id="imageUpload"
                    src={base64photo}
                    height="300px"
                    style={{ objectFit: "Cover", maxWidth: "400px" }}
                  />
                )}
              </div>
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
              <div
                className={`d-flex justify-content-${
                  selectedDocument ? "between" : "end"
                }`}
              >
                {selectedDocument && (
                  <Button
                    variant="outline-danger"
                    onClick={() => submitDelete()}
                    disabled={isSubmmiting}
                    style={{ padding: "10px 0", width: "25%" }}
                  >
                    Delete
                  </Button>
                )}

                <button
                  className="blueButton ml-3 w-25"
                  disabled={isSubmmiting}
                >
                  {selectedDocument ? "Edit" : "Add"}
                </button>
              </div>
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
                    style={{
                      width: "100%",
                      height: "100vh",
                      objectFit: "contain",
                    }}
                  />
                </Col>
              )}
              <Col md={4} lg={3} className="border-left border-muted">
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
