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

const FormPayment = (props) => {
  return (
    <Container>
      <h3>ชำระค่าธรรมเนียม</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>เลขที่อ้างอิง</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ชำระเงิน</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>จำนวนเงิน</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col style={{ margintop: "2.7em",display: 'flex',
          alignItems: 'flex-end' }}>
          <AddButton
            
            title="ชำระค่าธรรมเนียม"
            onClick={() => console.log("dddd")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FormPayment;
