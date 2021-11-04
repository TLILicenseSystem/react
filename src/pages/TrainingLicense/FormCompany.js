import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import {
  AddButton,
  DatePickerThai,
  DropdownCompany,
  DropdownCompanyType,
} from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import _ from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormCompany = ({ currentLicense, expireDate, onChange }) => {
  const [data, setData] = useState(currentLicense);
  const [readOnly, setReadOnly] = useState(true);
  const [required, setRequired] = useState(false);

  // useEffect(() => {
  //   if (expireDate && !readOnly) {
  //     if (
  //       dayjs(new Date(expireDate)).format("YYYY-MM-DD") <
  //       dayjs(new Date()).format("YYYY-MM-DD")
  //     )
  //       setRequired(true);
  //   }
  // }, [expireDate]);

  useEffect(() => {
    setData(currentLicense);
    const offerType = _.get(currentLicense, "offerType", null);
    if (offerType === "3") {
      //{ offerType: "3", offerTypeName: "เปลี่ยนบริษัท" }
      setReadOnly(false);
      const expireDate = _.get(
        currentLicense && currentLicense.moveCompany,
        "expireDate",
        null
      );
    }
  }, [currentLicense]);

  useEffect(() => {
    onChange(data);
    if (
      data &&
      dayjs(new Date()).format("YYYY-MM-DD") >
        dayjs(
          new Date(_.get(data && data.moveCompany, "expireDate", null))
        ).format("YYYY-MM-DD")
    ) {
      setRequired(true);
    } else setRequired(false);
  }, [data]);

  return (
    <Container>
      <h3>บริษัทเดิม</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownCompany
              label="บริษัท"
              disabled={readOnly}
              isClearable={true}
              value={_.get(data && data.moveCompany, "companyCode", "")}
              onClick={(e) =>
                setData({
                  ...data,
                  moveCompany: e,
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
              value={_.get(data && data.moveCompany, "licenseNo", "")}
              onChange={(e) =>
                setData({
                  ...data,
                  moveCompany: {
                    ...data.moveCompany,
                    licenseNo: e.target.value
                      .substr(0, 10)
                      .replace(/[^\d]/, ""),
                  },
                })
              }
            />
          </FormGroup>
        </Col>
        {readOnly ? (
          <>
            <Col>
              <FormGroup>
                <label className={styles.label}>วันที่ออกบัตร</label>
                <Input
                  readOnly={true}
                  type="text"
                  name="issueDate"
                  value={
                    _.get(data && data.moveCompany, "issueDate", null) &&
                    dayjs(new Date(data.moveCompany.issueDate)).format(
                      "DD/MM/BBBB"
                    )
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
                  name="expireDate"
                  value={
                    _.get(data && data.moveCompany, "expireDate", null) &&
                    dayjs(new Date(data.moveCompany.expireDate)).format(
                      "DD/MM/BBBB"
                    )
                  }
                />
              </FormGroup>
            </Col>
          </>
        ) : _.get(data && data.moveCompany, "licenseNo", null) ? (
          <>
            <Col>
              <FormGroup>
                <label className={styles.label}>วันที่ออกบัตร</label>
                <DatePickerThai
                  name="issueDate"
                  value={
                    _.get(data && data.moveCompany, "issueDate", null) &&
                    dayjs(new Date(data.moveCompany.issueDate))
                  }
                  onChange={(e) =>
                    setData({
                      ...data,
                      moveCompany: {
                        ...data.moveCompany,
                        issueDate: dayjs(new Date(e)),
                      },
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <label className={styles.label}>วันที่หมดอายุ</label>

                <DatePickerThai
                  name="expireDate"
                  value={
                    _.get(data && data.moveCompany, "expireDate", null) &&
                    dayjs(new Date(data.moveCompany.expireDate))
                  }
                  onChange={(e) =>
                    setData({
                      ...data,
                      moveCompany: {
                        ...data.moveCompany,
                        expireDate: dayjs(new Date(e)),
                      },
                    })
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
            <DropdownCompanyType
              label="ประเภท"
              requiredField={required}
              disabled={!required}
              isClearable={true}
              value={_.get(data && data.moveCompany, "artype", "")}
              onClick={(e) =>
                setData({
                  ...data,
                  moveCompany: {
                    ...data.moveCompany,
                    artype: _.get(e, "value", ""),
                  },
                })
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}> วันที่&nbsp;</label>
            {required && <label className={styles.required}> *</label>}
            {required ? (
              <DatePickerThai
                name="ardate"
                value={
                  _.get(data && data.moveCompany, "ardate", null)
                    ? dayjs(new Date(data.moveCompany.ardate))
                    : dayjs(new Date())
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    moveCompany: {
                      ...data.moveCompany,
                      ardate: dayjs(new Date(e)),
                    },
                  })
                }
              />
            ) : (
              <Input
                readOnly={true}
                name="dis"
                value={
                  _.get(data && data.moveCompany, "ardate", null)
                    ? dayjs(new Date(data.moveCompany.ardate)).format(
                        "DD/MM/BBBB"
                      )
                    : ""
                }
              />
            )}
          </FormGroup>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FormCompany;
