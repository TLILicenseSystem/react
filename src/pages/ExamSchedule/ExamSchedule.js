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
  DateRangePicker,
  DropdownExamTime,
  DropdownExamOrganizer,
  DropdownExamRegion,
  ScheduleTable,
  EditSchedulePopup,
  Table,
  EditButton,
  DeleteButton,
  AddButton,
  FilterCollapse,
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
import { getExamType } from "../../api/apiGetConfig";

const ExamSchedule = () => {
  const history = useHistory();
  const [examRound, setExamRound] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [examScheduleList, setExamScheduleList] = useState([]);
  const examType = getExamType();
  const [loading, setLoading] = useState(false);

  const getLocationTypeData = (e) => {
    if (e !== "" || e !== null) {
      const locationType = get(
        examType.filter((zone) => zone.examTypeId === e)[0],
        "examTypeName",
        ""
      );
      return locationType;
    } else {
      return "";
    }
  };
  const columns = [
    {
      field: "examDateFormat",
      headerName: "วันที่สอบ",
      minWidth: 140,
      valueGetter: (params) =>
        `${moment(params.getValue(params.id, "examDate")).format(
          "DD/MM/yyyy"
        )}`,
      hideSortIcons: "true",
      headerClassName: "header",
      cellClassName: "cellDark",
    },
    {
      field: "timeStr",
      headerName: "เวลาสอบ",
      minWidth: 120,
      hideSortIcons: "true",
      // valueGetter: (params) =>
      //   `${getExamRoundDetail(params.getValue(params.id, "roundId"))}`,
      headerClassName: "header",
    },
    {
      field: "maxApplicant",
      headerName: "จำนวนผู้สมัครสอบ",
      width: 100,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "applyCloseDateFormat",
      headerName: "วันที่ปิดรับสมัคร",
      minWidth: 140,
      valueGetter: (params) =>
        `${moment(params.getValue(params.id, "applyCloseDate")).format(
          "DD/MM/yyyy"
        )}`,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },

    {
      field: "orgName",
      headerName: "สถานที่สอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "provinceName",
      headerName: "สนามสอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "locationTypeName",
      headerName: "ประเภท",
      width: 100,
      align: "left",
      valueGetter: (params) =>
        `${getLocationTypeData(params.getValue(params.id, "locationType"))}`,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "locationDetail",
      headerName: "สถานที่ตั้งสอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "receiveDateFormat",
      headerName: "วันที่ได้รับหนังสือ",
      minWidth: 140,
      align: "left",
      valueGetter: (params) =>
        `${moment(params.getValue(params.id, "receiveDate")).format(
          "DD/MM/yyyy"
        )}`,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "receiveTime",
      headerName: "เวลาที่ได้รับหนังสือ",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "edit",
      headerName: "แก้ไข",
      align: "center",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <EditButton onClick={() => onClickEditSchedule(cellValues.row)} />
        );
      },
    },
    {
      field: "delete",
      headerName: "ลบ",
      align: "center",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <DeleteButton onClick={() => onClickDeleteSchedule(cellValues.row)} />
        );
      },
    },
  ];

  const fetchData = async () => {
    setLoading(true);

    console.log(selectedEndDate, "selectedEndDate");
    const responseSchedule = await getExamScheduleByDetails(
      moment(selectedDate).isValid()
        ? moment(selectedDate).format("YYYY-MM-DD")
        : "",
      moment(selectedEndDate).isValid()
        ? moment(selectedEndDate).format("YYYY-MM-DD")
        : "",
      examRound,
      examOrganizerCode,
      provinceCode
    );
    setExamScheduleList(get(responseSchedule, "data", []));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rows = examScheduleList.map((row) => {
    const { scheduleId, ...rest } = row;
    return { id: scheduleId, scheduleId, ...rest };
  });

  const onClickEditSchedule = (scheduleDetail) => {
    history.push("/setting/examSchedule-edit", scheduleDetail);
  };

  const onClickSearchSchedule = async () => {
    fetchData();
  };

  const onClickDeleteSchedule = async (selected) => {
    let scheduleId = get(selected, "scheduleId", "");
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
      ).format("DD/MM/yyyy")} เวลา ${get(selected, "timeStr", "")} ใช่หรือไม่`,
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
        Swal.fire("Deleted!", "ลบข้อมูลแล้ว", "success");
        fetchData();
      }
    }
  };

  return (
    <Container>
      <div className="contents">
        <h2 className="head">ตั้งค่าตารางสอบ</h2>
        <Card>
          <CardBody>
            <FilterCollapse title="ตัวกรองข้อมูล">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Row>
                  <Col xs="12" sm="3" md="3">
                    <DateRangePicker
                      label="วันที่สอบ"
                      value={selectedDate}
                      onChange={(start, end) => {
                        setSelectedDate(start);
                        setSelectedEndDate(end);
                      }}
                      // onChange={(date) => console.log(date)}
                    />
                  </Col>
                  <Col xs="12" sm="2" md="2">
                    <DropdownExamTime
                      label="เวลาสอบ"
                      value={examRound}
                      isClearable={true}
                      onClick={(e) => setExamRound(get(e, "roundId", ""))}
                    />
                  </Col>
                  <Col xs="12" sm="3" md="3">
                    <DropdownExamOrganizer
                      label="สถานที่สอบ"
                      value={examOrganizerCode}
                      isClearable={true}
                      onClick={(e) => {
                        setExamOrganizerCode(get(e, "orgCode", ""));
                      }}
                    />
                  </Col>
                  <Col xs="12" sm="3" md="3">
                    <DropdownExamRegion
                      label="สนามสอบ"
                      value={provinceCode}
                      isClearable={true}
                      onClick={(e) => {
                        setProvinceCode(get(e, "provinceCode", ""));
                      }}
                    />
                  </Col>
                  <Col
                    xs="12"
                    sm="1"
                    md="1"
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      paddingBottom: "12px",
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    <Button
                      color="primary"
                      style={{ fontFamily: "Prompt-Regular" }}
                      onClick={() => onClickSearchSchedule()}
                    >
                      ค้นหา
                    </Button>
                  </Col>
                </Row>
              </MuiPickersUtilsProvider>
            </FilterCollapse>
          </CardBody>
          <CardBody style={{ textAlign: "right", paddingBottom: 0 }}>
            <AddButton
              title="เพิ่มตารางสอบ"
              onClick={() => onClickEditSchedule({ event: "add" })}
            />
          </CardBody>
          <CardBody>
            <Table
              data={rows}
              id="locationId"
              columns={columns}
              loading={loading}
            />
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};
export default ExamSchedule;
