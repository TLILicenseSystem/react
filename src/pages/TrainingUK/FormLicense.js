import React, { useState, useEffect } from "react";
import { FormGroup, Container, Row, Col, Input } from "reactstrap";
import { DropdownOfferType, DatePickerThai } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import Swal from "sweetalert2";
import { get } from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormLicense = ({ currentLicense, expireDate, onChange }) => {
  const [data, setData] = useState(currentLicense);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    setData(currentLicense);
  }, [currentLicense]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  const onSelectOfferType = (value) => {
    const offerType = get(value, "offerType", null);
    const offerTypeName = get(value, "offerTypeName", "");
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
          text: "ใบอนุญาติยังไม่หมดอายุ ไม่สามารถเลือกขาดอายุได้",
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
      <h3>การขอรับใบอนุญาต</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownOfferType
              requiredField
              label="ประเภทการขอ"
              type={"offerTypeUL"}
              value={get(data, "offerType", "")}
              showError={get(data, "offerType", null) ? false : true}
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
                  get(data, "offerDate", null)
                    ? dayjs(new Date(data.offerDate)).format("DD/MM/BBBB")
                    : ""
                }
              />
            ) : (
              <DatePickerThai
                name="offerDate"
                value={
                  get(data, "offerDate", null)
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
                name="offerDate"
                value={
                  get(data, "offerDate", null)
                    ? dayjs(new Date(data.offerDate)).format("DD/MM/BBBB")
                    : ""
                }
              />
            ) : (
              <DatePickerThai
                name="offerDate"
                value={
                  get(data, "offerDate", null)
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
      </Row>
    </Container>
  );
};

export default FormLicense;
