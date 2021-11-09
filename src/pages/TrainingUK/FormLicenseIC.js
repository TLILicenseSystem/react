import React, { useState, useEffect } from "react";
import { FormGroup, Container, Row, Col, Input } from "reactstrap";
import {
  DropdownOfferType,
  DatePickerThai,
  DropdownAgreeType,
} from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import Swal from "sweetalert2";
import _ from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormLicenseIC = ({ currentLicense, expireDate, onChange }) => {
  const [data, setData] = useState(currentLicense);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    setData(currentLicense);
  }, [currentLicense]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  const onSelectOfferType = (value) => {
    const offerType = _.get(value, "offerType", null);
    const offerTypeName = _.get(value, "offerTypeName", "");
    //     if (checkConditionExpireDate()) return;
    // if (checkExpired()) return;
    if (offerType === "1") {
      //  { offerType: "1", offerTypeName: "ขึ้นใหม่ทะเบียน UL" }
    } else if (offerType === "2") {
      // { offerType: "2", offerTypeName: "ขาดทะเบียน UL" }
    } else if (offerType === "3") {
      //  { offerType: "3", offerTypeName: "ต่อทะเบียน UL" }
    } else if (offerType === "4") {
      //  { offerType: "4", offerTypeName: "ยกเลิกทะเบียน UL" }
    } else {
    }
    setData({
      ...data,
      offerType: offerType,
      offerTypeName: offerTypeName,
    });
  };
  const checkExpired = () => {
    if (!expireDate) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่พบข้อมูลเลขที่ใบอนุญาต",
      });
      return true;
    } else {
      let date = dayjs(new Date(expireDate)).format("YYYY-MM-DD");
      let today = dayjs(new Date()).format("YYYY-MM-DD");
      if (today <= date) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ใบอนุญาตยังไม่หมดอายุ ไม่สามารถเลือกขาดอายุได้",
        });
        return true;
      }
    }
    return false;
  };

  const checkConditionExpireDate = () => {
    if (!expireDate) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่พบข้อมูลเลขที่ใบอนุญาต",
      });
      return true;
    } else {
      let minData = dayjs(new Date(expireDate))
        .subtract(61, "day")
        .format("YYYY-MM-DD");
      let today = dayjs(new Date()).format("YYYY-MM-DD");
      if (today <= minData) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: `สามารถต่ออายุได้ตั้งแต่ ${dayjs(minData).format(
            "DD/MM/BBBB"
          )} ถึง ${dayjs(new Date()).format("DD/MM/BBBB")}`,
        });
        return true;
      } else return false;
    }
  };

  return (
    <Container>
      <h3>กลต</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>เลขที่ใบอนุญาต</label>
            <Input
              name="licenseNo"
              value={_.get(data, "licenseNo", "")}
              invalid={_.get(data, "licenseNo", null) ? false : true}
              onChange={(e) =>
                setData({
                  ...data,
                  licenseNo: e.target.value
                    .substr(0, 10)
                    .replace(/[^0-9]/g, ""),
                })
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่หมดอายุ</label>
            <label className={styles.required}>&nbsp;*</label>
            <DatePickerThai
              name="expireDate"
              requiredField
              value={
                _.get(data, "expireDate", null)
                  ? dayjs(new Date(data.expireDate))
                  : dayjs(new Date())
              }
              onChange={(e) =>
                setData({ ...data, expireDate: dayjs(new Date(e)) })
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ได้รับความเห็นชอบ</label>
            <label className={styles.required}>&nbsp;*</label>
            <DatePickerThai
              name="agreeDate"
              requiredField
              value={
                _.get(data, "agreeDate", null)
                  ? dayjs(new Date(data.agreeDate))
                  : dayjs(new Date())
              }
              onChange={(e) =>
                setData({ ...data, agreeDate: dayjs(new Date(e)) })
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownAgreeType
              requiredField
              label="ประเภทที่ได้รับความเห็นชอบ"
              type={"agreeType"}
              value={_.get(data, "agreeType", "")}
              showError={_.get(data, "agreeType", null) ? false : true}
              onClick={(e) =>
                setData({ ...data, agreeType: _.get(e, "agreeType", null) })
              }
            />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownOfferType
              requiredField
              label="ประเภทการขอ"
              type={"offerTypeIC"}
              value={_.get(data, "offerType", "")}
              showError={_.get(data, "offerType", null) ? false : true}
              onClick={(e) => onSelectOfferType(e)}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ คปภ. อนุมัติ </label>
            <label className={styles.required}>&nbsp;*</label>
            {readOnly ? (
              <Input
                readOnly={readOnly}
                type="text"
                name="approveDate"
                value={
                  _.get(data, "approveDate", null)
                    ? dayjs(new Date(data.offerDate)).format("DD/MM/BBBB")
                    : ""
                }
              />
            ) : (
              <DatePickerThai
                name="approveDate"
                value={
                  _.get(data, "approveDate", null)
                    ? dayjs(new Date(data.approveDate))
                    : dayjs(new Date())
                }
                onChange={(e) =>
                  setData({ ...data, approveDate: dayjs(new Date(e)) })
                }
              />
            )}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ได้รับแบบฟอร์ม</label>
            <label className={styles.required}>&nbsp;*</label>

            {readOnly ? (
              <Input
                readOnly={readOnly}
                type="text"
                name="receiveDate"
                value={
                  _.get(data, "receiveDate", null)
                    ? dayjs(new Date(data.receiveDate)).format("DD/MM/BBBB")
                    : ""
                }
              />
            ) : (
              <DatePickerThai
                name="receiveDate"
                value={
                  _.get(data, "receiveDate", null)
                    ? dayjs(new Date(data.receiveDate))
                    : dayjs(new Date())
                }
                onChange={(e) =>
                  setData({ ...data, receiveDate: dayjs(new Date(e)) })
                }
              />
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row sm="1">
        <Col sm="9">
          <FormGroup>
            <label className={styles.label}>หมายเหตุ</label>
            <Input
              type="text"
              name="remark"
              value={_.get(data, "remark", "")}
              onChange={(e) =>
                setData({
                  ...data,
                  remark: e.target.value,
                })
              }
            />
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLicenseIC;
