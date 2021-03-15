import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import SchedueleAppointment from "./components/SchedueleAppointment";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={SchedueleAppointment} />
      </Router>
    </div>
  );
}

export default App;
