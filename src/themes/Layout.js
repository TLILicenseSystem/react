import React, { useEffect, useState } from "react";
import { Container, Row, Col, FormFeedback } from "reactstrap";
import { InputWithLabelRow, SubmitButton } from "../components/shared";
import MainSidebar from "./Sidebar/MainSidebar";
import AppRoute from "../routes";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import MainPage from "./MainPage/MainPage";

const Layout = () => {
  const history = useHistory();
  console.log(history);

  useEffect(() => {
    console.log("history.location.pathname", history.location.pathname);
  }, history);
  return (
    <>
      <Row>
        <Col xs="12" sm="12" md="12" style={{ padding: "1em", height: "5vh" }}>
          Heafefergf
        </Col>
      </Row>
      {history.location.pathname === "/" ? (
        <Route exact path="/" render={(props) => <MainPage {...props} />} />
      ) : (
        <Row>
          <Col xs="12" sm="2" md="2" style={{ padding: 0 }}>
            <MainSidebar />
          </Col>
          <Col xs="12" sm="10" md="10" style={{ padding: 0 }}>
            <AppRoute />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Layout;
