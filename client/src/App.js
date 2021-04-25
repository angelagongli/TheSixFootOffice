import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import EmployeePage from "./pages/EmployeePage";
import '@fluentui/react/dist/css/fabric.css';
import "./assets/css/style.css";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/team">
            <TeamPage />
          </Route>
          <Route exact path="/employee">
            <EmployeePage />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
