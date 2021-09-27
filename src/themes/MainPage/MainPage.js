import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardBody } from "./MainPageStyle";
import { useHistory } from "react-router-dom";

const MainPage = () => {
  const history = useHistory();

  return (
    <Container style={{ padding: "3em", margin: "auto" }}>
      <Row>
        <Col sm="4">
          <Card>
            <CardBody onClick={() => history.push("/examSchedule", null)}>
              <h5>License System </h5>
            </CardBody>
          </Card>
        </Col>
        <Col sm="4">
          <Card>
            <CardBody>
              <h5>Support License</h5>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
