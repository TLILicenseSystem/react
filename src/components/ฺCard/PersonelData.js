import React from "react";
import { Container, Col, Row, Input } from "reactstrap";

const DataItem = ({ title, value }) => {
  return (
    <Row style={{ marginBottom: "10px" }}>
      <Col sm="4">{title}</Col>
      <Col sm="8">
        <Input readOnly={true} value={value} />
      </Col>
    </Row>
  );
};
export const PersonelData = () => {
  return (
    <>
      <Row xs="1" sm="3">
        <Col>
          <DataItem title="ชื่อ-นามสกุล" value={"นายไทย ประกัน"} />
        </Col>
        <Col>
          <DataItem title="ตำแหน่ง" value={"D-1111111111-V ผู้บริหารศูนย์"} />
        </Col>
        <Col>
          <DataItem title="สาขา" value={"007 อโศก"} />
        </Col>
      </Row>
      <Row xs="1" sm="3">
        <Col>
          <DataItem title="รหัสประจำตัว" value={"111-11111"} />
        </Col>
        <Col>
          <DataItem title="เลขที่ฝากค้ำ" value={"1111-00111"} />
        </Col>
        <Col>
          <DataItem title="เลขบัตรประชาชน" value={"1-1111-25468-99-9"} />
        </Col>
      </Row>
      <Row xs="1" sm="3">
        <Col>
          <DataItem title="สถานะ" value={"N ปกติ แต่งตั้ง..."} />
        </Col>
        <Col>
          <DataItem title="เลขที่ใบอนุญาต" value={"xxxxxxxxxx"} />
        </Col>
        <Col>
          <DataItem title="วันที่หมดอายุ" value={"00/00/0000"} />
        </Col>
      </Row>
    </>
  );
};
