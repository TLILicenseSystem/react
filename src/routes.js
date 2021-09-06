import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ExamRoundPage from "./pages/ExamRound/ExamRound";
import ExamOrganizerPage from "./pages/ExamOrganizer/ExamOrganizer";
import ExamSchedulePage from "./pages/ExamSchedule/ExamSchedule";
import FormExamLocation from "./pages/ExamLocation/FormExamLocation";
import EditSchedulePage from "./pages/ExamSchedule/EditSchedule";

const AppRoute = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <ExamSchedulePage {...props} />}
      />

      <Route
        path="/examSchedule"
        render={(props) => <ExamSchedulePage {...props} />}
      />
      <Route
        path="/examSchedule-edit"
        render={(props) => <EditSchedulePage {...props} />}
      />
      <Route
        path="/examOrganizer"
        render={(props) => <ExamOrganizerPage {...props} />}
      />
      <Route
        path="/examRound"
        render={(props) => <ExamRoundPage {...props} />}
      />
      <Route
        path="/examLocation"
        render={(props) => <FormExamLocation {...props} />}
      />
      <Redirect from="*" to="/examLocation" />
    </Switch>
  );
};

export default AppRoute;
