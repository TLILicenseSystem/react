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

const FormLicense = (props) => {
  return (
    <Container>
      <h3>การขอรับใบอนุญาต</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>ประเภทการขอ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ยื่น คปภ.</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>ส่ง สนญ.ตามหนังสือที่</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>ลง วันที่</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>ครั้งที่ต่ออายุ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>Blacklist</Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FormLicense;
