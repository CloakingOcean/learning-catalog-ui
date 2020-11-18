import React from "react";

import Header from "../header/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Index from "../../containers/Index";
import CreateUpdateDefinition from "../../components/forms/CreateUpdateDefinition";

function MainSwitch() {
  return (
    <Router>
      <Route path="/" component={Header} />

      <Route exact path="/">
        <Index />
      </Route>

      <Route
        path="/api/definitions/createDefinition"
        render={(props) => {
          return <CreateUpdateDefinition {...props} create={true} />;
        }}
      />

      <Route
        path="/api/definitions/updateDefinition/:id"
        render={(props) => {
          return <CreateUpdateDefinition {...props} create={false} />;
        }}
      />
    </Router>
  );
}

export default MainSwitch;
