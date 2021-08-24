import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, Row, Col } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import styles from "../pageStyles.css";

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
        <Col xs="5" className="div">{lLocationID}</Col>
        <Col xs="7" className="div">{InLocationID}</Col>
      </Row>
      <Row>
        <Col xs="5" className="div">{lOrg}</Col>
        <Col xs="7" className="div">{InOrg}</Col>
      </Row>
      <Row>
        <Col xs="5" className="div">{lProvince}</Col>
        <Col xs="7" className="div">{InProvinceName}</Col>
      </Row>
      <Row>
        <Col xs="5" className="div">{lType}</Col>
        <Col xs="7" className="div">{InType}</Col>
      </Row>
      <Row>
        <Col xs="5" className="div">{lLocation}</Col>
        <Col xs="7" className="div">{InLocation}</Col>
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
