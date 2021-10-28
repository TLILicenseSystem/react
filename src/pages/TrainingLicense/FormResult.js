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
  const [readOnly, setReadOnly] = useState(true);
  const [lesson, setLesson] = useState(null);
  const [cause, setCause] = useState([]);

  useEffect(() => {
    setData(currentLicense);
    if (currentLicense) {
      if (currentLicense.issueDate) {
        currentLicense.expireDate = dayjs(new Date(currentLicense.issueDate))
          .add(1, "year")
          .subtract(1, "day");
      } else {
        currentLicense.issueDate = dayjs(new Date());
        currentLicense.expireDate = dayjs(new Date())
          .add(1, "year")
          .subtract(1, "day");
      }
      // if (currentLicense.disapprovePerson) {
      //   const result = _.map(currentLicense.disapprovePerson, "causeId");
      //   // let find = _.filter(
      //   //   cause,
      //   //   (item) => lesson.causeId === item.causeId
      //   // );
      // }
    }
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
  return (
    <Container>
      <h3>ผลการขอรับใบอนุญาต</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownOfferResult
              label="ผลการขอรับ"
              disabled={_.get(data, "offerType", null) ? false : true}
              type={"offerResult"}
              value={_.get(data, "offerResult", "")}
              showError={_.get(data, "offerResult", null) ? false : true}
              onClick={(e) =>
                setData({
                  ...data,
                  offerResult: _.get(e, "offerResult", ""),
                  offerResultName: _.get(e, "offerResultName", ""),
                })
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>เลขที่ใบอนุญาต</label>
            <Input
              readOnly={_.get(data, "offerResult", null) ? false : true}
              name="licenseNo"
              value={_.get(data, "licenseNo", "")}
              onChange={(e) =>
                setData({ ...data, licenseNo: e.target.value.substr(0, 10) })
              }
            />
          </FormGroup>
        </Col>
        {_.get(data, "licenseNo", null) ? (
          <>
            <Col>
              <FormGroup>
                <label className={styles.label}>วันที่ออกบัตร</label>
                <DatePickerThai
                  name="issueDate"
                  value={
                    _.get(data, "issueDate", null) &&
                    dayjs(new Date(data.issueDate))
                  }
                  onChange={(e) =>
                    setData({ ...data, issueDate: dayjs(new Date(e)) })
                  }
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label className={styles.label}>วันที่หมดอายุ</label>
                <Input
                  readOnly={true}
                  type="text"
                  name="expireDateE"
                  value={
                    _.get(data, "issueDate", null)
                      ? dayjs(new Date(data.issueDate))
                          .add(1, "year")
                          .subtract(1, "day")
                          .format("DD/MM/BBBB")
                      : ""
                  }
                />
              </FormGroup>
            </Col>
          </>
        ) : (
          <>
            <Col>
              <FormGroup>
                <label className={styles.label}>วันที่ออกบัตร</label>
                <Input readOnly={true} type="text" name="issueDate" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label className={styles.label}>วันที่หมดอายุ</label>
                <Input readOnly={true} type="text" name="expireDate" />
              </FormGroup>
            </Col>
          </>
        )}
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
                  <td>{item.detail}</td>
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
