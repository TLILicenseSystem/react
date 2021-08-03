import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "reactstrap";

const Container = styled.div`
  background-color: ${({ color }) => color};
  padding: 10px;
  margin: 10px;
  flex: 1;
  font-size: 15px;
  display: flex;
  justify-content: center; 
`;

const BoxUserModify = ({ color, lUser, lModifyDate, InUser, InModifyDate, width, height }) => {

  return (
    <Container>
      <div>
        <tr>
          <td >{lUser}</td>
          <td><Input style={{ width: width,height :height}} value={InUser} onChange={{}}/></td>
          <td >{lModifyDate}</td>
          <td><Input style={{ width: width,height :height}} value={InModifyDate} onChange={{}}/></td>
        </tr>
      </div>
    </Container>
  );
};

BoxUserModify.defaultProps = {
  color: "#ffffff",
  lUser: "",
  lModifyDate: "",
  InUser: "",
  InModifyDate: "",
  width: "120px",
  height:"30px"
};

BoxUserModify.propTypes = {
  color: PropTypes.string,
  lUser: PropTypes.string,
  lModifyDate: PropTypes.string,
  InUser: PropTypes.string,
  InModifyDate: PropTypes.string,
  
};

export default BoxUserModify;
