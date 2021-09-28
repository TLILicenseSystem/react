import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Mook = () => {
  return "ddd";
};

const AppRoute = () => {
  return (
    <Switch>
      <Route
        path="/support/examApplication"
        render={(props) => <Mook {...props} />}
      />
    </Switch>
  );
};

export default AppRoute;
