import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import {
  DropdownExamRegion,
  DropdownExamOrganizer,
  DropdownExamTime,
  DatePicker,
  SubmitButton,
  EditButton,
  CancelButton,
  Table
} from "../shared";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchSchedulePopup } from "../../redux/actions";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone , getExamType } from "../../api/apiGetConfig";
import { getExamLocation } from "../../api/apiGetExamLocation";
import { getExamScheduleByDetails} from "../../api/apiGetExamSchedule"

import { get } from "lodash";
import PropTypes from "prop-types";
import moment from "moment"
export const SearchSchedulePopup = ({ onChange }) => {
  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");
  const [searchProvince, setSearchProvince] = useState({});
  const [examLocationList, setExamLocationList] = useState([]);
  const [examRound, setExamRound] = useState([]);
  const [selectedDate ,setSelectedDate] = useState(null)
  const [examScheduleList,setExamScheduleList] = useState([]);
  const examType = getExamType();

  const examZoneResonse = getExamLocationZone();
  const dispatch = useDispatch();
  const { isShow, title, description, action } = useSelector(
    (state) => state.searchSchedulePopup
  );


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
        `${moment(params.getValue(params.id, "applyOpenDate")).format(
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
    },{
      field: "remainCandidate",
      headerName: "คงเหลือ",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },{
      field: "select",
      headerName: "เลือก",
      align: "center",
      hideSortIcons: "true",
      headerClassName: "header",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <EditButton
            title="เลือก"
            onClick={() => handleAction(cellValues.row)}
          />
        );
      },
    },
   
  ];


  const handleAction = (e) => {
    //call back function
    console.log("SearchSchedulePopup ", e);
    dispatch(hideSearchSchedulePopup());
    onChange(e);
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
    fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(get(e, "orgCode", ""));
    fetchExamOrganizer(get(e, "orgCode", ""));
    setSearchProvince({
      provinceCode: provinceCode,
      examOrganizerCode: examOrganizerCode,
    });
  };

  const onClickRoundButton = (e) => {};
  const fetchData = async () => {
    const responseLocation = await getExamLocation("A");
    setExamLocationList(get(responseLocation, "data", []));
    const responseSchedule = await getExamScheduleByDetails(
      selectedDate === null ? "" : moment(selectedDate).format("YYYY-MM-DD"),
      examRound,
      examOrganizerCode,
      provinceCode
    );
    
    setExamScheduleList(get(responseSchedule, "data", []));
    
  };

  const rows = examScheduleList.map((row) => {
    return { id: row.scheduleId, ...row };
  });


  useEffect(() => {
    fetchData();
  }, []);

  const toggle = () => dispatch(hideSearchSchedulePopup());

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
    if (e !== "") {
      const response = await getOrganizer(e);
      setExamOrganizerName(get(response[0], "orgName", ""));
    }
  };



  return (
    <Modal isOpen={isShow} size="xl" toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Row style={{ paddingBottom: "12px" }}>
          <Col sm={{ size: 4, offset: 2 }}>
            <DatePicker
              label="วันที่สอบ"
              value={"0000-00-00"}
              onChange={(date) => setSelectedDate(date)}
              //onChange={(date) => console.log(date)}
            />
          </Col>
          <Col
            sm="1"
            style={{
              textAlign: "center",
              margin: "auto",
              marginBottom: 0,
              marginRight: 0,
            }}
          >
            -
          </Col>
          <Col sm="4" style={{ margin: "auto", marginBottom: 0 }}>
            <DatePicker
              label=" "
              value={"0000-00-00"}
              // onChange={(date) => setSelectedDate(date)}
              onChange={(date) => console.log(date)}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 4, offset: 2 }}>
            <DropdownExamOrganizer
              label="สถานที่สอบ "
              value={examOrganizerCode}
              onClick={(e) => {
                onClickExamOrganizerButton(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 4, offset: 2 }}>
            <DropdownExamRegion
              label="สนามสอบ"
              value={provinceCode}
              onClick={(e) => {
                onClickProvinceButton(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 4, offset: 2 }}>
            <DropdownExamTime
              label="เวลาสอบ"
              value={examRound}
              onClick={(e) => {
                onClickRoundButton(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" style={{ textAlign: "right" }}>
            <SubmitButton
              // disabled={props.invalid || props.pristine || props.submitting}
              title="ค้นหา"
              onClick={() => alert("fdsfr")}
            />{" "}
            <CancelButton title="ยกเลิก" onClick={toggle} />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
      <Table data={rows} columns={columns} loading={false}/>
       {/* <LocationTable
          provinceCode={provinceCode}
          examOrganizerCode={examOrganizerCode}
          examLocationList={rows}
          event={{ event: "search" }}
          onClick={handleAction}
        />
        */}
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
