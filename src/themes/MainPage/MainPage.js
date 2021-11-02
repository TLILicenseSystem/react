import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Container, Card, CardBody } from "./MainPageStyle";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelectSale } from "../../redux/actions";

const MainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.removeItem("sale");
    dispatch(
      updateSelectSale({
        seleted: null,
      })
    );
  }, []);

  return (
    <Container style={{ padding: "3em", margin: "auto" }}>
      <Row>
        <Col sm="4">
          <Card>
            <CardBody
              onClick={() => history.push("/license/examApplication", null)}
            >
              <h5>License System </h5>
            </CardBody>
          </Card>
        </Col>
        <Col sm="4">
          <Card>
            <CardBody
              onClick={() => history.push("/setting/examSchedule", null)}
            >
              <h5>Support License</h5>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
