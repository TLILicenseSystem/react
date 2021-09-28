import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ExamRoundPage from "./pages/ExamRound/ExamRound";
import ExamOrganizerPage from "./pages/ExamOrganizer/ExamOrganizer";
import ExamSchedulePage from "./pages/ExamSchedule/ExamSchedule";
import FormExamLocation from "./pages/ExamLocation/FormExamLocation";
import EditSchedulePage from "./pages/ExamSchedule/EditSchedule";
import ExamApplication from "./pages/ExamApplication/ExamApplication";

const AppRoute = () => {
  return (
    <Switch>
      <Route
        path="/setting/examSchedule"
        render={(props) => <ExamSchedulePage {...props} />}
      />
      <Route
        path="/setting/examSchedule-edit"
        render={(props) => <EditSchedulePage {...props} />}
      />
      <Route
        path="/setting/examOrganizer"
        render={(props) => <ExamOrganizerPage {...props} />}
      />
      <Route
        path="/setting/examRound"
        render={(props) => <ExamRoundPage {...props} />}
      />
      <Route
        path="/setting/examLocation"
        render={(props) => <FormExamLocation {...props} />}
      />
      <Route
        exact
        path="/setting/examApplication"
        render={(props) => <ExamApplication {...props} />}
      />
    </Switch>
  );
};

export default AppRoute;
