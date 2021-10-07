import React from "react";
import { Col, Row, Input, Container, FormGroup } from "reactstrap";
import { get } from "lodash";
import PropTypes from "prop-types";
import moment from "moment";

export const LicenseDetail = ({ title, data }) => {
  const Item = ({ title, value, size_k = 6, size_v = 6 }) => {
    return (
      <Row>
        <Col sm={size_k}>{title}</Col>
        <Col sm={size_v}>{value}</Col>
      </Row>
    );
  };

  return (
    <>
      <h5>{title}</h5>
      <hr />
      <Row sm="4">
        <Item title="ชื่อหลักสูตร" value="rrr" size_k={7} size_v={5} />
        <Item title="วันที่อบรม" value="rrr" size_k={7} size_v={5} />
        <Item title="สถานที่อบรม" value="rrr" size_k={7} size_v={5} />
        <Item title="ผลการอบรม" value="rrr" size_k={7} size_v={5} />
      </Row>
      <Row sm="3">
        <Row>
          <Col sm="5">รวมชั่วโมงอบรม</Col>
          <Col style={{ textAlign: "right" }}>3</Col>
          <Col sm="3" style={{ textAlign: "right" }}>
            ชั่วโมง
          </Col>
        </Row>
        <Row>
          <Col sm="7">ชั่วโมงอบรมตามหลักสูตร</Col>
          <Col sm="5">6 ชั่วโมง</Col>
        </Row>

        <Item
          title="วันที่อัพโหลผลการสอบ"
          value="00/00/0000"
          size_k={7}
          size_v={5}
        />
      </Row>
    </>
  );
};

LicenseDetail.defaultProps = {
  title: "ผลการอบรม",
  data: [],
};
LicenseDetail.propTypes = {
  string: PropTypes.string,
  data: PropTypes.array,
};
