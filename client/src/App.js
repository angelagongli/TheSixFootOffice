import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OfficeSchedule from "./components/OfficeSchedule";
import OfficeFloorPlan from "./components/OfficeFloorPlan";
import '@fluentui/react/dist/css/fabric.css';

function App() {
  return (
    <div>
      <OfficeSchedule />
      <OfficeFloorPlan />
    </div>
  );
}

export default App;
