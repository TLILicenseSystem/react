import React from "react";
import { Col, Row, Input } from "reactstrap";
import { get } from "lodash";
import PropTypes from "prop-types";

export const StructData = ({ data }) => {
  const Item = ({ title, value }) => {
    return (
      <Row style={{ marginBottom: "0" }}>
        <Col sm="4">{title}</Col>
        <Col sm="8" style={{ padding: "0" }}>
          <Input
            style={{ marginBottom: "20px" }}
            readOnly={true}
            value={value}
          />
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Row>
        <Col xs="12" sm="5">
          <Item title="สาย" value="" />
        </Col>
        <Col xs="12" sm="5">
          <Item title="ชื่อ-สกุล" value="" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="5">
          <Item title="ฝ่าย" value="" />
        </Col>
        <Col xs="12" sm="5">
          <Item title="ชื่อ-สกุล" value="" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="5">
          <Item title="ขึ้นตรงฝ่าย" value="" />
        </Col>
        <Col xs="12" sm="5">
          <Item title="ชื่อ-สกุล" value="" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="5">
          <Item title="ภาค" value="" />
        </Col>
        <Col xs="12" sm="5">
          <Item title="ชื่อ-สกุล" value="" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="5">
          <Item title="ศูนย์" value="" />
        </Col>
        <Col xs="12" sm="5">
          <Item title="ชื่อ-สกุล" value="" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="5">
          <Item title="สาขา" value="" />
        </Col>
        <Col xs="12" sm="5"></Col>
      </Row>
    </>
  );
};

StructData.defaultProps = {
  data: [],
};
StructData.propTypes = {
  data: PropTypes.array,
};
