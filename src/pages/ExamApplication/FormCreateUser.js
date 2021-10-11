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
import moment from "moment";
import { get } from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormCreateUser = ({ mode, data }) => {
  return (
    <Row sm="6">
      <Col>
        <FormGroup>
          <label className={styles.label}>ผู้บันทึก</label>
          <Input
            readOnly={true}
            type="text"
            name="code"
            value={
              mode === "history"
                ? get(data, "updateUserCode", "")
                : get(data, "createUserCode", "")
            }
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <label className={styles.label}>สาขา</label>
          <Input readOnly={true} type="text" />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <label className={styles.label}>วันที่บันทึก</label>
          <Input
            readOnly={true}
            type="text"
            name="time"
            value={
              get(data, "lastUpdate", "") &&
              get(data, "createTime", "") &&
              (mode === "history"
                ? dayjs(get(data, "lastUpdate", "")).format("DD/MM/BBBB")
                : dayjs(new Date()).format("DD/MM/BBBB"))
            }
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default FormCreateUser;
