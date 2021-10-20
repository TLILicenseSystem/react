import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Container as RsContainer,
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
  SearchPerson,
} from "../../components/shared";
import { get } from "lodash";
import { showSearchSchedulePopup } from "../../redux/actions";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import {
  getExamApplication,
  insertExamApplication,
  updateExamApplication,
  deleteExamApplication,
} from "./ModelExamApplication";
// import { getExamResult} from "../../api/apiGetConfig"
import Swal from "sweetalert2";

import FormSchedule from "./FormSchedule";
import FormPayment from "./FormPayment";
import moment from "moment";
import FormCreateUser from "./FormCreateUser";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const ExamApplication = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("2");
  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [mode, setMode] = useState("history");
  const [disabled, setDisabled] = useState(false);
  const [application, setApplication] = useState([]);
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );

  const { seleted } = useSelector((state) => state.selectSalePopup);
  const dispatch = useDispatch();

  const columns = [
    {
      field: "examDateFormat",
      headerName: "วันที่สอบ",
      minWidth: 140,
      valueGetter: (params) =>
        `${dayjs(params.getValue(params.id, "examDate")).format("DD/MM/BBBB")}`,
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
      field: "seatNoStr",
      headerName: "เลขที่นั่งสอบ",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "examResultName",
      headerName: "ผลสอบ",
      minWidth: 140,
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
    if (saleData && saleData.citizenID) {
      fetchData(saleData.citizenID);
    }
  }, []);

  useEffect(() => {
    setSaleData(seleted);
    checkStatus(seleted);
    if (seleted && seleted.citizenID) {
      fetchData(seleted.citizenID);
    }
  }, [seleted]);

  const fetchData = async (citizenID) => {
    setLoading(true);
    const response = await getExamApplication(citizenID);
    setApplication(response);
    setLoading(false);
  };

  const checkStatus = (seleted) => {
    if (seleted) {
      if (
        seleted.status === "Q" ||
        seleted.status === "M" ||
        seleted.status === "D"
      )
        setDisabled(true);
      else setDisabled(false);
    } else setDisabled(false);
  };

  const rows = application.map((row) => {
    return { id: row.scheduleId, ...row };
  });

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

  const onClickChangeSchedule = (values) => {
    if (scheduleDetail) {
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
        scheduleId: scheduleDetail.scheduleId,
        newScheduleId: values.scheduleId,
        timeStr: values.timeStr,
      });
    } else {
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
        scheduleId: values.scheduleId,
        newScheduleId: values.scheduleId,
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
        description: mode,
      })
    );
  };

  const onClickSave = async () => {
    if (
      !scheduleDetail.newScheduleId ||
      scheduleDetail.newScheduleId === null ||
      scheduleDetail.newScheduleId === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาเลือกตารางสอบ",
      });
      return;
    }
    if (
      !scheduleDetail.seatNoStr ||
      scheduleDetail.seatNoStr === null ||
      scheduleDetail.seatNoStr === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุเลขที่นั่งสอบ",
      });
      return;
    }
    if (
      !scheduleDetail.examResult ||
      scheduleDetail.examResult === null ||
      scheduleDetail.examResult === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาเลือกข้อมูลผลสอบ",
      });
      return;
    }
    if (
      !scheduleDetail.remark ||
      scheduleDetail.remark === null ||
      scheduleDetail.remark === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุหมายเหตุ",
      });
      return;
    }

    let citizenId = "";
    if (!saleData) {
      if (sessionStorage.getItem("sale")) {
        let stored = JSON.parse(sessionStorage.getItem("sale"));
        citizenId = stored.citizenID;
        if (
          stored.status === "Q" ||
          stored.status === "M" ||
          stored.status === "D"
        ) {
          Swal.fire({
            icon: "warning",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
          });
          return;
        }
        setSaleData(stored);
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "กรุณาเลือกข้อมูลผู้สมัคร",
        });
        return;
      }
    } else {
      citizenId = saleData.citizenID;
      if (
        saleData.status === "Q" ||
        saleData.status === "M" ||
        saleData.status === "D"
      ) {
        Swal.fire({
          icon: "warning",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
        });
        return;
      }
    }

    try {
      const inputPost = {
        citizenId: citizenId,
        scheduleId: scheduleDetail.newScheduleId
          ? scheduleDetail.newScheduleId
          : scheduleDetail.scheduleId,
        applyTime: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
        applicantType: "0",
        seatNoStr: scheduleDetail.seatNoStr,
        examResult: scheduleDetail.examResult,
        remark: scheduleDetail.remark,
        createUserCode: "2901133",
        updateUserCode: "2901133",
        referenceNo: "",
      };

      let response = await insertExamApplication(inputPost);
      Swal.fire("Added!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      onClickCancel();
      fetchData(citizenId);
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
    if (
      !scheduleDetail.newScheduleId ||
      scheduleDetail.newScheduleId === null ||
      scheduleDetail.newScheduleId === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาเลือกตารางสอบ",
      });
      return;
    }
    if (scheduleDetail.seatNoStr === null || scheduleDetail.seatNoStr === "") {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุเลขที่นั่งสอบ",
      });
      return;
    }
    if (
      scheduleDetail.examResult === null ||
      scheduleDetail.examResult === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาเลือกข้อมูลผลสอบ",
      });
      return;
    }
    if (scheduleDetail.remark === null || scheduleDetail.remark === "") {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุหมายเหตุ",
      });
      return;
    }
    let citizenId = "";
    if (!saleData) {
      if (sessionStorage.getItem("sale")) {
        let stored = JSON.parse(sessionStorage.getItem("sale"));
        citizenId = stored.citizenID;
        if (
          stored.status === "Q" ||
          stored.status === "M" ||
          stored.status === "D"
        ) {
          Swal.fire({
            icon: "warning",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
          });
          return;
        }
        setSaleData(stored);
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "กรุณาเลือกข้อมูลผู้สมัคร",
        });
        return;
      }
    } else {
      citizenId = saleData.citizenID;
      if (
        saleData.status === "Q" ||
        saleData.status === "M" ||
        saleData.status === "D"
      ) {
        Swal.fire({
          icon: "warning",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
        });
        return;
      }
    }
    try {
      const inputPost = {
        citizenId: citizenId,
        scheduleId: scheduleDetail.scheduleId,
        newScheduleId: scheduleDetail.newScheduleId,
        applyTime: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
        applicantType: "0",
        seatNoStr: scheduleDetail.seatNoStr,
        examResult: scheduleDetail.examResult,
        remark: scheduleDetail.remark,
        createUserCode: "2901133",
        updateUserCode: "2901133",
        referenceNo: "",
      };
      // if (scheduleDetail.newScheduleId !== scheduleDetail.scheduleId)
      //   inputPost["newScheduleId"] = scheduleDetail.newScheduleId;

      let response = await updateExamApplication(inputPost);
      Swal.fire("Updated!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");

      onClickCancel();
      fetchData(citizenId);
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

  const deleteDeleteExamApplication = async () => {
    try {
      let { scheduleId } = scheduleDetail;
      let { citizenID } = saleData;
      const response = await deleteExamApplication(citizenID, scheduleId);
      Swal.fire("Canceled!", "ยกเลิกการสมัครสอบเรียบร้อยแล้ว", "success");
      onClickCancel();
      fetchData(citizenID);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "พบข้อผิดพลาดในยกเลิกการสมัครสอบ!",
      });
    }
  };
  const onClickDeleteExamApplication = async () => {
    let { examDate } = scheduleDetail;
    const { value: check } = await Swal.fire({
      text: `ต้องการยกเลิกการสมัครสอบวันที่ ${dayjs(new Date(examDate)).format(
        "DD-MM-BBBB"
      )} ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d9534f",
      confirmButtonColor: "#0275d8",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });
    if (check) {
      deleteDeleteExamApplication();
    }
  };

  return (
    <Container>
      <EditLocationPopup />
      <div className="contents">
        <h2 className="head">สมัครสอบ</h2>
        <Card>
          <SearchPerson />
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
                  </Button>{" "}
                  {mode === "history" && (
                    <Button
                      size="sm"
                      color="secondary"
                      style={{ display: "inline" }}
                      onClick={() => onClickDeleteExamApplication()}
                    >
                      ยกเลิกการสมัครสอบ
                    </Button>
                  )}
                  <FormSchedule scheduleDetail={scheduleDetail} />
                </CardBody>
                <CardBody>
                  <FormPayment />
                </CardBody>
                <CardBody>
                  <RsContainer>
                    <hr />
                    <Row sm="4">
                      <Col>
                        <FormGroup>
                          <label className={styles.label}>
                            เลขที่นั่งสอบ{" "}
                            <label className={styles.required}> *</label>
                          </label>
                          <Input
                            type="text"
                            name="seatNoStr"
                            disabled={disabled}
                            value={get(scheduleDetail, "seatNoStr", "")}
                            onChange={(e) =>
                              setScheduleDetail({
                                ...scheduleDetail,
                                seatNoStr: /^([0-9]*)$/.test(e.target.value)
                                  ? e.target.value.length > 6
                                    ? e.target.value.substr(0, 6)
                                    : e.target.value
                                  : "",
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup style={{ paddingTop: "10px" }}>
                          <DropdownExamResult
                            label="ผลสอบ"
                            disabled={disabled}
                            value={get(scheduleDetail, "examResult", "")}
                            requiredField={true}
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
                              get(scheduleDetail, "applyTime", "")
                                ? dayjs(
                                    get(scheduleDetail, "applyTime", "")
                                  ).format("DD/MM/BBBB HH:mm:ss")
                                : ""
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row sm="1">
                      <Col sm="9">
                        <FormGroup>
                          <label className={styles.label}>
                            หมายเหตุ{" "}
                            <label className={styles.required}> *</label>
                          </label>
                          <Input
                            type="text"
                            name="remark"
                            disabled={disabled}
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
                  </RsContainer>
                </CardBody>

                <CardBody>
                  <RsContainer>
                    <FormCreateUser mode={mode} data={scheduleDetail} />
                  </RsContainer>
                </CardBody>
                <CardBody style={{ textAlign: "right" }}>
                  <RsContainer>
                    <SubmitButton
                      disabled={
                        disabled ||
                        scheduleDetail === null ||
                        scheduleDetail === ""
                      }
                      title="บันทึก"
                      onClick={mode === "history" ? onClickUpdate : onClickSave}
                    />{" "}
                    <CancelButton title="ยกเลิก" onClick={onClickCancel} />
                  </RsContainer>
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
