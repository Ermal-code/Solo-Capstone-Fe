import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RegisterDoctorOrClinic from "./components/RegisterDoctorOrClinic";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Container style={{ minHeight: "85vh" }}>
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <Route
            path="/register-doctor"
            exact
            component={RegisterDoctorOrClinic}
          />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/results" exact component={Results} />
          <Route path="/editProfile/:id" exact component={EditProfile} />
          <Route path="/appointments/:id" exact component={Appointments} />
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
