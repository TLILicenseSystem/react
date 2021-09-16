import React from "react";
import { FormGroup, Container, Row, Col, Input, Button } from "reactstrap";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
// "./InputWithLabel.module.css";

const FormApplication = (props) => {
  return (
    <Container>
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่สอบ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>เวลาสอบ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>รหัสสถานที่ตั้งสอบ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>สถานที่สอบ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>สนามสอบ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="1">
        <Col sm="9">
          <FormGroup>
            <label className={styles.label}>สถานที่ตั้งสอบ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FormApplication;
