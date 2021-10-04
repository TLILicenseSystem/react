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
      <h3>การรับค่าธรรมเนียม</h3>
      <hr />
      <Row>
        <Col sm="3">
          <FormGroup>
            <label className={styles.label}>การรับ - การจ่ายค่าธรรมเนียม</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>สถานะ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <label className={styles.label}>ประเภทการชำระ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col sm="2">
          <FormGroup>
            <label className={styles.label}>จำนวนเงิน</label>
            <Input readOnly={true} type="text" name="radio1" />
            บาท
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <FormGroup>
            <label className={styles.label}>เลขที่อ้างอิง</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>
              ref1 (รหัสบัตรประชาชนฝ่ายขาย) :
            </label>
            <Row>
              <Col>
                <Input readOnly={true} type="text" name="radio1" />
              </Col>
              <Col>
                <Input readOnly={true} type="text" name="radio1" />
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <label className={styles.label}>วันที่ชำระเงิน</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col sm="2"></Col>
      </Row>
      <Row>
        <Col sm="3"></Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>
              ref 2 (รหัสบัตรประชาชนต้นสังกัด) :
            </label>
            <Row>
              <Col>
                <Input readOnly={true} type="text" name="radio1" />
              </Col>
              <Col>
                <Input readOnly={true} type="text" name="radio1" />
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup>
            <label className={styles.label}>เบอร์โทร</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col sm="2"></Col>
      </Row>
      <Row>
        <Col sm="10">
          <FormGroup>
            <label className={styles.label}>
              หมายเหตุ <label className={styles.required}> *</label>
            </label>
            <Input
              type="text"
              name="remark"
              // value={get(scheduleDetail, "remark", "")}
              // onChange={(e) =>
              //   setScheduleDetail({
              //     ...scheduleDetail,
              //     remark: e.target.value,
              //   })
              // }
            />
          </FormGroup>
        </Col>
        <Col sm="2"></Col>
      </Row>
    </Container>
  );
};

export default FormPayment;
