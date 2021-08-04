import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import styles from "./ExamSchedule.module.css";
import "./customDatePickerWidth.css";
import { get } from "lodash";
import { getExamRoundAll } from "../../api/apiGetExamRound";
import moment from "moment";

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
                     InExamDate,onClickInExamDate,InCloseDate,onClickInCloseDate,InRoundTime,onClickInRoundTime,
                     InReceiveDate,onClickInReceiveDate,InReceiveTime,onClickInReceiveTime,InNum,onChangeInNum,width, height,}) => {

  const [examDate, setExamDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [examRoundList, setExamRoundList] = useState([]);

  const fetchData = async() => {
    const response = await getExamRoundAll();
    setExamRoundList(get(response, "data", []));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRoundTime = (e) => {    
    let roundTime = examRoundList.filter((item) => item.roundId === e);
    console.log("roundTime ", roundTime);
    return get(roundTime[0], "timeStr", "");
  }

  return (
      <div>
        <Row>
          <Col xs="2">{lExamDate}</Col>
          <Col xs="2">
            <DatePicker className="customDatePickerWidth" dateFormat="dd/MM/yyyy" 
              value={InExamDate}
              onChange={onClickInExamDate}
              placeholderText="dd/mm/yyyy" 
            />           
          </Col>
          <Col xs="2">{lCloseDate}</Col>
          <Col xs="2">
            <DatePicker className="customDatePickerWidth" dateFormat="dd/MM/yyyy"
              value={InCloseDate}
              onChange={onClickInCloseDate}
              placeholderText="dd/mm/yyyy" 
            />
          </Col>
          <Col xs="2">{lRoundTime}</Col>
          <Col xs="2">
            <DropdownButton
              className={styles.input}
              id="dropdown-basic-button"
              title={
                InRoundTime === "" || InRoundTime === null || InRoundTime === "null"
                  ? "- โปรดระบุ - "
                  : getRoundTime(InRoundTime)
              }
              onSelect={onClickInRoundTime}
              size="sm"
            >
              {examRoundList.map((detail, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    eventKey={get(detail, "roundId", "")}
                    href="#"
                  >
                    {get(detail, "timeStr", "")}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>  
        </Row>

        <Row>
          <Col sm="2">{lReceiveDate}</Col>
          <Col sm="2">
            <DatePicker className="customDatePickerWidth" dateFormat="dd/MM/yyyy"
              value={InReceiveDate}
              onChange={onClickInReceiveDate} 
              placeholderText="dd/mm/yyyy" 
            />
          </Col>
          <Col sm="2">{lReceiveTime}</Col>
          <Col sm="2">
            <DatePicker
              className="customDatePickerWidth"
              selected={(InReceiveTime === "" ? "" : moment(InReceiveTime,"hh:mm").toDate())}
              onChange={onClickInReceiveTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="time"
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              minTime={moment("08:00","hh:mm").toDate()}
              maxTime={moment("18:00","hh:mm").toDate()}
              placeholderText="hh24:mm"
            />
            {/* <Input style={{ width: width, height: height }} value={InReceiveTime} onChange={onClickInReceiveTime}/> */}
          </Col>
          <Col sm="2">{lNum}</Col>
          <Col sm="2">
            <Input style={{ width: "97px", height: height }} value={InNum} onChange={onChangeInNum}/>
          </Col>
        </Row>
      </div>
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
  onClickInExamDate: () => {},
  InCloseDate: "",
  onClickInCloseDate: () => {},
  InRoundTime: "",
  onClickInRoundTime: () => {},
  InReceiveDate: "",
  onClickInReceiveDate: () => {},
  InReceiveTime: "",
  onClickInReceiveTime: () => {},
  InNum: "",
  onChangeInNum: () => {},
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
  onClickInExamDate: PropTypes.func,
  InCloseDate: PropTypes.string,
  onClickInCloseDate: PropTypes.func,
  InRoundTime: PropTypes.string,
  onClickInRoundTime: PropTypes.func,
  InReceiveDate: PropTypes.string,
  onClickInReceiveDate: PropTypes.func,
  InReceiveTime: PropTypes.string,
  onClickInReceiveTime: PropTypes.func,
  InNum: PropTypes.string,
  onChangeInNum: PropTypes.func,

};

export default BoxSchedule;
