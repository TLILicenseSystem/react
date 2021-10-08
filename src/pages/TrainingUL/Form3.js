import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import { AddButton, Table } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import { get } from "lodash";
import { columns_tab3 } from "./columns";

const From3 = (props) => {
  return (
    <Container>
      <Row style={{ paddingBottom: "14px" }}>
        <Col sm={{ size: 2, offset: 1 }}>โทษทางวินัย</Col>
        <Col>- </Col>
      </Row>
      <Row style={{ paddingBottom: "14px" }}>
        <Col sm={{ size: 2, offset: 1 }}>คดีความ</Col>
        <Col>
          <Row>
            <Col sm="2">ร้องเรียน</Col>
            <Col>- </Col>
          </Row>
          <Row>
            <Col sm="2">ยึด / อายัด</Col>
            <Col>-</Col>
          </Row>
          <Row>
            <Col sm="4">
              <Input bsSize="sm" disabled={true} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "14px" }}>
        <Col sm={{ size: 2, offset: 1 }}>ผลงานเคสใหม่</Col>
        <Col>
          {" "}
          <Row>
            <Col>จำนวน</Col>
            <Col style={{ textAlign: "center", fontWeight: "bold" }}>xx</Col>
            <Col>ราย</Col>
          </Row>
          <Row>
            <Col>จำนวนเงินเอาประกันภัยรวม</Col>
            <Col style={{ textAlign: "center", fontWeight: "bold" }}>
              0,000,000
            </Col>
            <Col>บาท</Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "14px" }}>
        <Col sm={{ size: 10, offset: 1 }}>
          <Table id="tab3" data={[]} columns={columns_tab3} loading={false} />
        </Col>
      </Row>
    </Container>
  );
};

export default From3;
