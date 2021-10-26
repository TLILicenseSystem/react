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
  DropdownCompany,
  DropdownCompanyType,
} from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import { get } from "lodash";

const FormCompany = ({ currentLicense, expireDate, onChange }) => {
  const [data, setData] = useState(currentLicense);
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    setData(currentLicense);
    const offerType = get(currentLicense, "offerType", null);

    if (offerType === "3") {
      //{ offerType: "3", offerTypeName: "เปลี่ยนบริษัท" }
      setReadOnly(false);
    }
  }, [currentLicense]);

  useEffect(() => {
    onChange(data);
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
              value={get(data, "companyCode", "")}
              onClick={(e) =>
                setData({
                  ...data,
                  companyCode: get(e, "companyCode", ""),
                  companyName: get(e, "companyName", ""),
                })
              }
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>เลขที่ใบอนุญาต</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ออกบัตร</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่หมดอายุ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
      </Row>
      <Row sm="4">
        <Col>
          <FormGroup style={{ paddingTop: "10px" }}>
            <DropdownCompanyType
              label="ประเภท"
              disabled={true}
              isClearable={true}
              onClick={(e) => console.log(get(e, "companyCode", ""))}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FormCompany;
