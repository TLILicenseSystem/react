import "date-fns";
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row, } from "reactstrap";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Select from 'react-select';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import {
  DropdownExamRegion,
  DropdownExamOrganizer,
  ScheduleTable,
} from "../shared";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchSchedulePopup } from "../../redux/actions";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone } from "../../api/apiGetConfig";
import { getExamRoundAll } from "../../api/apiGetExamRound";

import { get } from "lodash";
import PropTypes from "prop-types";

export const SearchSchedulePopup = ({ onChange }) => {
  const dispatch = useDispatch();
  const { isShow, title, description, action } = useSelector(
    (state) => state.searchSchedulePopup
  );
  const handleAction = (e) => {
    //call back function
    dispatch(hideSearchSchedulePopup());
    onChange(e);
  };

  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
    fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(e);
    fetchExamOrganizer(e);
  };

  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");
  const [examRoundList, setExamRoundList] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };
  const toggle = () => dispatch(hideSearchSchedulePopup());
  const examZoneResonse = getExamLocationZone();

  const fetchData = async() => {
    const response = await getExamRoundAll();
    setExamRoundList(get(response, "data", []));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchProvinceData = async (e) => {
    const response = await getProvinceCode(e);
    setRegion(get(response[0], "region", ""));
    setRegionName(
      get(
        examZoneResonse.filter(
          (zone) => zone.regionCode === get(response[0], "region", "")
        )[0],
        "regionName",
        ""
      )
    );
    setProvinceName(
      get(
        response.filter((zone) => zone.provinceCode === e)[0],
        "provinceName",
        ""
      )
    );
  };
  const fetchExamOrganizer = async (e) => {
    const response = await getOrganizer(e);
    setExamOrganizerName(get(response[0], "orgName", ""));
  };
  const getRoundTime = (e) => {    
    let roundTime = examRoundList.filter((item) => item.roundId === e);
    console.log("roundTime ", roundTime);
    return get(roundTime[0], "timeStr", "");
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Modal isOpen={isShow} size="lg" toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box>วันที่สอบ</Box>
              <Box>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="small"
                  id="date-picker-inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>เวลาสอบ</Box>
              <Box>
                <Select
                  isClearable={false}
                  isSearchable={false}
                  name="examTime"
                  options={examRoundList}                
                  getOptionLabel={(option) => `${option.timeStr}`}
                  getOptionValue={(option) => `${option.roundId}`}
                  onChange={{}}
                />                 
              </Box>    
            </Grid>
            <Grid item xs={4}>
                <DropdownExamOrganizer
                  label="สถานที่สอบ"
                  value={examOrganizerCode + examOrganizerName}
                  onClick={(e) => {
                    onClickExamOrganizerButton(e);
                  }}
                />
            </Grid>
            <Grid item xs={8}>
              <Box>
                <DropdownExamRegion
                  label="สนามสอบ"
                  value={provinceCode}
                  onClick={(e) => {
                    onClickProvinceButton(e);
                  }}
                />
              </Box>
            </Grid>
            <Grid container direction="row" justifyContent="left" alignItems="center" item xs={3} >
                
                  <Button color="primary">ค้นหา</Button>
                  <Button color="secondary">ยกเลิก</Button>

            </Grid>
          </Grid>
        </ModalBody>
        <ModalBody>
          <ScheduleTable 
            provinceCode={provinceCode}
            examOrganizerCode={examOrganizerCode}
            onClick={handleAction}/>
        </ModalBody>
      </Modal>
    </MuiPickersUtilsProvider>
  );
};
SearchSchedulePopup.defaultProps = {
  onChange: () => {},
};
SearchSchedulePopup.propTypes = {
  onChange: PropTypes.func,
};
