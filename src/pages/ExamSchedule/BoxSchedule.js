import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "reactstrap";

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
const BoxSchedule = ({ color, lLocationID, lOrg, lProvince, lType, lLocation,  InLocationID, InOrg, 
                      InProvince, InProvinceName,InType, InLocation,wLocationID, wOrg, wProvince, wProvinceName,wType, wLocation, height }) => {
  console.log("type1 = ",{lLocationID});
  return (
    
 
    <Container color={color}>
      {/* <h1>{total}</h1>
          <p>(+{increase})</p> */}
      <div>
              <tr>
          <td >{lLocationID}</td>
          <td><Input style={{ width: wLocationID,height :height}} InLocationID={InLocationID} /></td>
          <td >{lOrg}</td>
          <td><Input style={{ width: wOrg,height :height}} InOrg={InOrg} /></td>
          <td>{lProvince}</td>
          <td><Input style={{ width: wProvince,height :height}} InProvince={InProvince} /></td>&nbsp;
          <td><Input style={{ width: wProvinceName,height :height}} InProvinceName={InProvinceName} /></td>
        </tr>
  
        <tr>
 
          <td>{lType}</td>
          <td ><Input style={{ width: wType,height :height}} InType={InType} /></td>
          <td >{lLocation}</td>
          <td colSpan='6'><Input style={{ width: wLocation,height :"100px"}} type="textarea" InLocation={InLocation} /></td>
         

        </tr>
      </div>
    </Container>
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
  height:"30px"
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
  InLocation: PropTypes.string
};

export default BoxSchedule;
