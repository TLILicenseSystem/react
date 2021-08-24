import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, Col, Row } from "reactstrap";
import styles from "../pageStyles.css";

const Container = styled.div`
  background-color: ${({ color }) => color};
  padding: 10px;
  margin: 10px;
  flex: 1;
  font-size: 15px;
  display: flex;
  justify-content: center;
`;

const BoxUserModify = ({
  color,
  lUser,
  lModifyDate,
  InUser,
  InModifyDate,
  width,
  height,
}) => {
  return (
    <Row>
        <Col xs="6">
          <div style={{ display: "flex", flexDirection: "column", alignItems : "flex-end" }}>
            <label className="label" style={{textAlign: "center"}}>{lUser}</label>
            <Input
              style={{ width: width, height: height, textAlign: "center" }}
              value={InUser}
            />
          </div>
        </Col>
        <Col xs="6">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="label">{lModifyDate}</label>
            <Input
              style={{ width: width, height: height, textAlign: "center" }}
              value={InModifyDate}
            />
          </div>
        </Col>
    </Row>
  );
};

BoxUserModify.defaultProps = {
  color: "#ffffff",
  lUser: "",
  lModifyDate: "",
  InUser: "",
  InModifyDate: "",
  width: "120px",
  height: "30px",
};

BoxUserModify.propTypes = {
  color: PropTypes.string,
  lUser: PropTypes.string,
  lModifyDate: PropTypes.string,
  InUser: PropTypes.string,
  InModifyDate: PropTypes.string,
};

export default BoxUserModify;
