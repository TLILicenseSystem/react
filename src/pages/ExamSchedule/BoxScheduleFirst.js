import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Dropdown,DropdownToggle,DropdownMenu,DropdownItem,} from "reactstrap";
import styles from "./ExamSchedule.module.css";
import "./customDatePickerWidth.css";

const Container = styled.div`
  background-color: ${({ color }) => color};
  padding: 10px;
  margin: 10px;
  border-radius: 0px;
  flex: 1;
  border: 1px solid;
  font-size: 15px;
 
`;



const BoxSchedule = ({color,lExamDate,lCloseDate,lRoundTime,lReceiveDate,lReceiveTime,lNum,
                     InExamDate,InCloseDate,InRoundTime,InReceiveDate,InReceiveTime,InNum,width, height,}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [examDate, setExamDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [receiveDate, setReceiveDate] = useState("");

 console.log("examDate=",examDate);
 console.log("examDate format =",examDate);
  return (
    <Container color={color}>
      <div >
        <tr>
          <td>{lExamDate}</td>
          <td>
            
            {/* <Input style={{ width: width, height: height }} InExamDate={InExamDate} /> */}


            <DatePicker className="customDatePickerWidth" dateFormat="dd/MM/yyyy" 
              selected={examDate} InExamDate={InExamDate}
              onChange={date => setExamDate(date)} 
        
            />

           
          </td>
          <td>{lCloseDate}</td>
          <td>
            {/* <Input style={{ width: width, height: height }} InCloseDate={InCloseDate} /> */}

            <DatePicker className="customDatePickerWidth" dateFormat="dd/MM/yyyy"
              selected={closeDate} InCloseDate={InCloseDate}
              onChange={date => setCloseDate(date)} 
            />


          </td>
          <td>{lRoundTime}</td>
          <Dropdown isOpen={dropdownOpen} toggle={toggle} size="sm">
            <DropdownToggle caret>- โปรดระบุ -</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>08.00-09.00</DropdownItem>
              <DropdownItem>09.00-10.00</DropdownItem>
              <DropdownItem>10.00-11.00</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </tr>

        <tr>
          <td>{lReceiveDate}</td>
          <td>
            {/* <Input style={{ width: width, height: height }} InReceiveDate={InReceiveDate} /> */}

            <DatePicker className="customDatePickerWidth" dateFormat="dd/MM/yyyy"
              selected={receiveDate} InReceiveDate={InReceiveDate}
              onChange={date => setReceiveDate(date)} 
            />


          </td>
          <td>{lReceiveTime}</td>
          <td>
            <Input style={{ width: width, height: height }} InReceiveTime={InReceiveTime} />
          </td>
          <td>{lNum}</td>
          <td>
            <Input style={{ width: "97px", height: height }} InNum={InNum} />
          </td>
        </tr>
      </div>
    </Container>
  );
};

BoxSchedule.defaultProps = {
  color: "#ffffff",
  lExamDate: "",
  lCloseDate: "",
  lRoundTime: "",
  lReceiveDate: "",
  lReceiveTime: "",
  lNum: "",
  InExamDate: "",
  InCloseDate: "",
  InRoundTime: "",
  InReceiveDate: "",
  InReceiveTime: "",
  InNum: "",
  width: "120px",
  height: "30px",
};

BoxSchedule.propTypes = {
  color: PropTypes.string,
  lExamDate: PropTypes.string,
  lCloseDate: PropTypes.string,
  lRoundTime: PropTypes.string,
  lReceiveDate: PropTypes.string,
  lReceiveTime: PropTypes.string,
  lNum: PropTypes.string,
  InExamDate: PropTypes.string,
  InCloseDate: PropTypes.string,
  InRoundTime: PropTypes.string,
  InReceiveDate: PropTypes.string,
  InReceiveTime: PropTypes.string,
  InNum: PropTypes.string,

};

export default BoxSchedule;
