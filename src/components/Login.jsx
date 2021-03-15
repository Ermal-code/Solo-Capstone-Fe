import React, { useState } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { loginUser } from "../api/usersApi";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response.ok) {
        localStorage.setItem("LoggedIn", true);
        history.push("/home");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <form onSubmit={submitLogin}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>
      </Col>
    </Row>
  );
};

export default Login;
