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

const FormResult = (props) => {
  return (
    <Container>
      <h3>ผลการขอรับใบอนุญาต</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>ผลการขอรับ</label>
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
    </Container>
  );
};

export default FormResult;
