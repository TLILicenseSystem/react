import React, { useState, useEffect } from "react";
import { FormGroup, Container, Row, Col, Input } from "reactstrap";
import { DropdownOfferType, DatePickerThai } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import { searchBlacklist } from "../../api/apiBlacklist";
import { get } from "lodash";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormLicense = ({ currentLicense, onChange }) => {
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

  return (
    <Container>
      <h3>การขอรับใบอนุญาต</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownOfferType
              label="ประเภทการขอ"
              type={"offerType"}
              value={get(data, "offerType", "")}
              onClick={(e) =>
                setData({
                  ...data,
                  offerType: get(e, "offerType", ""),
                  offerTypeName: get(e, "offerTypeName", ""),
                })
              }
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
                  get(data, "offerDate", null) &&
                  dayjs(new Date(data.offerDate)).format("DD/MM/BBBB")
                }
              />
            ) : (
              <DatePickerThai
                name="offerDate"
                value={
                  get(data, "offerDate", null) &&
                  dayjs(new Date(data.offerDate))
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
            <label className={styles.label}>ส่ง สนญ.ตามหนังสือที่</label>
            <Input
              readOnly={readOnly}
              type="text"
              name="bookNo"
              value={get(data, "bookNo", "")}
              onChange={(e) => setData({ ...data, bookNo: e.target.value })}
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
                  get(data, "bookDate", null) &&
                  dayjs(new Date(data.offerDate)).format("DD/MM/BBBB")
                }
              />
            ) : (
              <DatePickerThai
                name="bookDate"
                value={
                  get(data, "bookDate", null) && dayjs(new Date(data.bookDate))
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
