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
// import { getExamType } from "../../api/apiGetConfig";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const ExamSchedule = () => {
  const history = useHistory();
  const [examRound, setExamRound] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [examScheduleList, setExamScheduleList] = useState([]);
  // const examType = getExamType();
  const [loading, setLoading] = useState(false);

  // const getLocationTypeData = (e) => {
  //   if (e !== "" || e !== null) {
  //     const locationType = get(
  //       examType.filter((zone) => zone.examTypeId === e)[0],
  //       "examTypeName",
  //       ""
  //     );
  //     return locationType;
  //   } else {
  //     return "";
  //   }
  // };
  const columns = [
    {
      field: "examDateFormat",
      headerName: "???????????????????????????",
      minWidth: 140,
      valueGetter: (params) =>
        `${dayjs(params.getValue(params.id, "examDate")).format("DD/MM/BBBB")}`,
      hideSortIcons: "true",
      headerClassName: "header",
      cellClassName: "cellDark",
    },
    {
      field: "timeStr",
      headerName: "?????????????????????",
      minWidth: 120,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "maxApplicant",
      headerName: "????????????????????????????????????????????????",
      width: 100,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "applyCloseDateFormat",
      headerName: "???????????????????????????????????????????????????",
      minWidth: 140,
      valueGetter: (params) =>
        `${dayjs(params.getValue(params.id, "applyCloseDate")).format(
          "DD/MM/BBBB"
        )}`,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },

    {
      field: "orgName",
      headerName: "??????????????????????????????",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "provinceName",
      headerName: "?????????????????????",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "locationTypeName",
      headerName: "?????????????????????????????????????????????",
      width: 140,
      align: "left",
      // valueGetter: (params) =>
      //   `${getLocationTypeData(params.getValue(params.id, "locationType"))}`,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "locationDetail",
      headerName: "??????????????????????????????????????????",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "receiveDateFormat",
      headerName: "?????????????????????????????????????????????????????????",
      minWidth: 140,
      align: "left",
      valueGetter: (params) =>
        `${dayjs(params.getValue(params.id, "receiveDate")).format(
          "DD/MM/BBBB"
        )}`,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "receiveTime",
      headerName: "????????????????????????????????????????????????????????????",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "lastUpdateFormat",
      headerName: "?????????????????????????????????????????????",
      minWidth: 200,
      align: "left",
      valueGetter: (params) =>
        `${dayjs(new Date(params.getValue(params.id, "lastUpdate"))).format(
          "DD/MM/BBBB HH:mm:ss"
        )}`,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "updateUserCode",
      headerName: "????????????????????????????????????",
      minWidth: 140,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "edit",
      headerName: "???????????????",
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
      headerName: "??????",
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

    const responseSchedule = await getExamScheduleByDetails(
      dayjs(selectedDate).isValid()
        ? dayjs(selectedDate).format("YYYY-MM-DD")
        : "",
      dayjs(selectedEndDate).isValid()
        ? dayjs(selectedEndDate).format("YYYY-MM-DD")
        : dayjs(selectedDate).isValid()
        ? dayjs(selectedDate).format("YYYY-MM-DD")
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
        title: "??????????????????????????????????????????",
        text: "?????????????????????????????????????????????????????????????????????????????????????????????",
      });
      return;
    }

    const { value: check } = await Swal.fire({
      text: `????????????????????????????????????????????????????????????????????? ${dayjs(
        get(selected, "examDate", "")
      ).format("DD/MM/yyyy")} ???????????? ${get(selected, "timeStr", "")} ??????????????????????????????`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d9534f",
      confirmButtonColor: "#0275d8",
      confirmButtonText: "?????????",
      cancelButtonText: "??????????????????",
    });
    if (check) {
      let response = await deleteExamSchedule(scheduleId);

      if (response === "error") {
        Swal.fire({
          icon: "error",
          title: "??????????????????????????????????????????",
          text: "???????????????????????????????????????????????????????????????????????????!",
        });
      } else {
        Swal.fire("Deleted!", "????????????????????????????????????", "success");
        fetchData();
      }
    }
  };
  const onChangeDate = (date) => {
    if (selectedEndDate < date) {
      setSelectedEndDate(date);
    }
    setSelectedDate(date);
  };

  const onChangeEndDate = (date) => {
    if (date < selectedDate) {
      setSelectedEndDate(date);
      setSelectedDate(date);
    }
    setSelectedEndDate(date);
  };

  return (
    <Container>
      <div className="contents">
        <h2 className="head">?????????????????????????????????????????????</h2>
        <Card>
          <CardBody>
            <FilterCollapse title="???????????????????????????????????????">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Row>
                  <Col xs="12" sm="5" md="5">
                    <Row md="2">
                      <Col>
                        <DatePicker
                          label="???????????????????????????"
                          value={selectedDate}
                          onChange={(date) => onChangeDate(new Date(date))}
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          label="&nbsp; &nbsp;"
                          value={selectedEndDate}
                          mindate={selectedDate}
                          onChange={(date) => onChangeEndDate(new Date(date))}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {/* <Col xs="12" sm="3" md="3">
                    <DatePicker
                      label="&nbsp; &nbsp;"
                      value={selectedEndDate}
                      mindate={selectedDate}
                      onChange={(date) => setSelectedEndDate(new Date(date))}
                    />
                  </Col> */}
                  <Col xs="12" sm="2" md="2">
                    <DropdownExamTime
                      label="?????????????????????"
                      value={examRound}
                      isClearable={true}
                      onClick={(e) => setExamRound(get(e, "roundId", ""))}
                    />
                  </Col>
                  <Col xs="12" sm="2" md="2">
                    <DropdownExamOrganizer
                      label="??????????????????????????????"
                      value={examOrganizerCode}
                      isClearable={true}
                      onClick={(e) => {
                        setExamOrganizerCode(get(e, "orgCode", ""));
                      }}
                    />
                  </Col>
                  <Col xs="12" sm="2" md="2">
                    <DropdownExamRegion
                      label="?????????????????????"
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
                    <AddButton
                      title="???????????????"
                      onClick={() => onClickSearchSchedule()}
                    />
                  </Col>
                </Row>
              </MuiPickersUtilsProvider>
            </FilterCollapse>
          </CardBody>
          <CardBody style={{ textAlign: "right", paddingBottom: 0 }}>
            <AddButton
              title="???????????????????????????????????????"
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
