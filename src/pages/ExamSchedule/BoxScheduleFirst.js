import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, Card, CardBody, Row, Col } from "reactstrap";
import { DatePicker } from "../../components/shared";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from "@date-io/date-fns";
import Select from "react-select";
import { get } from "lodash";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import moment from "moment";
import "./customDatePickerWidth.css";
import { DropdownExamTime } from "../../components/DropdownWithLabel/DropdownExamTime";
import styles from "../pageStyles.css";

const Container = styled.div`
  background-color: ${({ color }) => color};
  padding: 10px;
  margin: 10px;
  border-radius: 0px;
  flex: 1;
  border: 1px solid;
  font-size: 15px;
`;

const BoxSchedule = ({
  color,
  lExamDate,
  lCloseDate,
  lRoundTime,
  lReceiveDate,
  lReceiveTime,
  lNum,
  InExamDate,
  onClickInExamDate,
  InCloseDate,
  onClickInCloseDate,
  InRoundTime,
  onClickInRoundTime,
  InReceiveDate,
  onClickInReceiveDate,
  InReceiveTime,
  onClickInReceiveTime,
  InNum,  
  onChangeInNum,
  eExamDate,
  eCloseDate,
  eRoundTime,
  eReceiveDate,
  eReceiveTime,
  eNum,
  width,
  height,
}) => {

  const onChangeApplicant = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      onChangeInNum(e);
   }
  } 

  return (
    <div>
      <Card>
        <CardBody>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Row>
              <Col xs="4">
                <DatePicker
                  label={lExamDate}
                  value={InExamDate}
                  onChange={onClickInExamDate}
                  showError={eExamDate}
                />
              </Col>
              <Col xs="4">
                <DatePicker
                  label={lCloseDate}
                  value={InCloseDate}
                  onChange={onClickInCloseDate}
                  showError={eCloseDate}
                />
              </Col>
              <Col xs="4">
                <DropdownExamTime
                  label={lRoundTime}
                  value={InRoundTime}
                  isClearable={false}
                  showError={eRoundTime}
                  onClick={onClickInRoundTime}
                />
              </Col>
            </Row>

            <Row style={{paddingTop: "20px", paddingBottom: "20px"}}>
              <Col xs="4">
                <DatePicker
                  label={lReceiveDate}
                  value={InReceiveDate}
                  onChange={onClickInReceiveDate}
                  showError={eReceiveDate}
                />
              </Col>
              <Col xs="4">
                <label className="label">{lReceiveTime}</label>
                  <TextField
                    error={eReceiveTime}
                    id="time"
                    type="time"
                    value={InReceiveTime}
                    onChange={onClickInReceiveTime}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                      style: {
                        fontSize: 15,
                        //height: 10,
                        fontFamily:"Prompt-Regular"
                    }
                    }}
                   style={{marginLeft:"0px",marginTop:"11px",width:"100%",height:"0px"}}
                  />
              </Col>
              <Col xs="4">
                <label className="label">{lNum}</label>
                <Input value={InNum} onChange={onChangeApplicant} invalid={eNum} style={{
                    marginLeft: "0px",
                    marginTop: "8px",
                    width: "100%",
                    height: "40px",
                    fontFamily:"Prompt-Regular",
                    
                  }}/>
              </Col>
            </Row>
          </MuiPickersUtilsProvider>
        </CardBody>
      </Card>
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
