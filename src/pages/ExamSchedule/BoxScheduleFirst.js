import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input,} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DateFnsUtils from "@date-io/date-fns";
import Select from 'react-select';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
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
  width,
  height,
}) => {
  const [examDate, setExamDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [examRound, setExamRound] = useState("");
  const [examRoundList, setExamRoundList] = useState([]);

  const fetchData = async () => {
    const response = await getExamRoundAll();
    setExamRoundList(get(response, "data", []));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExamRound = (date) => {
    console.log("handleExamRound ", date);
    setExamRound(get(date, "roundId", ""));
  };

  const getRoundTime = (e) => {
    let roundTime = examRoundList.filter((item) => item.roundId === e);
    console.log("roundTime ", roundTime);
    return get(roundTime[0], "timeStr", "");
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box pb={1}>{lExamDate}</Box>
            <Box>
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="small"
                id="date-picker-inline"
                value={InExamDate}
                onChange={onClickInExamDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{
                  style: {
                      fontSize: 16,
                      height: 35
                  }
              }}
               style={{width:"246px",height:"50px"}}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box pb={1}>{lCloseDate}</Box>
            <Box>
              <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="small"
                  id="date-picker-inline"
                  value={InCloseDate}
                  onChange={onClickInCloseDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputProps={{
                    style: {
                        fontSize: 16,
                        height: 35
                    }
                }}
                 style={{width:"246px",height:"50px"}}
                />               
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box >{lRoundTime}</Box>
            <Box>
              <Select
                isClearable={false}
                isSearchable={false}
                name="examTime"
                options={examRoundList}                
                getOptionLabel={(option) => `${option.timeStr}`}
                getOptionValue={(option) => `${option.roundId}`}
                onChange={onClickInRoundTime}
                value={examRoundList.filter(option => option.roundId === InRoundTime)}
              />                   
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box pb={1}>{lReceiveDate}</Box>
            <Box>
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="small"
                id="date-picker-inline"
                value={InReceiveDate}
                onChange={onClickInReceiveDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{
                  style: {
                      fontSize: 16,
                      height: 35
                  }
              }}
               style={{width:"246px",height:"50px"}}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box pb={1}>{lReceiveTime}</Box>
            <Box>
              <TimePicker
                autoOk 
                variant="inline"
                inputVariant="outlined"
                ampm={false}
                mask="__:__"
                value={"2000-01-01 " + InReceiveTime}
                minutesStep={15}
                onChange={onClickInReceiveTime}
                InputProps={{
                  style: {
                      fontSize: 16,
                      height: 35
                  }
              }}
               style={{width:"246px",height:"50px"}}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box pb={1}>{lNum}</Box>
            <Box>
              <Input value={InNum} onChange={onChangeInNum}/>
            </Box>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
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
