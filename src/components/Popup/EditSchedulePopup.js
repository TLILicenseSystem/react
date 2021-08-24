import "date-fns";
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row, Card, CardBody, CardHeader} from "reactstrap";
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
import BoxScheduleFirst from "../../pages/ExamSchedule/BoxScheduleFirst";
import BoxSchedule from "../../pages/ExamSchedule/BoxSchedule";

import { useSelector, useDispatch } from "react-redux";
import { hideEditSchedulePopup } from "../../redux/actions";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone } from "../../api/apiGetConfig";
import { getExamRoundAll } from "../../api/apiGetExamRound";

import { get } from "lodash";
import PropTypes from "prop-types";
import moment from "moment";
import styles from "../../pages/pageStyles.css";

export const EditSchedulePopup = ({ onChange }) => {
  const dispatch = useDispatch();
  const { isShow, title, description, scheduleDetail, action } = useSelector(
    (state) => state.editSchedulePopup
  );
  const handleAction = (e) => {
    //call back function
    dispatch(hideEditSchedulePopup());    
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

  const [examDate, setExamDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [receiveTime, setReceiveTime] = useState("");
  const [num, setNum] = useState(0);
  const [isShowMainLocation, setIsShowMainLocation] = useState(true);
  const [isShowAlterLocation, setIsShowAlterLocation] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [examRound, setExamRound] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleExamRound = (date) => {
    console.log("handleExamRound ", date);
    setExamRound(get(date, "roundId", ""));
  };
  const toggle = () => dispatch(hideEditSchedulePopup());
  const examZoneResonse = getExamLocationZone();

  const fetchData = async() => {
    const response = await getExamRoundAll();
    setExamRoundList(get(response, "data", []));
    setExamDate(get(scheduleDetail, "examDate", ""));
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
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <ModalHeader toggle={toggle}><h4 className="div">{title}</h4></ModalHeader>
        <ModalBody>

        <CardBody>
            <BoxScheduleFirst
              lExamDate="วันที่สอบ"
              lCloseDate="วันที่ปิดรับสมัคร"
              lRoundTime="เวลาสอบ"
              lReceiveDate="วันที่ได้รับหนังสือ"
              lReceiveTime="เวลาที่ได้รับหนังสือ"
              lNum="จำนวนผู้สมัคร(คน)"
              InExamDate={get(scheduleDetail,"examDate","")}
              //InExamDate={examDate}
              onClickInExamDate={(e) =>
                setExamDate(moment(e).format("MM/DD/yyyy"))
              }
              InCloseDate={closeDate}
              onClickInCloseDate={(e) =>
                setCloseDate(moment(e).format("MM/DD/YYYY"))
              }
              InRoundTime={examTime}
              onClickInRoundTime={(e) => setExamTime(get(e,"roundId",""))}
              InReceiveDate={receiveDate}
              onClickInReceiveDate={(e) =>
                setReceiveDate(moment(e).format("MM/DD/YYYY"))
              }
              InReceiveTime={receiveTime}
              onClickInReceiveTime={(e) =>
                setReceiveTime(moment(e).format("HH:mm"))
              }
              InNum={num}
              onChangeInNum={(e) => setNum(e.target.value)}
            />
          </CardBody>


            {/* {!isShowMainLocation ? (
            ""
          ) : (
            <Card>
              <CardHeader style={{ textAlign: "left" }}>
                ข้อมูลสถานที่สอบหลัก{" "}
                <i class="far fa-edit" type="button" onClick={{}}></i>
              </CardHeader>
              <CardBody>
                <BoxSchedule
                  lLocationID="รหัสสถานที่ตั้งสอบ"
                  lOrg="สถานที่สอบ"
                  lProvince="สนามสอบ"
                  lType="ประเภทสถานที่ตั้ง"
                  lLocation="สถานที่ตั้งสอบ"
                  InLocationID={get(scheduleDetail.mainLocation, "locationId", "")}
                  InOrg={get(scheduleDetail.mainLocation, "organizerName", "")}
                  InProvince={get(scheduleDetail.mainLocation, "provinceCode", "")}
                  InProvinceName={get(scheduleDetail.mainLocation, "provinceName", "")}
                  InType={get(scheduleDetail.mainLocation, "locationTypeName", "")}
                  InLocation={get(scheduleDetail.mainLocation, "locationDetail", "")}
                />
              </CardBody>
            </Card>
          )} */}

          {/* <Grid container spacing={2}>
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
          </Grid> */}
        </ModalBody>
        {/* <ModalBody>
          <ScheduleTable 
            provinceCode={provinceCode}
            examOrganizerCode={examOrganizerCode}
            roundId={examRound}
            examDate={selectedDate}
            onClick={handleAction}/>
        </ModalBody> */}
        </MuiPickersUtilsProvider>
      </Modal>   
  );
};
EditSchedulePopup.defaultProps = {
  onChange: () => {},
};
EditSchedulePopup.propTypes = {
  onChange: PropTypes.func,
};
