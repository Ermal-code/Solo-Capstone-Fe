import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";

import RegisterDoctorOrClinic from "./components/RegisterDoctorOrClinic";
import RegisterPatient from "./components/RegisterPatient";
import ProfileDoctorOrClinic from "./components/ProfileDoctorOrClinic";
import { Container } from "react-bootstrap";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Container>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={RegisterDoctorOrClinic} />
          <Route path="/registerPatient" exact component={RegisterPatient} />
          <Route path="/profile/:id" exact component={ProfileDoctorOrClinic} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
