import React from "react";
import { Container, Col, Row, Input } from "reactstrap";
import { get } from "lodash";
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
export const PersonelData = (data) => {
  return (
    <>
      <Row xs="1" sm="3">
        <Col>
          <DataItem title="ชื่อ-นามสกุล" value={get(data,"name","")} />
        </Col>
        <Col>
          <DataItem title="ตำแหน่ง"  value={get(data,"position","")} />
        </Col>
        <Col>
          <DataItem title="สาขา" value={get(data,"branchName","")}/>
        </Col>
      </Row>
      <Row xs="1" sm="3">
        <Col>
          <DataItem title="รหัสประจำตัว" value={get(data,"personID","")}  />
        </Col>
        <Col>
          <DataItem title="เลขที่ฝากค้ำ"  value={get(data,"depositNo","")} />
        </Col>
        <Col>
          <DataItem title="เลขบัตรประชาชน" value={get(data,"citizenID","")} />
        </Col>
      </Row>
      <Row xs="1" sm="3">
        <Col>
          <DataItem title="สถานะ" value={get(data,"statusName","")} />
        </Col>
        <Col>
          <DataItem title="เลขที่ใบอนุญาต" value={get(data,"licenseNo","")} />
        </Col>
        <Col>
          <DataItem title="วันที่หมดอายุ" value={get(data,"licenseNo","")} />
        </Col>
      </Row>
    </>
  );
};
