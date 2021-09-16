import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
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
  SubmitButton,
  CancelButton,
} from "../../components/shared";
const SearchSalesDlg = (props) => {
  const [searchValue, setSearchValue] = useState({
    citizenID: "0-0000-000000-00-0",
  });
  const [searchItem, setSearchItem] = useState("citizenID");

  const onChange = (key, value) => {
    searchValue[key] = value;
    console.log(searchValue[key], "searchValue[key]");
    setSearchValue(searchValue);
    console.log(searchValue);
  };
  return (
    <Container>
      <Row>
        <Col sm={{ size: 2, offset: 2 }}>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="searchSele"
                value="citizenID"
                checked={searchItem === "citizenID"}
              />
              เลขบัตรประชาชน
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          {searchValue["citizenID"]}
          <InputCitizenID
            label=""
            onChange={(v) => onChange("citizenID", v)}
            value={searchValue["citizenID"]}
          />
        </Col>
      </Row>
      {/*  <Row>
        <Col sm={{ size: 2, offset: 2 }}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> โค้ดฝากค้ำ
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          <Input type="text" name="radio1" />
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 2, offset: 2 }}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> รหัสประจำตัว
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          <Input type="text" name="radio1" />
        </Col>
      </Row>
       <Row>
        <Col sm={{ size: 2, offset: 2 }}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> รหัสตำแหน่ง
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          <Input type="text" name="radio1" />
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 2, offset: 2 }}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> เลขที่ใบอนุญาต
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          <Input type="text" name="radio1" />
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 2, offset: 2 }}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> ชื่อ-นามสกุล
            </Label>
          </FormGroup>
        </Col>
        <Col sm="4">
          <Input type="text" name="radio1" />
        </Col>
      </Row> */}
      <CardBody style={{ textAlign: "right" }}>
        <SubmitButton
          // disabled={props.invalid || props.pristine || props.submitting}
          title="ค้นหา"
          onClick={() => alert(searchItem + searchValue[searchItem])}
        />{" "}
        <CancelButton title="ยกเลิก" onClick={() => console.log("dd")} />
      </CardBody>
    </Container>
  );
};

export default SearchSalesDlg;
