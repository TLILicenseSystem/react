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
import { AddButton, DropdownCause } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import { get } from "lodash";

const FormResult = (props) => {
  return (
    <Container>
      <h3>ผลการขอขึ้นทะเบียน UL</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownCause
              label="ผลการขอรับ"
              // disabled={true}
              isClearable={true}
              onClick={(e) => console.log(get(e, "companyCode", ""))}
            />
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
