import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import SchedueleAppointment from "./components/SchedueleAppointment";
import RegisterDoctorOrClinic from "./components/RegisterDoctorOrClinic";
import RegisterPatient from "./components/RegisterPatient";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={SchedueleAppointment} />
        <Route path="/register" exact component={RegisterDoctorOrClinic} />
        <Route path="/registerPatient" exact component={RegisterPatient} />
      </Router>
    </div>
  );
}

export default App;
