import React, { useState, useEffect } from "react";
import { FormGroup, Container, Row, Col, Input, Table } from "reactstrap";
import {
  DropdownOfferResult,
  DropdownCause,
  DatePickerThai,
  InputLicenseNo,
  SubmitButton,
  DeleteButton,
} from "../../components/shared";
import Swal from "sweetalert2";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import { colors } from "../../themes/style";
import _ from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormResult = ({ currentLicense, onChange }) => {
  const [data, setData] = useState(currentLicense);
  const [lesson, setLesson] = useState(null);
  const [cause, setCause] = useState([]);

  useEffect(() => {
    setData(currentLicense);
  }, [currentLicense]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  const onSelectCause = () => {
    if (lesson) {
      let find = _.find(cause, (item) => lesson.causeId === item.causeId);
      if (find) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "พบข้อมูลซ้ำในเหตุผลการไม่อนุมัติ กรุณาเลือกเหตุผลใหม่!!",
        });
      } else {
        cause.push({ ...lesson });
        setCause(cause);
        setData({ ...data, disapprovePerson: cause });
      }
    }
  };

  const onSelectOfferResult = (e) => {
    setData({
      ...data,
      offerResult: _.get(e, "offerResult", ""),
      offerResultName: _.get(e, "offerResultName", ""),
    });
    setLesson(null);
    setCause([]);
  };

  return (
    <Container>
      <h3>ผลการขอรับใบอนุญาต</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownOfferResult
              requiredField
              label="ผลการขอรับ"
              disabled={_.get(data, "offerType", null) ? false : true}
              type={"offerResultUL"}
              value={_.get(data, "offerResult", "")}
              showError={_.get(data, "offerResult", null) ? false : true}
              onClick={(e) => onSelectOfferResult(e)}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>เลขที่ใบอนุญาต</label>
            <Input
              readOnly={true}
              name="licenseNo"
              value={_.get(data, "licenseNo", "")}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ออกบัตร</label>
            <Input
              readOnly={true}
              name="issueDate"
              value={
                _.get(data, "issueDate", null)
                  ? dayjs(new Date(data.issueDate)).format("DD/MM/BBBB")
                  : ""
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่หมดอายุ</label>
            <Input
              readOnly={true}
              name="expireDate"
              value={
                _.get(data, "expireDate", null)
                  ? dayjs(new Date(data.expireDate)).format("DD/MM/BBBB")
                  : ""
              }
            />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownCause
              label="เหตุผลการไม่อนุมัติ"
              disabled={_.get(data, "offerResult", null) === "3" ? false : true}
              value={lesson && lesson.causeId}
              type={"disapprovePerson"}
              onClick={(e) => setLesson(e)}
            />
          </FormGroup>
        </Col>
        <Col
          style={{
            paddingBottom: "10px",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <SubmitButton
            disabled={lesson ? false : true}
            title="เลือก"
            onClick={onSelectCause}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <Table bordered size="sm" style={{ fontSize: "90%" }}>
            <thead
              style={{ backgroundColor: colors.SECONDARYBLUE, color: "white" }}
            >
              <tr>
                <th>ลำดับ</th>
                <th>เหตุผลการไม่อนุมัติ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cause.map((item, index) => (
                <tr>
                  <th style={{ width: "10%" }} scope="row">
                    {index + 1}
                  </th>
                  <td>{item.detail ? item.detail : item.causeDetail}</td>
                  <td style={{ textAlign: "center", width: "10%" }}>
                    <DeleteButton
                      onClick={() =>
                        setCause(
                          _.filter(cause, (c) => c.causeId !== item.causeId)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default FormResult;
