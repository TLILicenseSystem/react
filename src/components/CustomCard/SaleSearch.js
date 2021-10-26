import React, { useState, useRef } from "react";
import {
  Container,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
  CardBody,
} from "reactstrap";

import {
  InputCitizenID,
  InputPersonID,
  InputLicenseNo,
  SubmitButton,
  CancelButton,
  InputDepositCode,
  InputStrID,
} from "../shared";

export const SaleSearch = (props) => {
  const initivalSearch = {
    citizenID: "0-0000-000000-00-0",
    depositCode: "000",
    personID: "000-0000-0",
    licenseNo: "0000000000",
    strid: "",
    firstName: "",
    lastName: "",
  };
  const [searchValue, setSearchValue] = useState(initivalSearch);
  const [searchItem, setSearchItem] = useState("name");

  const formRef = useRef(null);

  const onChange = (key, value) => {
    searchValue[key] = value;
    setSearchValue(searchValue);
  };

  const onChangeSearchItem = (key) => {
    setSearchItem(key);
    setSearchValue(initivalSearch);
    formRef.current.reset();
  };

  const onClickCancel = () => {
    setSearchItem("name");
    setSearchValue(initivalSearch);
    formRef.current.reset();
  };
  return (
    <Container>
      <Container style={{ textAlign: "center" }}>
        <form style={{ textAlign: "left" }} ref={formRef}>
          <Row>
            <Col sm={{ size: 3, offset: 2 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="searchSele"
                    value="citizenID"
                    checked={searchItem === "citizenID"}
                    onChange={() => onChangeSearchItem("citizenID")}
                  />
                  เลขบัตรประชาชน
                </Label>
              </FormGroup>
            </Col>
            <Col sm="4">
              <InputCitizenID
                label=""
                disabled={searchItem !== "citizenID"}
                onChange={(v) => onChange("citizenID", v)}
                value={searchValue["citizenID"]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 3, offset: 2 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="searchSele"
                    value="depositCode"
                    checked={searchItem === "depositCode"}
                    onChange={() => onChangeSearchItem("depositCode")}
                  />
                  โค้ดฝากค้ำ
                </Label>
              </FormGroup>
            </Col>
            <Col sm="4">
              <InputDepositCode
                label=""
                disabled={searchItem !== "depositCode"}
                onChange={(v) => onChange("depositCode", v)}
                value={searchValue["depositCode"]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 3, offset: 2 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="searchSele"
                    value="personID"
                    checked={searchItem === "personID"}
                    onChange={() => onChangeSearchItem("personID")}
                  />{" "}
                  รหัสประจำตัว
                </Label>
              </FormGroup>
            </Col>
            <Col sm="4">
              <InputPersonID
                label=""
                disabled={searchItem !== "personID"}
                onChange={(v) => onChange("personID", v)}
                value={searchValue["personID"]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 3, offset: 2 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="searchSele"
                    value="strid"
                    checked={searchItem === "strid"}
                    onChange={() => onChangeSearchItem("strid")}
                  />{" "}
                  รหัสตำแหน่ง
                </Label>
              </FormGroup>
            </Col>
            <Col sm="4">
              <InputStrID
                label=""
                disabled={searchItem !== "strid"}
                onChange={(v) => onChange("strid", v)}
                value={searchValue["strid"]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 3, offset: 2 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="searchSele"
                    value="licenseNo"
                    checked={searchItem === "licenseNo"}
                    onChange={() => onChangeSearchItem("licenseNo")}
                  />{" "}
                  เลขที่ใบอนุญาต
                </Label>
              </FormGroup>
            </Col>
            <Col sm="4">
              <InputLicenseNo
                label=""
                disabled={searchItem !== "licenseNo"}
                onChange={(v) => onChange("licenseNo", v)}
                value={searchValue["licenseNo"]}
              />
            </Col>
          </Row>

          <Row>
            <Col sm={{ size: 3, offset: 2 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="searchSele"
                    value="name"
                    checked={searchItem === "name"}
                    onChange={() => onChangeSearchItem("name")}
                  />{" "}
                  ชื่อ-นามสกุล
                </Label>
              </FormGroup>
            </Col>
            <Col sm="4">
              <Row>
                <Col sm={6} md={6}>
                  <Input
                    type="text"
                    disabled={searchItem !== "name"}
                    onChange={(e) => onChange("firstName", e.target.value)}
                  />
                </Col>
                <Col sm={6} md={6}>
                  <Input
                    type="text"
                    disabled={searchItem !== "name"}
                    onChange={(e) => onChange("lastName", e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </Container>

      <CardBody style={{ textAlign: "right" }}>
        <SubmitButton
          // disabled={props.invalid || props.pristine || props.submitting}
          title="ค้นหา"
          onClick={() => props.onSearch(searchItem, searchValue)}
        />{" "}
        <CancelButton title="ยกเลิก" onClick={onClickCancel} />
      </CardBody>
    </Container>
  );
};
