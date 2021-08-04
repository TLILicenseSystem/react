import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, Row, Col } from "reactstrap";

const Container = styled.div`
  background-color: ${({ color }) => color};
  padding: 10px;
  margin: 10px;
  //  border-radius: 0px;
  flex: 1;
  border: 1px solid;
  font-size: 15px;
  // h5, h1, p {
  //     text-align: center;
  //     margin: 0px;
  //     color: #fffff;
  // }

  // h1 {
  //     font-size: 30px;
  // }

  // p {
  //     font-size: 20px;
  // }
`;

const Head = styled.div`
  background-color: #ced2d8;
  padding: 10px;
  margin: 10px;
  flex: 1;
  border: 1px solid;
  font-size: 15px;
`;
const BoxSchedule = ({
  color,
  lLocationID,
  lOrg,
  lProvince,
  lType,
  lLocation,
  InLocationID,
  InOrg,
  InProvince,
  InProvinceName,
  InType,
  InLocation,
  wLocationID,
  wOrg,
  wProvince,
  wProvinceName,
  wType,
  wLocation,
  height,
}) => {
  return (
    <div>
      <Row>
        <Col xs="2">{lLocationID}</Col>
        <Col xs="3">
          <Input
            style={{ width: wLocationID, height: height }}
            value={InLocationID}
            onChange={{}}
          />
        </Col>
        <Col xs="2">{lOrg}</Col>
        <Col xs="5">
          <Input
            style={{ height: height }}
            value={InOrg}
            onChange={{}}
          />
        </Col>
      </Row>

      <Row>
        <Col xs="2">{lProvince}</Col>
        <Col xs="3">
          <Input
            style={{ width: wType, height: height }}
            value={InProvinceName}
            onChange={{}}
          />
        </Col>
        <Col xs="2">{lType}</Col>
        <Col xs="3">
          <Input
            style={{ width: wType, height: height }}
            value={InType}
            onChange={{}}
          />
        </Col>
        
      </Row>
      <Row>
        <Col xs="2">{lLocation}</Col>
        <Col xs="6">
          <Input
            style={{ width: wLocation, height: "100px" }}
            type="textarea"
            value={InLocation}
            onChange={{}}
          />
        </Col>
      </Row>
    </div>
  );
};

BoxSchedule.defaultProps = {
  color: "#ffffff",
  lLocationID: "",
  lOrg: "",
  lProvince: "",
  lType: "",
  lLocation: "",
  InLocationID: "",
  InOrg: "",
  InProvince: "",
  InProvinceName: "",
  InType: "",
  InLocation: "",
  wLocationID: "120px",
  wOrg: "120px",
  wProvince: "60px",
  wProvinceName: "120px",
  wType: "120px",
  wLocation: "370px",
  height: "30px",
};

BoxSchedule.propTypes = {
  color: PropTypes.string,
  lLocationID: PropTypes.string,
  lOrg: PropTypes.string,
  lProvince: PropTypes.string,
  lType: PropTypes.string,
  lLocation: PropTypes.string,
  InLocationID: PropTypes.string,
  InOrg: PropTypes.string,
  InProvince: PropTypes.string,
  InProvinceName: PropTypes.string,
  InType: PropTypes.string,
  InLocation: PropTypes.string,
};

export default BoxSchedule;
