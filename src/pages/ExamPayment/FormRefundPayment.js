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

const FormRefundPayment = (props) => {
  return (
    <Container>
      <h3>ยกเลิก / ขอคืนค่าธรรมเนียม</h3>
      <hr />
      <Row>
        <Col sm="3">
          <FormGroup>
            <label className={styles.label}>วันที่แจ้งยกเลิก</label>
            <Input type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>
              หมายเหตุ <label className={styles.required}> *</label>
            </label>{" "}
            <Input type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col sm="2"></Col>
      </Row>
    </Container>
  );
};

export default FormRefundPayment;
