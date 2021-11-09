import React, { useState, useEffect } from "react";
import { FormGroup, Container, Row, Col, Input } from "reactstrap";
import { DropdownOfferType, DatePickerThai } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import Swal from "sweetalert2";
import { get } from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormLicense = ({
  TrainingDetail,
  currentLicense,
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
    const offerType = get(value, "offerType", null);
    const offerTypeName = get(value, "offerTypeName", "");

    if (offerType === "1") {
      //  { offerType: "1", offerTypeName: "ขึ้นใหม่ทะเบียน UL" }
      if (!expireDate) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่พบข้อมูลเลขที่ใบอนุญาตหลัก",
        });
        return;
      } // ตรวจสอบสถานะ ใบอนุญาตตัวแทนประกันชีวิต 10 หลัก ไม่หมดอายุ ที่ระบบ TL License
      // เช็คประเภทการขอใบอนุญาตหลัก ว่าถ้าเป็นประเภท  ขอใหม่ และ ขอเปลี่ยนบริษัท
      if (
        TrainingDetail &&
        (TrainingDetail.offerType === "1" || TrainingDetail.offerType === "3")
      ) {
        // มีอายุการใช้งาน 6 เดือน(เช็คจาก issuedate ของ license หลัก >=6เดือน)
        let issueDate = dayjs(new Date(TrainingDetail.issueDate))
          .add(6, "month")
          .format("YYYY-MM-DD");
        let today = dayjs(new Date()).format("YYYY-MM-DD");
        if (issueDate > today) {
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถขึ้นใหม่ทะเบียน UL ได้ ",
            text: `เนื่องจากใบอนุญาตหลักมีอายุการใช้งานไม่ถึง 6 เดือน`,
          });
          return;
        }
      } else {
        if (checkExpired()) return;
      }
    } else if (offerType === "2") {
      // { offerType: "2", offerTypeName: "ขาดทะเบียน UL" }
      if (!expireDate) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่พบข้อมูลเลขที่ใบอนุญาตหลัก",
        });
        return true;
      }
      let date = dayjs(new Date(expireDate)).format("YYYY-MM-DD");
      let today = dayjs(new Date()).format("YYYY-MM-DD");
      if (today <= date) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ใบอนุญาตยังไม่หมดอายุ ไม่สามารถเลือกขาดทะเบียน UL ได้",
        });
        return true;
      }
    } else if (offerType) {
      if (checkExpired()) return;
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
        text: "ไม่พบข้อมูลเลขที่ใบอนุญาตหลัก",
      });
      return true;
    } else {
      let date = dayjs(new Date(expireDate)).format("YYYY-MM-DD");
      let today = dayjs(new Date()).format("YYYY-MM-DD");
      if (today > date) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ใบอนุญาตหมดอายุแล้ว โปรดเลือกขาดทะเบียน UL เท่านั้น",
        });
        return true;
      }
    }
    return false;
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
                canNull
                value={
                  get(data, "offerDate", null)
                    ? dayjs(new Date(data.offerDate))
                    : null
                }
                onChange={(e) =>
                  setData({ ...data, offerDate: e ? dayjs(new Date(e)) : null })
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
                  get(data, "reciveDate", null)
                    ? dayjs(new Date(data.reciveDate)).format("DD/MM/BBBB")
                    : ""
                }
              />
            ) : (
              <DatePickerThai
                name="reciveDate"
                canNull
                value={
                  get(data, "reciveDate", null)
                    ? dayjs(new Date(data.offerDate))
                    : null
                }
                onChange={(e) =>
                  setData({
                    ...data,
                    reciveDate: e ? dayjs(new Date(e)) : null,
                  })
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
