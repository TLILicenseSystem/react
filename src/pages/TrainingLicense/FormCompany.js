import React, { useState } from "react";
import {
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import { AddButton } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";

const FormCompany = (props) => {
  return (
    <Container>
      <h3>บริษัทเดิม</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>บริษัท</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>เลขที่ใบอนุญาต</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ออกบัตร</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่หมดอายุ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>ประเภท</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FormCompany;
