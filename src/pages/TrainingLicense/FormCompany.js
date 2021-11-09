import React, { useState, useEffect } from "react";
import { FormGroup, Label, Container, Row, Col, Input } from "reactstrap";
import {
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
    const offerType = _.get(currentLicense, "offerType", null);
    if (offerType === "3") {
      //{ offerType: "3", offerTypeName: "เปลี่ยนบริษัท" }
      setReadOnly(false);
    } else {
      setData(null);
      setReadOnly(true);
    }
    checkRequired(currentLicense);
  }, [currentLicense]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  const checkRequired = (currentLicense) => {
    if (currentLicense) {
      if (currentLicense.moveCompany) {
        currentLicense["moveCompany"]["issueDate"] = _.get(
          currentLicense.moveCompany,
          "issueDate",
          new Date()
        );
        currentLicense["moveCompany"]["expireDate"] = _.get(
          currentLicense.moveCompany,
          "expireDate",
          new Date()
        );

        if (currentLicense.moveCompany.licenseNo) {
          if (
            dayjs(new Date()).format("YYYY-MM-DD") <=
            dayjs(
              new Date(_.get(currentLicense.moveCompany, "expireDate", null))
            ).format("YYYY-MM-DD")
          ) {
            setRequired(true);
            currentLicense["moveCompany"]["artype"] = _.get(
              currentLicense.moveCompany,
              "artype",
              null
            );
            currentLicense["moveCompany"]["ardate"] = _.get(
              currentLicense.moveCompany,
              "ardate",
              new Date()
            );
          } else {
            setRequired(false);
            currentLicense["moveCompany"]["ardate"] = null;
            currentLicense["moveCompany"]["artype"] = null;
          }
        } else {
          setRequired(false);
          currentLicense["moveCompany"]["ardate"] = null;
          currentLicense["moveCompany"]["artype"] = null;
        }
      } else {
        currentLicense["moveCompany"] = null;
        setRequired(false);
      }
    } else {
      setRequired(false);
    }
    setData(currentLicense);
  };

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
                      .replace(/[^0-9]/g, ""),
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
                  mindate={
                    _.get(data && data.moveCompany, "expireDate", null)
                      ? dayjs(new Date(data.moveCompany.expireDate))
                      : dayjs(new Date())
                  }
                  value={
                    _.get(data && data.moveCompany, "issueDate", null)
                      ? dayjs(new Date(data.moveCompany.issueDate))
                      : dayjs(new Date())
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
                    _.get(data && data.moveCompany, "expireDate", null)
                      ? dayjs(new Date(data.moveCompany.expireDate))
                      : dayjs(new Date())
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
              disabled={readOnly || !required}
              isClearable={true}
              showError={
                required
                  ? _.get(data && data.moveCompany, "artype")
                    ? false
                    : true
                  : false
              }
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
            {readOnly ? (
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
            ) : required ? (
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
