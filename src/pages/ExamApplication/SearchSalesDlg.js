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
} from "reactstrap";

import { InputCitizenID, InputPersonID } from "../../components/shared";
const SearchSalesDlg = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <Row>
        <Col sm={{ size: 2, offset: 2 }}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" /> เลขบัตรประชาชน
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
      </Row>
      {/* <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            More Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
              <InputCitizenID />
              <InputPersonID />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>Tab 2 Contents</h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent> */}
    </Container>
  );
};

export default SearchSalesDlg;
