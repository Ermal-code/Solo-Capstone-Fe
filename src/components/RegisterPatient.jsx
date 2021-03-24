import React from "react";
import { Formik, Field } from "formik";
import { Form, Col, Row, Button } from "react-bootstrap";
import { registerUser } from "../api/usersApi";

const registerPatient = () => {
  return (
    <Row>
      <Col
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
      >
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
          }}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);
              if (data.gender === "") {
                delete data.gender;
              }
              const response = await registerUser(data);
              if (response.status === 201) {
                const data = response.data;
                console.log(data);
                setSubmitting(false);
                resetForm();
              }
            } catch (error) {
              console.log(error.response.data);
            }
          }}
        >
          {({ values, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} xs={10} sm="5">
                  <Form.Label>First name</Form.Label>
                  <Field
                    placeholder="Type your first name"
                    name="name"
                    type="text"
                    as={Form.Control}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={10} sm="5">
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
                <Form.Group as={Col} xs={10} sm="5">
                  <Form.Label>Email</Form.Label>
                  <Field
                    placeholder="Type your email"
                    name="email"
                    type="email"
                    as={Form.Control}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={10} sm="5">
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
                <Form.Group as={Col} xs={10} sm="5">
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
                      value="non-binary"
                      label="Non-binary"
                    />
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} sm="7">
                  <Form.Label className="mr-3">Birthdate</Form.Label>
                  <Field name="birthdate" type="date" />
                </Form.Group>
              </Form.Row>
              <Button disabled={isSubmitting} type="submit">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default registerPatient;
