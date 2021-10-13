import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import {
  DropdownExamRegion,
  DropdownExamOrganizer,
  DropdownExamTime,
  DateRangePicker,
  SubmitButton,
  EditButton,
  CancelButton,
  Table,
  DatePicker,
} from "../shared";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchSchedulePopup } from "../../redux/actions";
import { getExamScheduleByDetails } from "../../api/apiGetExamSchedule";

import { get } from "lodash";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

export const SearchSchedulePopup = ({ onChange }) => {
  const [provinceCode, setProvinceCode] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examRound, setExamRound] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [examScheduleList, setExamScheduleList] = useState([]);

  const dispatch = useDispatch();
  const { isShow, title, description, action } = useSelector(
    (state) => state.searchSchedulePopup
  );

  const columns = [
    {
      field: "examDateFormat",
      headerName: "วันที่สอบ",
      minWidth: 120,
      valueGetter: (params) =>
        `${dayjs(params.getValue(params.id, "examDate")).format("DD/MM/BBBB")}`,
      hideSortIcons: "true",
      headerClassName: "header",
      cellClassName: "cellDark",
    },
    {
      field: "timeStr",
      headerName: "เวลาสอบ",
      minWidth: 100,
      hideSortIcons: "true",
      // valueGetter: (params) =>
      //   `${getExamRoundDetail(params.getValue(params.id, "roundId"))}`,
      headerClassName: "header",
    },
    {
      field: "applyCloseDateFormat",
      headerName: "วันที่ปิดรับสมัคร",
      minWidth: 120,
      valueGetter: (params) =>
        `${dayjs(params.getValue(params.id, "applyCloseDate")).format(
          "DD/MM/BBBB"
        )}`,
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
      field: "locationDetail",
      headerName: "สถานที่ตั้งสอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "applyOpenDateFormat",
      headerName: "วันที่ได้รับหนังสือ",
      minWidth: 140,
      align: "left",
      valueGetter: (params) =>
        `${dayjs(params.getValue(params.id, "applyOpenDate")).format(
          "DD/MM/BBBB"
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
      field: "remainCandidate",
      headerName: "คงเหลือ",
      minWidth: 100,
      align: "center",
      renderCell: (cellValues) => {
        if (
          cellValues.row.remainCandidate === 0 ||
          cellValues.row.remainCandidate === "0"
        ) {
          return (
            <div
              style={{ backgroundColor: "red", width: "100%", color: "white" }}
            >
              เต็ม
            </div>
          );
        } else {
          return (
            <div>
              {`${cellValues.row.candidate} / ${cellValues.row.maxApplicant}`}{" "}
            </div>
          );
        }
      },
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "select",
      headerName: "เลือก",
      align: "center",
      hideSortIcons: "true",
      headerClassName: "header",
      width: 100,
      renderCell: (cellValues) => {
        if (
          cellValues.row.remainCandidate !== 0 ||
          cellValues.row.remainCandidate !== 0
        ) {
          return (
            <EditButton
              title="เลือก"
              onClick={() => handleAction(cellValues.row)}
            />
          );
        } else {
          return "";
        }
      },
    },
  ];

  const handleAction = (e) => {
    //call back function
    dispatch(hideSearchSchedulePopup());
    onChange(e);
  };

  const fetchData = async () => {
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

    //  if(description === "add"){
    let result = get(responseSchedule, "data", []).filter((item) => {
      if (
        dayjs(item.applyCloseDate).format("YYYY-MM-DD") >=
        dayjs(new Date()).format("YYYY-MM-DD")
      )
        return item;
    });
    setExamScheduleList(result);
    // }else setExamScheduleList(get(responseSchedule, "data", []));
  };

  const rows = examScheduleList.map((row) => {
    return { id: row.scheduleId, ...row };
  });

  useEffect(() => {
    setSelectedDate(dayjs(new Date()));
    setSelectedEndDate(dayjs(new Date()));
    fetchData();
  }, [isShow]);

  const toggle = () => dispatch(hideSearchSchedulePopup());

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
    <Modal isOpen={isShow} size="xl" toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Card style={{ border: "none" }}>
          <CardBody>
            <Row>
              <Col xs="12" md={{ offset: "2", size: "5" }}>
                <Row md="2">
                  <Col>
                    <DatePicker
                      label="วันที่สอบ"
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
              <Col xs="12" sm="3" md="3">
                <DropdownExamTime
                  label="เวลาสอบ"
                  value={examRound}
                  isClearable={true}
                  onClick={(e) => setExamRound(get(e, "roundId", ""))}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" md={{ offset: "2", size: "4" }}>
                <DropdownExamOrganizer
                  label="สถานที่สอบ"
                  value={examOrganizerCode}
                  isClearable={true}
                  onClick={(e) => {
                    setExamOrganizerCode(get(e, "orgCode", ""));
                  }}
                />
              </Col>
              <Col xs="12" sm="4" md="4">
                <DropdownExamRegion
                  label="สนามสอบ"
                  value={provinceCode}
                  isClearable={true}
                  onClick={(e) => {
                    setProvinceCode(get(e, "provinceCode", ""));
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" style={{ textAlign: "right" }}>
                <SubmitButton
                  // disabled={props.invalid || props.pristine || props.submitting}
                  title="ค้นหา"
                  onClick={() => fetchData()}
                />{" "}
                <CancelButton title="ยกเลิก" onClick={toggle} />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Table data={rows} columns={columns} loading={false} />
      </ModalFooter>
    </Modal>
  );
};
SearchSchedulePopup.defaultProps = {
  onChange: () => {},
};
SearchSchedulePopup.propTypes = {
  onChange: PropTypes.func,
};
