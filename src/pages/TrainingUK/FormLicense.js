import React, { useState, useEffect } from "react";
import { FormGroup, Container, Row, Col, Input } from "reactstrap";
import { DropdownOfferType, DatePickerThai } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import Swal from "sweetalert2";
import _ from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormLicense = ({
  currentLicense,
  licenseDetail,
  expireDate,
  onChange,
}) => {
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
      <h3>คปภ</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>เลขที่ใบอนุญาต</label>
            <Input
              readOnly={true}
              name="licenseNo"
              value={_.get(licenseDetail, "licenseNo", "")}
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
                _.get(licenseDetail, "expireDate", null)
                  ? dayjs(new Date(licenseDetail.expireDate)).format(
                      "DD/MM/BBBB"
                    )
                  : ""
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ได้รับความเห็นชอบ</label>
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
        <Col></Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownOfferType
              requiredField
              label="ประเภทการขอ"
              type={"offerTypeUK"}
              value={_.get(data, "offerType", "")}
              showError={_.get(data, "offerType", null) ? false : true}
              onClick={(e) => onSelectOfferType(e)}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ คปภ. อนุมัติ</label>
            {readOnly ? (
              <Input
                readOnly={readOnly}
                type="text"
                name="offerDate"
                value={
                  _.get(data, "offerDate", null)
                    ? dayjs(new Date(data.offerDate)).format("DD/MM/BBBB")
                    : ""
                }
              />
            ) : (
              <DatePickerThai
                name="offerDate"
                value={
                  _.get(data, "offerDate", null)
                    ? dayjs(new Date(data.offerDate))
                    : dayjs(new Date())
                }
                onChange={(e) =>
                  setData({ ...data, offerDate: dayjs(new Date(e)) })
                }
              />
            )}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ได้รับแบบฟอร์ม</label>
            {readOnly ? (
              <Input
                readOnly={readOnly}
                type="text"
                name="reciveDate"
                value={
                  _.get(data, "reciveDate", null)
                    ? dayjs(new Date(data.reciveDate)).format("DD/MM/BBBB")
                    : ""
                }
              />
            ) : (
              <DatePickerThai
                name="reciveDate"
                value={
                  _.get(data, "reciveDate", null)
                    ? dayjs(new Date(data.reciveDate))
                    : dayjs(new Date())
                }
                onChange={(e) =>
                  setData({ ...data, reciveDate: dayjs(new Date(e)) })
                }
              />
            )}
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLicense;
