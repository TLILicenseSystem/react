import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ExamApplication from "./pages/ExamApplication/ExamApplication";
import ExamPayment from "./pages/ExamPayment/ExamPayment";
import TrainingLicense from "./pages/TrainingLicense/TrainingLicense";
import TrainingUL from "./pages/TrainingUL/TrainingUL";
import TrainingUK from "./pages/TrainingUK/TrainingUK";

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
      <Route
        path="/license/trainingLicense"
        render={(props) => <TrainingLicense {...props} />}
      />
      <Route
        path="/license/trainingUL"
        render={(props) => <TrainingUL {...props} />}
      />
      <Route
        path="/license/trainingUK"
        render={(props) => <TrainingUK {...props} />}
      />
    </Switch>
  );
};

export default AppRoute;
