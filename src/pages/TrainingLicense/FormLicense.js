import React, { useState, useEffect } from "react";
import { FormGroup, Container, Row, Col, Input } from "reactstrap";
import { DropdownOfferType, DatePickerThai } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";
import { searchBlacklist } from "../../api/apiBlacklist";
import { get } from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormLicense = ({ currentLicense, expireDate, onChange }) => {
  const [blacklist, setBlacklist] = useState(false);
  const [data, setData] = useState(currentLicense);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(currentLicense);
    // if(currentLicense){
    //   if(currentLicense.offerType === "1") setReadOnly(false)
    //   else setReadOnly(true)
    // }
  }, [currentLicense]);

  useEffect(() => {
    setBlacklist(blacklist);
  }, [blacklist]);

  useEffect(() => {
    onChange(data);
  }, [data]);

  const fetchData = async () => {
    if (data && data.citizenId) {
      const response = await searchBlacklist("C", data.citizenId);
      const responseData = get(response, "data", []);
      if (responseData.responseRecord.dataList.length > 0) {
        setBlacklist(true);
      } else setBlacklist(false);
    }
  };

  const onSelectOfferType = (value) => {
    const offerType = get(value, "offerType", null);
    const offerTypeName = get(value, "offerTypeName", "");
    if (offerType === "4" || offerType === "6") {
      //  { offerType: "4", offerTypeName: "ต่ออายุ" }
      //  { offerType: "6", offerTypeName: "ต่ออายุพร้อมขอใบแทน" }
      if (checkConditionExpireDate()) return;
    } else if (offerType === "2") {
      if (checkExpired()) return;
      // { offerType: "2", offerTypeName: "ขาดอายุ" }
    } else if (offerType === "3") {
      //{ offerType: "3", offerTypeName: "เปลี่ยนบริษัท" }
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
              type={"offerType"}
              value={get(data, "offerType", "")}
              showError={get(data, "offerType", null) ? false : true}
              onClick={(e) => onSelectOfferType(e)}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ยื่น คปภ.</label>
            {readOnly ? (
              <Input
                readOnly={readOnly}
                type="text"
                name="offerDate"
                value={
                  get(data, "offerDate", null)
                    ? dayjs(new Date(data.offerDate)).format("DD/MM/BBBB")
                    : dayjs(new Date())
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
            <label className={styles.label}>
              ส่ง สนญ.ตามหนังสือที่{" "}
              <label className={styles.required}> *</label>
            </label>
            <Input
              readOnly={readOnly}
              type="text"
              name="bookNo"
              value={get(data, "bookNo", "")}
              invalid={get(data, "bookNo", null) ? false : true}
              onChange={(e) =>
                setData({ ...data, bookNo: e.target.value.substr(0, 6) })
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>ลง วันที่</label>
            {readOnly ? (
              <Input
                readOnly={readOnly}
                type="text"
                name="bookDate"
                value={
                  get(data, "bookDate", null)
                    ? dayjs(new Date(data.offerDate)).format("DD/MM/BBBB")
                    : dayjs(new Date())
                }
              />
            ) : (
              <DatePickerThai
                name="bookDate"
                value={
                  get(data, "bookDate", null)
                    ? dayjs(new Date(data.bookDate))
                    : dayjs(new Date())
                }
                onChange={(e) =>
                  setData({ ...data, bookDate: dayjs(new Date(e)) })
                }
              />
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>ครั้งที่ต่ออายุ</label>
            <Input
              readOnly={true}
              type="text"
              name="licenseTimes"
              value={get(data, "licenseTimes", "")}
            />
          </FormGroup>
        </Col>
        <Col style={{ marginTop: "auto" }}>
          {blacklist && (
            <p style={{ color: "red", fontWeight: "bold" }}> Blacklist </p>
          )}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FormLicense;
