import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getExamScheduleByDetails } from "../../api/apiAddExamSchedule";
import {
  Container,
  InputWithLabel,
  Wrapper,
  SearchLocationPopup,
  LocationTable,
  DatePicker,
  DropdownExamTime,
  DropdownExamOrganizer,
  DropdownExamRegion,
  ScheduleTable,
  EditSchedulePopup,
} from "../../components/shared";
import BoxScheduleFirst from "./BoxScheduleFirst";
import BoxSchedule from "./BoxSchedule";
import BoxUserModify from "./BoxUserModify";
import { FontAwesomeIcon } from "@fortawesome/fontawesome-free";
import { cond, get } from "lodash";
import { deleteExamSchedule } from "../../api/apiAddExamSchedule";
import {
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
} from "reactstrap";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Select from "react-select";
import moment from "moment";
import Swal from "sweetalert2";
import styles from "../pageStyles.css";
import { getExamRoundAll } from "../../api/apiGetExamRound";

const ExamSchedule = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [scheduleId, setScheduleId] = useState("");
  const [examDate, setExamDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [receiveTime, setReceiveTime] = useState("");
  const [num, setNum] = useState(0);

  //------------------ผู้บันทึก------------------------
  const [userModify, setUserModify] = useState("2901133");
  const [modifyDate, setModifyDate] = useState(moment().format("DD/MM/YYYY"));

  //------------------radio button------------------
  const [radioValue, setRadioValue] = useState("1");

  const [isShowMainLocation, setIsShowMainLocation] = useState(true);
  const [isShowAlterLocation, setIsShowAlterLocation] = useState(false);
  const [searchValue, setSearchValue] = useState({});
  const [mainLocation, setMainLocation] = useState({});
  const [alterLocation, setAlterLocation] = useState({});

  const [examRound, setExamRound] = useState("");
  const [examRoundList, setExamRoundList] = useState([]);
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [examScheduleList, setExamScheduleList] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(get(e, "orgCode", ""));
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
  };

  const fetchData = async () => {
    const responseSchedule = await getExamScheduleByDetails(
      selectedDate,
      examRound,
      examOrganizerCode,
      provinceCode
    );
    setExamScheduleList(get(responseSchedule, "data", []));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rows = examScheduleList.map((row) => {
    const { scheduleId, ...rest } = row;
    return { id: scheduleId, scheduleId, ...rest };
  });

  const onClickEditSchedule = (schduleDetail) => {
    console.log("onClickEditSchedule ", schduleDetail);
    if (get(schduleDetail, "event", "") === "edit") {
      history.push("/examSchedule-edit", schduleDetail);
    } else {
      onClickDeleteSchedule(schduleDetail.selected);
    }
  };
  const handleExamRound = (date) => {
    console.log("handleExamRound ", date);
    setExamRound(get(date, "roundId", ""));
  };
  const onClickSearchSchedule = async () => {
    console.log("onClickSearchSchedule ", selectedDate);
    const responseSchedule = await getExamScheduleByDetails(
      selectedDate === null ? "" : moment(selectedDate).format("DD/MM/yyyy"),
      examRound,
      examOrganizerCode,
      provinceCode
    );
    setExamScheduleList(get(responseSchedule, "data", []));
  };

  const onClickDeleteSchedule = async (selected) => {
    let scheduleId = get(selected, "scheduleId", "");
    console.log(scheduleId);
    if (scheduleId === "") {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถลบรายการตารางสอบนี้ได้",
      });
      return;
    }

    const { value: check } = await Swal.fire({
      text: `ต้องการลบตารางสอบวันที่ ${moment(
        get(selected, "examDate", "")
      ).format("DD/MM/yyyy")} เวลา ${get(selected, "roundId", "")} ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d9534f",
      confirmButtonColor: "#0275d8",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });
    if (check) {
      let response = await deleteExamSchedule(scheduleId);

      if (response === "error") {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "พบข้อผิดพลาดในการลบข้อมูล!",
        });
      } else {
        //rows = (rows.filter((item) => item.roundId !== roundId));
        Swal.fire("Deleted!", "ลบข้อมูลแล้ว", "success");
      }
    }
  };

  return (
    <Container>
      <div style={{ marginTop: "20px" }} className="div">
        <h2 className="head">ตั้งค่าตารางสอบ</h2>
        <Wrapper>
          <Card>
            <CardBody>
              <h3 className="head">ตัวกรองข้อมูล</h3>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Row style={{ marginTop: "30px", marginLeft: "20px" }}>
                  <Col xs="3">
                    <DatePicker
                      label="วันที่สอบ"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </Col>
                  <Col xs="4">
                    <DropdownExamTime
                      label="เวลาสอบ"
                      value={examRound}
                      isClearable={true}
                      onClick={(e) => handleExamRound(e)}
                    />
                  </Col>
                  <Col xs="5">
                    <DropdownExamOrganizer
                      label="สถานที่สอบ"
                      value={examOrganizerCode}
                      isClearable={true}
                      onClick={(e) => {
                        onClickExamOrganizerButton(e);
                      }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: "7px", marginLeft: "20px" }}>
                  <Col xs="7">
                    <DropdownExamRegion
                      label="สนามสอบ"
                      value={provinceCode}
                      isClearable={true}
                      onClick={(e) => {
                        onClickProvinceButton(e);
                      }}
                    />
                  </Col>
                  <Col xs="5">
                    <div style={{ marginTop: "34px", marginLeft: "0px" }}>
                      <Button
                        color="primary"
                        style={{ fontFamily: "Prompt-Regular" }}
                        onClick={() => onClickSearchSchedule()}
                      >
                        ค้นหา
                      </Button>
                      <Button
                        color="outline-success"
                        type="button"
                        style={{
                          marginLeft: "10px",
                          fontFamily: "Prompt-Regular",
                        }}
                        active={true}
                        onClick={() => onClickEditSchedule({ mode: "add" })}
                      >
                        เพิ่ม
                      </Button>
                    </div>
                  </Col>
                </Row>
              </MuiPickersUtilsProvider>
            </CardBody>
            <CardBody>
              <ScheduleTable
                examScheduleList={rows}
                onClick={onClickEditSchedule}
              />
            </CardBody>
          </Card>
        </Wrapper>
      </div>
    </Container>
  );
};
export default ExamSchedule;
