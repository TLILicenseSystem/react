import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

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
  Label,
} from "reactstrap";
import {
  SearchSchedulePopup,
  DropdownExamRegion,
  DropdownExamOrganizer,
  Container,
  EditLocationPopup,
  EditButton,
  DeleteButton,
  AddButton,
  CancelButton,
  SubmitButton,
  FilterCollapse,
  PersonelData,
  Table,
} from "../../components/shared";
import { get } from "lodash";
import { showSearchSchedulePopup } from "../../redux/actions";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";

import SearchSalesDlg from "./SearchSalesDlg";
import FormSchedule from "./FormSchedule";
import FormPayment from "./FormPayment";
import moment from "moment";

const ExamApplication = (props) => {
  const [activeTab, setActiveTab] = useState("2");
  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [mode, setMode] = useState(null);
  const dispatch = useDispatch();

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
      minWidth: 120,
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
            onClick={() => onClickEditSchedule(cellValues.row)}
          />
        );
      },
    },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onClickEditSchedule = (values) => {
    setScheduleDetail(values);
    setActiveTab("1");
    setMode("edit");
  };

  const onClickCancel = () => {
    setScheduleDetail(null);
    setActiveTab("2");
    setMode(null);
  };

  const onClickChangeLocation = () => {
    dispatch(
      showSearchSchedulePopup({
        title: "ค้นหาตารางสอบ",
        description: "",
      })
    );
  };
  return (
    <Container>
      <EditLocationPopup />
      <div className="contents">
        <h2 className="head">สมัครสอบ</h2>
        <Card>
          <CardBody>
            <FilterCollapse title="ตัวกรองข้อมูล">
              <SearchSalesDlg />
            </FilterCollapse>
          </CardBody>

          <CardBody>
            <PersonelData />
          </CardBody>
          <CardBody>
            <ButtonGroup>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={activeTab === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                สมัครสอบ
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={activeTab === "2"}
                onClick={() => {
                  toggle("2");
                }}
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
                          type="text"
                          name="seatNo"
                          value={get(scheduleDetail, "seatNo", "")}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label className={styles.label}>ผลสอบ</label>
                        <Input
                          type="text"
                          name="examResult"
                          value={get(scheduleDetail, "examResultName", "")}
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
                            moment(get(scheduleDetail, "applyTime", "")).format(
                              "DD/MM/yyyy HH:mm:ss"
                            )
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
                            mode === "edit"
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
                            scheduleDetail &&
                            (mode === "edit"
                              ? moment(
                                  get(scheduleDetail, "lastUpdate", "")
                                ).format("DD/MM/yyyy")
                              : moment(
                                  get(scheduleDetail, "createTime", "")
                                ).format("DD/MM/yyyy"))
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody style={{ textAlign: "right" }}>
                  <SubmitButton
                    // disabled={
                    //   props.invalid || props.pristine || props.submitting
                    // }
                    title="บันทึก"
                    onClick={() => console.log("dd")}
                  />{" "}
                  <CancelButton title="ยกเลิก" onClick={onClickCancel} />
                </CardBody>
              </TabPane>
              <TabPane tabId="2">
                <CardBody>
                  <Table
                    id="scheduleId"
                    data={[
                      {
                        id: 4,
                        citizenId: "1122334455667",
                        scheduleId: 4,
                        examDate: "2021-09-28T17:00:00.000+00:00",
                        timeStr: "15:30-17:31",
                        locationId: "6",
                        provinceName: "ระยอง",
                        orgName: "สมาคมประกันชีวิตไทย",
                        locationDetail: "test โดยชานน",
                        applyTime: "2021-08-06T17:00:00.000+00:00",
                        applicantType: 1,
                        seatNo: 1,
                        examResult: "2",
                        examResultName: "ทุจริต",
                        remark: "ทดสอบประวัติสอบ2",
                        createUserCode: "2901133",
                        createTime: "2021-09-14T17:00:00.000+00:00",
                        updateUserCode: "2901133",
                        lastUpdate: "2021-09-14T17:00:00.000+00:00",
                        referenceNo: 1,
                      },
                      {
                        id: 5,
                        citizenId: "1122334455667",
                        scheduleId: 5,
                        examDate: "2021-04-30T17:00:00.000+00:00",
                        timeStr: "15:00-17:00",
                        locationId: "2",
                        provinceName: "กรุงเทพมหานคร",
                        orgName: "สำนักงานใหญ่",
                        locationDetail: "ทดสอบโดยชานน2",
                        applyTime: "2021-08-06T17:00:00.000+00:00",
                        applicantType: 1,
                        seatNo: 1,
                        examResult: "1",
                        examResultName: "ไม่เข้าสอบ",
                        remark: "ทดสอบประวัติสอบ",
                        createUserCode: "2901133",
                        createTime: "2021-09-14T17:00:00.000+00:00",
                        updateUserCode: "2901133",
                        lastUpdate: "2021-09-14T17:00:00.000+00:00",
                        referenceNo: 1,
                      },
                    ]}
                    columns={columns}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
            </TabContent>
          </div>
        </Card>
      </div>
      <SearchSchedulePopup onChange={() => console.log("Eee")} />
    </Container>
  );
};

export default ExamApplication;
