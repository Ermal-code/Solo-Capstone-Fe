import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addPicture, getUserById } from "../api/usersApi";
import { connect } from "react-redux";
import Loader from "./Loader";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => {
    dispatch(async (dispatch) => {
      try {
        const response = await getUserById("me");
        if (response.statusText === "OK") {
          dispatch({
            type: "SET_USER",
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error.response.data);
      }
    });
  },
});

class ModalUploadPicture extends Component {
  state = {
    post: null,
    base64photo: null,
    loading: false,
  };

  uploadPicture = async () => {
    try {
      this.setState({ loading: true });
      const response = await addPicture(this.state.post);

      if (response.status === 201) {
        this.setState(
          { post: null, base64photo: null, loading: false },
          async () => {
            await this.props.getProfile();
          }
        );
        this.props.handleClose();
      }
    } catch (error) {
      this.setState({ loading: false });
      console.log(error.response);
    }
  };

  fileUploadHandler = (e) => {
    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      this.setState({ base64photo: reader.result });
    };

    reader.readAsDataURL(e.target.files[0]);
    this.setState({ post: formData });
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            {!this.state.post ? (
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
              <div style={{ position: "relative" }}>
                <img
                  alt="Upload"
                  id="imageUpload"
                  src={this.state.base64photo}
                  height="300px"
                  style={{ objectFit: "Cover", maxWidth: "400px" }}
                />
                {this.state.loading && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                      zIndex: 999,
                      background: "rgba(0, 0, 0, 0.415)",
                    }}
                  >
                    <Loader />
                  </div>
                )}
              </div>
            )}
          </div>
          <Form>
            <Form.Group>
              <Form.Control
                type="file"
                id="fileUpload"
                onChange={this.fileUploadHandler}
                style={{ display: "none" }}
                ref={(fileInput) => (this.fileInput = fileInput)}
              />
              <Button
                className="rounded-pill mr-3 my-3 p-1 px-4 w-100"
                variant="primary"
                onClick={() => this.fileInput.click()}
                disabled={this.state.loading}
              >
                Upload Image
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={this.uploadPicture}
            disabled={this.state.loading}
            style={{ width: "130px" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUploadPicture);
