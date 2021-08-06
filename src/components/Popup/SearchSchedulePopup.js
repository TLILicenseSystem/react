import "date-fns";
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row, } from "reactstrap";
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
import moment from "moment";

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
    //fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(get(e, "orgCode", ""));
    //fetchExamOrganizer(get(e, "orgCode", ""));
  };
  const onClickExamRoundButton = (e) => {

  }

  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");
  const [examRoundList, setExamRoundList] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [examRound, setExamRound] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleExamRound = (date) => {
    console.log("handleExamRound ", date);
    setExamRound(get(date, "roundId", ""));
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
      <Modal isOpen={isShow} size="xl" toggle={toggle}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box>วันที่สอบ</Box>
              <Box>
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
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
                  isClearable={true}
                  isSearchable={false}
                  name="examTime"
                  options={examRoundList}                
                  getOptionLabel={(option) => `${option.timeStr}`}
                  getOptionValue={(option) => `${option.roundId}`}
                  onChange={(e)=> handleExamRound(e)}
                  value={examRoundList.filter(option => option.roundId === examRound)}
                />                 
              </Box>
            </Grid>
            <Grid item xs={4}>
                <DropdownExamOrganizer
                  label="สถานที่สอบ"
                  value={examOrganizerCode}
                  isClearable={true}
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
                  isClearable={true}
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
            roundId={examRound}
            examDate={selectedDate}
            onClick={handleAction}/>
        </ModalBody>
        </MuiPickersUtilsProvider>
      </Modal>   
  );
};
SearchSchedulePopup.defaultProps = {
  onChange: () => {},
};
SearchSchedulePopup.propTypes = {
  onChange: PropTypes.func,
};
