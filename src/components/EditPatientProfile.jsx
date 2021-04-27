import React, { useState } from "react";
import { Formik, Field, FieldArray } from "formik";
import { editProfile } from "../api/usersApi";
import { useHistory } from "react-router-dom";
import { Form, Col, Row } from "react-bootstrap";
import {
  foodAllergiesList,
  medicineAllergiesList,
  surgicalInterventionsList,
} from "../helpers/medicalArrays";

const EditPatientProfile = ({ user, setStoreUser }) => {
  const history = useHistory();
  const [sectionSelector, setSectionSelector] = useState("General");
  const [registerErrors, setRegisterErrors] = useState([]);

  const submitEdit = async (data) => {
    try {
      if (data.password === "") delete data.password;

      const response = await editProfile(data);

      if (response.status === 200) {
        setStoreUser();
        history.push("/profile/me");
      }
    } catch (error) {
      console.log(error.response.data);
      const errors = error.response.data;
      setRegisterErrors(errors);
      console.log(registerErrors);
    }
  };

  return (
    user && (
      <Row className="my-5">
        <Col sm="12" md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <Formik
            initialValues={{
              name: user.name,
              surname: user.surname,
              email: user.email,
              password: "",
              phone: user.phone,
              gender: user.gender,
              birthdate: user.birthdate,
              postalCode: user.postalCode,
              street: user.street,
              city: user.city,
              state: user.state,
              height: user.height,
              weight: user.weight,
              profession: user.profession,
              maritalStatus: user.maritalStatus,
              socialNumber: user.socialNumber,
              foodAllergies: user.foodAllergies,
              medicineAllergies: user.medicineAllergies,
              diabetes: user.diabetes,
              hypertension: user.hypertension,
              surgicalInterventions: user.surgicalInterventions,
            }}
            onSubmit={(data) => {
              submitEdit(data);
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="editProfileForm">
                <h4
                  onClick={(e) => setSectionSelector(e.currentTarget.innerText)}
                  className="my-4"
                >
                  General
                </h4>
                {sectionSelector === "General" && (
                  <div>
                    <Form.Row>
                      <Form.Group as={Col} xs={10} sm="6">
                        <Form.Label>First Name</Form.Label>
                        <Field
                          placeholder={`Type your first name`}
                          name="name"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>

                      <Form.Group as={Col} xs={10} sm="6">
                        <Form.Label>Last name</Form.Label>
                        <Field
                          placeholder="Type your last name"
                          name="surname"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={10} sm="6">
                        <Form.Label>Email</Form.Label>
                        <Field
                          placeholder="Type your email"
                          name="email"
                          type="email"
                          as={Form.Control}
                        />
                      </Form.Group>

                      <Form.Group as={Col} xs={10} sm="6">
                        <Form.Label>Password</Form.Label>
                        <Field
                          placeholder="Type your password"
                          name="password"
                          type="password"
                          as={Form.Control}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xs={10} sm="6">
                        <Form.Label>Phone</Form.Label>
                        <Field
                          placeholder="Type your phone number"
                          name="phone"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} xs={8} sm={6}>
                        <Form.Label>Gender</Form.Label>
                        <div className="d-flex justify-content-between">
                          <Field
                            name="gender"
                            type="radio"
                            as={Form.Check}
                            value="male"
                            label="Male"
                          />
                          <Field
                            name="gender"
                            type="radio"
                            as={Form.Check}
                            value="female"
                            label="Female"
                          />
                          <Field
                            name="gender"
                            type="radio"
                            as={Form.Check}
                            value="Other"
                            label="Other"
                          />
                        </div>
                      </Form.Group>
                      <Form.Group as={Col} sm="6">
                        <Form.Label className="ml-3">Birthdate</Form.Label>
                        <Field
                          name="birthdate"
                          type="date"
                          as={Form.Check}
                          className="ml-3"
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} sm="6">
                        <Form.Label className="mr-3">Height</Form.Label>
                        <Field
                          placeholder="Type your height in cm"
                          name="height"
                          type="number"
                          as={Form.Control}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm="6">
                        <Form.Label className="mr-3">Weight</Form.Label>
                        <Field
                          placeholder="Type your weight in kg"
                          name="weight"
                          type="number"
                          as={Form.Control}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} sm="6">
                        <Form.Label className="mr-3">Profession</Form.Label>
                        <Field
                          placeholder="Type your profession"
                          name="profession"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                      <Form.Group as={Col} sm="6">
                        <Form.Label className="mr-3">Marital status</Form.Label>
                        <Field
                          name="maritalStatus"
                          as="select"
                          className="form-control "
                        >
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                        </Field>
                      </Form.Group>
                    </Form.Row>
                  </div>
                )}
                <h4
                  onClick={(e) => setSectionSelector(e.currentTarget.innerText)}
                  className="my-4"
                >
                  Address
                </h4>
                {sectionSelector === "Address" && (
                  <div>
                    <Form.Row>
                      <Form.Group as={Col} md={6}>
                        <Form.Label className="mr-5">Street address</Form.Label>
                        <Field
                          placeholder="Type your street address"
                          name="street"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={6}>
                        <Form.Label className="mr-5">City</Form.Label>
                        <Field
                          placeholder="Type your city"
                          name="city"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} md={6}>
                        <Form.Label className="mr-5">State</Form.Label>
                        <Field
                          placeholder="Type your state"
                          name="state"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md={6}>
                        <Form.Label className="mr-5">Zipcode</Form.Label>
                        <Field
                          placeholder="Type your zipcode"
                          name="postalCode"
                          type="number"
                          as={Form.Control}
                        />
                      </Form.Group>
                    </Form.Row>
                  </div>
                )}
                <h4
                  onClick={(e) => setSectionSelector(e.currentTarget.innerText)}
                  className="my-4"
                >
                  Medical Info
                </h4>
                {sectionSelector === "Medical Info" && (
                  <div>
                    <Form.Row>
                      <Form.Group as={Col} md={6}>
                        <Form.Label className="mr-5">Social number</Form.Label>
                        <Field
                          placeholder="Type your social number"
                          name="socialNumber"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} sm="12">
                        <Form.Label className="mr-5">
                          Select food allergy
                        </Form.Label>
                        <FieldArray name="foodAllergies">
                          {(arrayHelpers) => (
                            <>
                              {values.foodAllergies.map((element, index) => (
                                <div
                                  className="d-flex justify-content-between align-items-center mb-3"
                                  key={`${element}${index}`}
                                >
                                  <Field
                                    name={`foodAllergies.${index}`}
                                    as="select"
                                    className="form-control w-50 "
                                  >
                                    <option value={element ? element : ""}>
                                      {element ? element : "Choose Option"}
                                    </option>
                                    {foodAllergiesList.map(
                                      (foodAllergy, index) => (
                                        <option
                                          key={`${foodAllergy}and${index}${
                                            index + 2
                                          }`}
                                          value={foodAllergy}
                                        >
                                          {foodAllergy}
                                        </option>
                                      )
                                    )}
                                  </Field>
                                  <i
                                    className="fas fa-trash-alt"
                                    onClick={() => arrayHelpers.remove(index)}
                                  ></i>
                                </div>
                              ))}
                              <button
                                className="blueButtonV2"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Add food allergy
                              </button>
                            </>
                          )}
                        </FieldArray>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} sm="12">
                        <Form.Label className="mr-5">
                          Select medicine allergy
                        </Form.Label>
                        <FieldArray name="medicineAllergies">
                          {(arrayHelpers) => (
                            <>
                              {values.medicineAllergies.map(
                                (element, index) => (
                                  <div
                                    className="d-flex justify-content-between align-items-center mb-3"
                                    key={`${element}${index}`}
                                  >
                                    <Field
                                      name={`medicineAllergies.${index}`}
                                      as="select"
                                      className="form-control w-50 "
                                    >
                                      <option value={element ? element : ""}>
                                        {element ? element : "Choose Option"}
                                      </option>
                                      {medicineAllergiesList.map(
                                        (medicineAllergy, index) => (
                                          <option
                                            key={`${medicineAllergy}and${index}${
                                              index + 2
                                            }`}
                                            value={medicineAllergy}
                                          >
                                            {medicineAllergy}
                                          </option>
                                        )
                                      )}
                                    </Field>
                                    <i
                                      className="fas fa-trash-alt"
                                      onClick={() => arrayHelpers.remove(index)}
                                    ></i>
                                  </div>
                                )
                              )}
                              <button
                                className="blueButtonV2"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Add medicine allergy
                              </button>
                            </>
                          )}
                        </FieldArray>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} md={6}>
                        <Form.Label className="mr-5">
                          Select diabetes type
                        </Form.Label>
                        <Field
                          name="diabetes"
                          as="select"
                          className="form-control w-50 "
                        >
                          <option
                            value={values.diabetes ? values.diabetes : ""}
                          >
                            {values.diabetes
                              ? values.diabetes
                              : "Choose Option"}
                          </option>
                          {["None", "Type 1", "Type 2", "Gestational diabetes"]
                            .filter((type) => type !== values.diabetes)
                            .map((diabetes, index) => (
                              <option
                                key={`${diabetes}and${index}${index + 2}`}
                                value={diabetes}
                              >
                                {diabetes}
                              </option>
                            ))}
                        </Field>
                      </Form.Group>
                      <Form.Group as={Col} md={6}>
                        <Form.Label className="mr-5">
                          Select hypertension type
                        </Form.Label>
                        <Field
                          name="hypertension"
                          as="select"
                          className="form-control w-50 "
                        >
                          <option
                            value={
                              values.hypertension ? values.hypertension : ""
                            }
                          >
                            {values.hypertension
                              ? values.hypertension
                              : "Choose Option"}
                          </option>
                          {["None", "Primary", "Secondary"]
                            .filter((type) => type !== values.hypertension)
                            .map((hypertension, index) => (
                              <option
                                key={`${hypertension}and${index}${index + 2}`}
                                value={hypertension}
                              >
                                {hypertension}
                              </option>
                            ))}
                        </Field>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} sm="12">
                        <Form.Label className="mr-5">
                          Select surgical intervention
                        </Form.Label>
                        <FieldArray name="surgicalInterventions">
                          {(arrayHelpers) => (
                            <>
                              {values.surgicalInterventions.map(
                                (element, index) => (
                                  <div
                                    className="d-flex justify-content-between align-items-center mb-3"
                                    key={`${element}${index}`}
                                  >
                                    <Field
                                      name={`surgicalInterventions.${index}`}
                                      as="select"
                                      className="form-control w-50 "
                                    >
                                      <option value={element ? element : ""}>
                                        {element ? element : "Choose Option"}
                                      </option>
                                      {surgicalInterventionsList.map(
                                        (surgicalIntervention, index) => (
                                          <option
                                            key={`${surgicalIntervention}and${index}${
                                              index + 2
                                            }`}
                                            value={surgicalIntervention}
                                          >
                                            {surgicalIntervention}
                                          </option>
                                        )
                                      )}
                                    </Field>
                                    <i
                                      className="fas fa-trash-alt"
                                      onClick={() => arrayHelpers.remove(index)}
                                    ></i>
                                  </div>
                                )
                              )}
                              <button
                                className="blueButtonV2"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Add surgical intervention
                              </button>
                            </>
                          )}
                        </FieldArray>
                      </Form.Group>
                    </Form.Row>
                  </div>
                )}

                <div className="mt-5">
                  <button className="blueButton w-100" type="submit">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    )
  );
};

export default EditPatientProfile;
