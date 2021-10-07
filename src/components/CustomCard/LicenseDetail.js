import React from "react";
import { Col, Row, Input,Container,FormGroup } from "reactstrap";
import { get } from "lodash";
import PropTypes from "prop-types";
import moment  from "moment";


export const LicenseDetail = ({ title,data }) => {
    const Item = ({ title, value,size_k = 6,size_v = 6 }) => {
        return (
          <Row  >
            <Col sm={size_k}>{title}</Col>
            <Col sm={size_v} style={{ padding: "0" }}>
              {value}
            </Col>
          </Row>
        );
      };
    
  return (
    <>
      <h5>{title}</h5>
      <hr />
      <Row sm="4">
        <Item  title="ชื่อหลักสูตร" value="rrr"/>
        <Item  title="วันที่อบรม" value="rrr"/>
        <Item  title="สถานที่อบรม" value="rrr"/>
        <Item  title="ผลการอบรม" value="rrr"/>
      </Row>
      <Row sm="3">
        <Item  title="รวมชั่วโมงอบรม" value="rrr" size_k={7} size_v={4}/>
        <Item  title="ชั่วโมงอบรมตามหลักสูตร" value="rrr" size_k={7} size_v={4}/>
        <Item  title="วันที่อัพโหลผลการสอบ" value="rrr" size_k={7} size_v={4}/>
      </Row>
    </>
  );
};

LicenseDetail.defaultProps = {
    title:'ผลการอบรม',
  data: [],
};
LicenseDetail.propTypes = {
 string:PropTypes.string,
  data: PropTypes.array,
};
