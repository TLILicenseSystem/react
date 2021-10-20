import React, { useState ,useRef} from "react";
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
  InputEmployeeID,
  InputLicenseNo,
  SubmitButton,
  CancelButton
} from "../shared";

export const EmployeeSearch = (props) => {
  const initivalSearch = {
    citizenID: "0-0000-000000-00-0",
    depositCode: "000",
    employeeID: "000-0000",
    licenseNo: "0000000000",
    strid: "",
    firstName: "",
    lastName: "",
  };
  const [searchValue, setSearchValue] = useState(initivalSearch);
  const [searchItem, setSearchItem] = useState("name");

  const formRef = useRef(null)

  const onChange = (key, value) => {
    searchValue[key] = value;
    setSearchValue(searchValue);
  };
  
  const onClickCancel = () => {
    setSearchItem("name");
    setSearchValue(initivalSearch)
    formRef.current.reset();
  }
  return (
    <Container>
      <Container style={{ textAlign: "center" }}>
        <form style={{textAlign:'left'}} ref={formRef}>
        <Row>
              <Col sm={{ size: 3, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="searchSele"
                      value="citizenID"
                      checked={searchItem === "citizenID"}
                      onChange={() => setSearchItem("citizenID")}
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
                      value="employeeID"
                      checked={searchItem === "employeeID"}
                      onChange={() => setSearchItem("employeeID")}
                    />{" "}
                    รหัสประจำตัว
                  </Label>
                </FormGroup>
              </Col>
              <Col sm="4">
                <InputEmployeeID
                  label=""
                  disabled={searchItem !== "employeeID"}
                  onChange={(v) => onChange("employeeID", v)}
                  value={searchValue["employeeID"]}
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
                      onChange={() => setSearchItem("licenseNo")}
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
                      onChange={() => setSearchItem("name")}
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
        <CancelButton
          title="ยกเลิก"
         onClick={onClickCancel}
        />
      </CardBody>
    </Container>
  );
};
