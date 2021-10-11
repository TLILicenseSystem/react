import moment from "moment";
import React from "react";
import { FormGroup, Container, Row, Col, Input, Button } from "reactstrap";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
// "./InputWithLabel.module.css";
import { get } from "lodash";

import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormApplication = ({ scheduleDetail }) => {
  return (
    <Container>
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่สอบ</label>
            <Input
              readOnly={true}
              type="text"
              name="examDate"
              value={
                get(scheduleDetail, "examDate", "") &&
                dayjs(get(scheduleDetail, "examDate", "")).format("DD/MM/BBBB")
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>เวลาสอบ</label>
            <Input
              readOnly={true}
              type="text"
              name="radio1"
              value={get(scheduleDetail, "timeStr", "")}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>รหัสสถานที่ตั้งสอบ</label>
            <Input
              readOnly={true}
              type="text"
              name="locationId"
              value={get(scheduleDetail, "locationId", "")}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>สถานที่สอบ</label>
            <Input
              readOnly={true}
              type="text"
              name="orgName"
              value={get(scheduleDetail, "orgName", "")}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>สนามสอบ</label>
            <Input
              readOnly={true}
              type="text"
              name="provinceName"
              value={get(scheduleDetail, "provinceName", "")}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="1">
        <Col sm="9">
          <FormGroup>
            <label className={styles.label}>สถานที่ตั้งสอบ</label>
            <Input
              readOnly={true}
              type="text"
              name="locationDetail"
              value={get(scheduleDetail, "locationDetail", "")}
            />
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FormApplication;
