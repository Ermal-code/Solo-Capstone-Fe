import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import moment from "moment";
import { addExperience, editExperience } from "../api/experienceApi";
import { addEducation, editEducation } from "../api/educationApi";

const ModalExperience = ({
  isExperience,
  show,
  handleClose,
  selectedExperience,
  selectedEducation,
  getEducations,
  getExperiences,
}) => {
  const emptySchema = isExperience
    ? {
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        area: "",
      }
    : {
        type: "",
        school: "",
        startDate: "",
        endDate: "",
        area: "",
        degree: "",
      };

  const filledSchema = () => {
    if (isExperience) {
      return {
        ...selectedExperience,
        startDate: moment(selectedExperience.startDate).format("yyyy-MM-DD"),
        endDate: selectedExperience.endDate
          ? moment(selectedExperience.endDate).format("yyyy-MM-DD")
          : "",
      };
    } else {
      return {
        ...selectedEducation,
        startDate: moment(selectedEducation.startDate).format("yyyy-MM-DD"),
        endDate: selectedEducation.endDate
          ? moment(selectedEducation.endDate).format("yyyy-MM-DD")
          : "",
      };
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {(isExperience ? selectedExperience : selectedEducation)
              ? `Edit ${isExperience ? "experience" : "education"}`
              : `Add ${isExperience ? "experience" : "education"}`}
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={
            (isExperience ? selectedExperience : selectedEducation)
              ? filledSchema()
              : emptySchema
          }
          onSubmit={async (data) => {
            try {
              let response;
              if (selectedExperience || selectedEducation) {
                delete data.__v;
                delete data._id;
                delete data.user;
                response = isExperience
                  ? await editExperience(data, selectedExperience._id)
                  : await editEducation(data, selectedEducation._id);
              } else {
                response = isExperience
                  ? await addExperience(data)
                  : await addEducation(data);
              }

              if (response.status === 200 || response.status === 201) {
                isExperience ? getExperiences() : getEducations();
                handleClose();
              }
            } catch (error) {
              console.log(error.response.data);
            }
          }}
        >
          {({ values, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="p-4">
              <Form.Row>
                {isExperience ? (
                  <Form.Group as={Col} xs={10} sm="6">
                    <Form.Label>Role</Form.Label>
                    <Field
                      placeholder="Type your role"
                      name="role"
                      type="text"
                      as={Form.Control}
                    />
                  </Form.Group>
                ) : (
                  <Form.Group as={Col} xs={10} sm="6">
                    <Form.Label>Type of education</Form.Label>
                    <Field name="type" as="select" className="form-control">
                      <option value="">Choose Type</option>
                      {["High school", "University", "Specialization"].map(
                        (type, index) => (
                          <option key={`${type}and${index}`} value={type}>
                            {type}
                          </option>
                        )
                      )}
                    </Field>
                  </Form.Group>
                )}

                <Form.Group as={Col} xs={10} sm="6">
                  <Form.Label>
                    {isExperience ? "Hospital or Clinic" : "School"}
                  </Form.Label>
                  <Field
                    placeholder={`Type your ${
                      isExperience ? "Hospital or Clinic" : "school"
                    }`}
                    name={isExperience ? "company" : "school"}
                    type="text"
                    as={Form.Control}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                {!isExperience && (
                  <Form.Group as={Col} xs={10} sm="6">
                    <Form.Label>Type of degree</Form.Label>
                    <Field
                      placeholder="Type your degree"
                      name="degree"
                      type="text"
                      as={Form.Control}
                    />
                  </Form.Group>
                )}
                <Form.Group as={Col} xs={10} sm="6">
                  <Form.Label>Area</Form.Label>
                  <Field
                    placeholder="Type your area"
                    name="area"
                    type="text"
                    as={Form.Control}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} sm="6">
                  <Form.Label className="mr-3">Start Date</Form.Label>
                  <Field name="startDate" type="date" />
                </Form.Group>
                <Form.Group as={Col} sm="6">
                  <Form.Label className="mr-3">End Date</Form.Label>
                  <Field name="endDate" type="date" />
                </Form.Group>
              </Form.Row>
              <Modal.Footer className="mt-3">
                <Button variant="outline-primary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {selectedExperience || selectedEducation
                    ? "Save changes"
                    : `Add ${isExperience ? "experience" : "education"}`}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalExperience;
