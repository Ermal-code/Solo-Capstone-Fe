import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import RegisterDoctorOrClinic from "./components/RegisterDoctorOrClinic";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import EditProfile from "./components/EditProfile";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Container>
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
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
