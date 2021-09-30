import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ExamApplication from "./pages/ExamApplication/ExamApplication";
import ExamPayment from "./pages/ExamPayment/ExamPayment";

const AppRoute = () => {
  return (
    <Switch>
      <Route
        path="/license/examApplication"
        render={(props) => <ExamApplication {...props} />}
      />
      <Route
        path="/license/examPayment"
        render={(props) => <ExamPayment {...props} />}
      />
    </Switch>
  );
};

export default AppRoute;
