import React from 'react';
import ExamRoundPage from "../../pages/ExamRound/ExamRound";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

export const Setting = () => {
  return (
    <div className='setting'>
      <h1>Setting</h1>
    </div>
  );
};

export const ExamRound = () => {

          

  return (
    <div className='setting'>
      <h1>Setting/examRound</h1>

        <Route render={(props) => <ExamRoundPage {...props} />} />

    </div>
  );
};

export const ExamOrganier = () => {
  return (
    <div className='setting'>
      <h1>Setting/examOrganier</h1>
    </div>
  );
};

export const ExamRegion = () => {
  return (
    <div className='setting'>
      <h1>Setting/examRegion</h1>
    </div>
  );
};

export const ExamLocation = () => {
  return (
    <div className='setting'>
      <h1>Setting/examLocation</h1>
    </div>
  );
};

export const ExamSchedule = () => {
  return (
    <div className='setting'>
      <h1>Setting/examSchedule</h1>
    </div>
  );
};