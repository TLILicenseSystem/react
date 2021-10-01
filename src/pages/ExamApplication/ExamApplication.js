import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  ButtonGroup,
  TabContent,
  TabPane,
  FormGroup,
} from "reactstrap";
import {
  SearchSchedulePopup,
  DropdownExamResult,
  Container,
  EditLocationPopup,
  EditButton,
  CancelButton,
  SubmitButton,
  FilterCollapse,
  PersonelData,
  Table,
  SearchSales,
} from "../../components/shared";
import { get } from "lodash";
import { showSearchSchedulePopup } from "../../redux/actions";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import {
  getExamApplication,
  insertExamApplication,
  updateExamApplication,
} from "./ModelExamApplication";
// import { getExamResult} from "../../api/apiGetConfig"
import Swal from "sweetalert2";

import FormSchedule from "./FormSchedule";
import FormPayment from "./FormPayment";
import moment from "moment";

const ExamApplication = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("2");
  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [mode, setMode] = useState("history");
  const [application, setApplication] = useState([]);
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );
  const dispatch = useDispatch();
  //getExamResult()

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
      minWidth: 100,
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
      field: "locationDetail",
      headerName: "สถานที่ตั้งสอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },

    {
      field: "seatNo",
      headerName: "เลขที่นั่งสอบ",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "examResultName",
      headerName: "ผลสอบ",
      minWidth: 100,
      align: "left",
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
        return (
          <EditButton
            title="เลือก"
            onClick={() => onClickEditExamApplication(cellValues.row)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if(saleData && saleData.citizenID){
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await getExamApplication(saleData.citizenID);
    setApplication(response);
    setLoading(false);
  };

  const rows = application.map((row) => {
    return { id: row.scheduleId, ...row };
  });
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onClickAddExamApplication = () => {
    setScheduleDetail(null);
    setActiveTab("1");
    setMode("add");
  };

  const onClickShowExamApplication = () => {
    setScheduleDetail(null);
    setActiveTab("2");
    setMode("history");
  };

  const onClickChangeSchedule =  (values) => {
    if(scheduleDetail){
      setScheduleDetail({
        ...scheduleDetail,
        alteredLocationId: values.alteredLocationId,
        examDate: values.examDate,
        locationId: values.locationId,
        locationDetail: values.locationDetail,
        orgCode: values.orgCode,
        orgName: values.orgName,
        provinceCode: values.provinceCode,
        provinceName: values.provinceName,
        regionCode: values.regionCode,
        regionName: values.regionName,
        roundId: values.roundId,
        scheduleId : scheduleDetail.scheduleId,
        newScheduleId: values.scheduleId,
        timeStr: values.timeStr,
      });
    }else{
      setScheduleDetail({
        alteredLocationId: values.alteredLocationId,
        examDate: values.examDate,
        locationId: values.locationId,
        locationDetail: values.locationDetail,
        orgCode: values.orgCode,
        orgName: values.orgName,
        provinceCode: values.provinceCode,
        provinceName: values.provinceName,
        regionCode: values.regionCode,
        regionName: values.regionName,
        roundId: values.roundId,
        scheduleId : values.scheduleId,
        timeStr: values.timeStr,
      });
    }
     
  };
  const onClickEditExamApplication = (values) => {
    setScheduleDetail(values);
    setActiveTab("1");
    setMode("history");
  };
  const onClickCancel = () => {
    setScheduleDetail(null);
    setActiveTab("2");
    setMode("history");
  };

  const onClickChangeLocation = () => {
    dispatch(
      showSearchSchedulePopup({
        title: "ค้นหาตารางสอบ",
        description: "",
      })
    );
  };
  const onClickSave = async () => {
    try {
      const inputPost = {
        "citizenId":saleData.citizenID,
        "scheduleId":scheduleDetail.scheduleId,    
        "applyTime":"2021-09-15T12:47:56",
        "applicantType":"0",
        "seatNo":scheduleDetail.seatNo,
        "examResult":scheduleDetail.examResult,
        "remark": scheduleDetail.remark,
        "createUserCode":"2901133",
        "updateUserCode":"2901133",
        "referenceNo":""
    } 
      let response = await insertExamApplication(inputPost);
      Swal.fire("Added!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      onClickCancel();
      fetchData();
    } catch (err) {
      let { data } = err.response;
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: data.errorMessage
          ? data.errorMessage
          : "พบข้อผิดพลาดในการบันทึกข้อมูล!",
      });
    }
  };

  const onClickUpdate = async () => {
    try {
      const inputPost = {
        "citizenId":saleData.citizenID,
        "scheduleId":scheduleDetail.scheduleId,     
        "applyTime":"2021-09-15T12:47:56",
        "applicantType":"0",
        "seatNo":scheduleDetail.seatNo,
        "examResult":scheduleDetail.examResult,
        "remark": scheduleDetail.remark,
        "createUserCode":"2901133",
        "updateUserCode":"2901133",
        "referenceNo":""
    } 
      if(scheduleDetail.newScheduleId !== scheduleDetail.scheduleId)
      inputPost["newScheduleId"] =scheduleDetail.newScheduleId

      let response = await updateExamApplication(inputPost);
      Swal.fire("Updated!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
      
      onClickCancel();
      fetchData();
    } catch (err) {
      let { data } = err.response;
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: data.errorMessage
          ? data.errorMessage
          : "พบข้อผิดพลาดในการแก้ไขข้อมูล!",
      });
    }
  };

  return (
    <Container>
      <EditLocationPopup />
      <div className="contents">
        <h2 className="head">สมัครสอบ</h2>
        <Card>
          {/* <CardBody>
            <FilterCollapse title="ตัวกรองข้อมูล">
              <SearchSales onSearch={onSearchSale} />  
          </CardBody>

          <CardBody>
            <PersonelData />
          </CardBody> */}
          <SearchSales />

          <CardBody>
            <ButtonGroup>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "add"}
                onClick={onClickAddExamApplication}
              >
                สมัครสอบ
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "history"}
                onClick={onClickShowExamApplication}
              >
                ประวัติ
              </Button>
            </ButtonGroup>
          </CardBody>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <CardBody>
                  <Button
                    size="sm"
                    outline
                    color="secondary"
                    style={{ display: "inline" }}
                    onClick={() => onClickChangeLocation()}
                  >
                    <i class="fas fa-search" type="button"></i> ค้นหาตารางสอบ
                  </Button>
                  <FormSchedule scheduleDetail={scheduleDetail} />
                </CardBody>
                <CardBody>
                  <FormPayment />
                </CardBody>
                <CardBody
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  <hr />
                  <Row sm="4">
                    <Col>
                      <FormGroup>
                        <label className={styles.label}>เลขที่นั่งสอบ</label>
                        <Input
                          type="tel"
                          name="seatNo"
                          value={get(scheduleDetail, "seatNo", "")}
                          onChange={(e) =>
                            setScheduleDetail({
                              ...scheduleDetail,
                              seatNo: e.target.value,
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup style={{ paddingTop: "10px" }}>
                        <DropdownExamResult
                          label="ผลสอบ"
                          value={get(scheduleDetail, "examResult", "")}
                          onClick={(v) =>
                            setScheduleDetail({
                              ...scheduleDetail,
                              examResult: v.resultId,
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label className={styles.label}>
                          เวลาที่ยื่นสมัครสอบ
                        </label>
                        <Input
                          readOnly={true}
                          type="text"
                          name="applyTime"
                          value={
                            scheduleDetail &&
                            get(scheduleDetail, "applyTime", "") ?
                            moment(get(scheduleDetail, "applyTime", "")).format(
                              "DD/MM/yyyy HH:mm:ss"
                            ) :  null
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row sm="1">
                    <Col sm="9">
                      <FormGroup>
                        <label className={styles.label}>หมายเหตุ</label>
                        <Input
                          type="text"
                          name="remark"
                          value={get(scheduleDetail, "remark", "")}
                          onChange={(e) =>
                            setScheduleDetail({
                              ...scheduleDetail,
                              remark: e.target.value,
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>

                <CardBody
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  <Row sm="6">
                    <Col>
                      <FormGroup>
                        <label className={styles.label}>ผู้บันทึก</label>
                        <Input
                          readOnly={true}
                          type="text"
                          name="code"
                          value={
                            mode === "history"
                              ? get(scheduleDetail, "updateUserCode", "")
                              : get(scheduleDetail, "createUserCode", "")
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label className={styles.label}>สาขา</label>
                        <Input
                          readOnly={true}
                          type="text"
                          // name="provinceName"
                          // value={get(scheduleDetail, "provinceName", "")}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label className={styles.label}>วันที่บันทึก</label>
                        <Input
                          readOnly={true}
                          type="text"
                          name="time"
                          value={
                            get(scheduleDetail, "lastUpdate", "") &&
                            get(scheduleDetail, "createTime", "") &&
                            (mode === "history"
                              ? moment(
                                  get(scheduleDetail, "lastUpdate", "")
                                ).format("DD/MM/yyyy")
                              : moment().format("DD/MM/yyyy"))
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody style={{ textAlign: "right" }}>
                  <SubmitButton
                    disabled={scheduleDetail === null || scheduleDetail === ""}
                    title="บันทึก"
                    onClick={mode === "history" ? onClickUpdate : onClickSave}
                  />{" "}
                  <CancelButton title="ยกเลิก" onClick={onClickCancel} />
                </CardBody>
              </TabPane>
              <TabPane tabId="2">
                <CardBody>
                  <Table
                    id="scheduleId"
                    data={rows}
                    columns={columns}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
            </TabContent>
          </div>
        </Card>
      </div>
      <SearchSchedulePopup onChange={onClickChangeSchedule} />
    </Container>
  );
};

export default ExamApplication;
