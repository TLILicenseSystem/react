import React, { useState, useEffect } from "react";
import { FormGroup, Container, Row, Col, Input, Table } from "reactstrap";
import {
  DropdownOfferResult,
  DropdownCause,
  DatePickerThai,
  InputLicenseNo,
  SubmitButton,
} from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import { colors } from "../../themes/style";
import { get } from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormResult = ({ currentLicense, onChange }) => {
  const [data, setData] = useState(currentLicense);
  const [readOnly, setReadOnly] = useState(false);
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
    }
  }, [currentLicense]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  const onSelectCause = () => {
    if (lesson) {
      let find = cause.find((item) => lesson.causeId === item.lesson);
      if (find) console.log("find", find, cause);
    }
    console.log("find", cause);
    cause.push({ ...lesson });
    setCause(cause);
    setData({ ...data, disapprovePerson: cause });
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
              disabled={readOnly}
              type={"offerResult"}
              value={get(data, "offerResult", "")}
              onClick={(e) =>
                setData({
                  ...data,
                  offerResult: get(e, "offerResult", ""),
                  offerResultName: get(e, "offerResultName", ""),
                })
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>เลขที่ใบอนุญาต</label>
            <Input
              readOnly={readOnly}
              name="licenseNo"
              value={get(data, "licenseNo", null)}
              onChange={(e) => setData({ ...data, licenseNo: e.target.value })}
            />
            {/* <InputLicenseNo readOnly={readOnly} name="licenseNo"    value={get(data,"licenseNo",null)} onChange={(e) => setData({...data,"licenseNo": e}) }/> */}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ออกบัตร</label>
            {readOnly ? (
              <Input
                readOnly={readOnly}
                type="text"
                name="issueDate"
                value={
                  get(data, "issueDate", null) &&
                  dayjs(new Date(data.issueDate)).format("DD/MM/BBBB")
                }
              />
            ) : (
              <DatePickerThai
                name="issueDate"
                value={
                  get(data, "issueDate", null) &&
                  dayjs(new Date(data.issueDate))
                }
                onChange={(e) =>
                  setData({ ...data, issueDate: dayjs(new Date(e)) })
                }
              />
            )}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่หมดอายุ</label>
            {/* expireDate */}
            <Input
              readOnly={true}
              type="text"
              name="expireDate"
              value={
                get(data, "issueDate", null) &&
                dayjs(new Date(data.issueDate))
                  .add(1, "year")
                  .subtract(1, "day")
                  .format("DD/MM/BBBB")
              }
              onChange={(e) =>
                setData({
                  ...data,
                  expireDate: dayjs(new Date(data.issueDate))
                    .add(1, "year")
                    .subtract(1, "day"),
                })
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
              disabled={get(data, "offerResult", null) === "3" ? false : true}
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
        <Col sm="8">
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
                  <th>{index + 1}</th>
                  <th>{item.detail}</th>
                  <th>delete</th>
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
