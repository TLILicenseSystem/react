import React, { useState, useEffect } from "react";
import {
  Button,
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
  const [examRound, setExamRound] = useState([]);
  const [selectedDate ,setSelectedDate] = useState(moment())
  const [selectedEndDate, setSelectedEndDate] = useState(null);

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
      minWidth: 120,
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
      minWidth: 100,
      align: "center",
      renderCell: (cellValues) => {
        if(cellValues.row.remainCandidate === 0 ||  cellValues.row.remainCandidate === "0"){
          return <div style={{backgroundColor: 'red', width: '100%',color: 'white'}}>เต็ม</div> 
        }else{
            return <div  style={{backgroundColor: 'lime', width: '100%',color: 'white'}}>{`${cellValues.row.remainCandidate} / ${cellValues.row.maxApplicant}`} </div> 
        }
      },
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
        if(cellValues.row.remainCandidate !== 0 ||  cellValues.row.remainCandidate !== 0 ){
          return <EditButton
          title="เลือก"
          onClick={() => handleAction(cellValues.row)}
        />
        }else{
          return (
            ""
          );
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
      moment(selectedDate).isValid() ? moment(selectedDate).format("YYYY-MM-DD"):"",
      moment(selectedEndDate).isValid() ? moment(selectedEndDate).format("YYYY-MM-DD"): moment(selectedDate).isValid() ? moment(selectedDate).format("YYYY-MM-DD"):"",
      examRound,
      examOrganizerCode,
      provinceCode
    );

    
    if(description === "add"){
      let result =  get(responseSchedule, "data", []).filter(item => {
        if(moment(item.applyCloseDate) >=  moment())
          return  item
      })
      setExamScheduleList(result);
    }else setExamScheduleList(get(responseSchedule, "data", []));

    
  };

  const rows = examScheduleList.map((row) => {
    return { id: row.scheduleId, ...row };
  });


  useEffect(() => {
  
    setSelectedDate(moment())
    setSelectedEndDate(moment())
    fetchData();
  }, [isShow]);

  
  const toggle = () => dispatch(hideSearchSchedulePopup());

 


  return (
    <Modal isOpen={isShow} size="xl" toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Card style={{border:'none'}}>
          <CardBody>
          <Row> 
                  <Col xs="12" md={{offset:'3',size:'3'}} >
                    <DateRangePicker
                      label="วันที่สอบ"
                      value={selectedDate}
                      onChange={(start,end) =>{ 
                        setSelectedDate(start)
                        setSelectedEndDate(end)
                        }}
                    />
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
                  <Col xs="12" md={{offset:'3',size:'3'}}>
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
      <Table data={rows} columns={columns} loading={false}/>
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
