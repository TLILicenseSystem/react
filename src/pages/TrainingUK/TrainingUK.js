import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container as RsContainer,
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
  SearchPerson,
  LicenseDetail,
} from "../../components/shared";
import { get } from "lodash";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import {
  getLicenseUKHistoryByCid,
  getLicenseSICHistoryByCid,
  getLicenseByCid,
  getLicenseUKByCid,
  getLicenseSICByCid,
} from "../../api/apiGetLicense";

import Swal from "sweetalert2";
import { columns, columnsSIC } from "./columns";
import FormLicense from "./FormLicense";
import FormLicenseIC from "./FormLicenseIC";
import FormResult from "./FormResult";
import FormCreateUser from "../ExamApplication/FormCreateUser";
import { getTrainingByCid } from "../../api/apiTraining";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const TrainingUK = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [currentLicense, setCurrentLicense] = useState(null);
  const [currentLicenseSIC, setCurrentLicenseSIC] = useState(null);
  const [currentTraining, setCurrentTraining] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [license, setLicense] = useState(null);
  const [licenseUK, setLicenseUK] = useState([]);
  const [licenseSIC, setLicenseSIC] = useState([]);

  const [mode, setMode] = useState("add");
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );
  const { seleted } = useSelector((state) => state.selectSalePopup);

  const dispatch = useDispatch();

  useEffect(() => {
    setSaleData(seleted);
    checkStatus(seleted);
    if (seleted && seleted.citizenID) {
      fetchData(seleted.citizenID);
    }
  }, [seleted]);

  const fetchData = async (citizenID) => {
    const current = await getLicenseByCid(citizenID);
    let data = get(current, "data", []);
    setLicense({
      ...get(data, "license", []),
      disapprovePerson: get(data, "disapprovePerson", []),
      moveCompany: get(data, "moveCompanyList", [])[0],
    });
    const currentUK = await getLicenseUKByCid(citizenID);
    data = get(currentUK, "data", []);
    setCurrentLicense({
      ...get(data, "licenseUK", []),
      disapprovePerson: get(data, "disapprovePerson", []),
    });
    const currentSIC = await getLicenseSICByCid(citizenID);
    data = get(currentSIC, "data", [])[0];
    setCurrentLicenseSIC(data);
    const training = await getTrainingByCid("UK", citizenID);
    setCurrentTraining(training);
    onClickAdd();
  };

  const checkStatus = (seleted) => {
    // if (seleted) {
    //   if (
    //     seleted.status === "Q" ||
    //     seleted.status === "M" ||
    //     seleted.status === "D"
    //   )
    //     setDisabled(true);
    //   else setDisabled(false);
    // } else setDisabled(false);
  };

  const onClickCancel = () => {
    setActiveTab("1");
    setMode("add");
    if (saleData && saleData.citizenID) {
      fetchData(saleData.citizenID);
    } else {
      setCurrentLicense(null);
    }
  };
  const onClickAdd = () => {
    setActiveTab("1");
    setMode("add");
  };

  const onClickShowHistory = async () => {
    setActiveTab("2");
    setMode("history");
    if (saleData && saleData.citizenID) {
      const response = await getLicenseUKHistoryByCid(saleData.citizenID);
      let data = get(response, "data", []).map((row, index) => {
        return {
          ...row,
          id: index + 1,
          receiveDate:
            row.receiveDate &&
            dayjs(new Date(row.receiveDate)).format("DD/MM/BBBB"),
          approveDate:
            row.approveDate &&
            dayjs(new Date(row.approveDate)).format("DD/MM/BBBB"),
          offerDate:
            row.offerDate &&
            dayjs(new Date(row.offerDate)).format("DD/MM/BBBB"),
          issueDate:
            row.issueDate &&
            dayjs(new Date(row.issueDate)).format("DD/MM/BBBB"),
          expireDate:
            row.expireDate &&
            dayjs(new Date(row.expireDate)).format("DD/MM/BBBB"),
        };
      });
      setLicenseUK(data);
      setLoading(false);
    }
  };

  const onClickShowHistorySIC = async () => {
    setActiveTab("3");
    setMode("historySIC");
    if (saleData && saleData.citizenID) {
      const response = await getLicenseSICHistoryByCid(saleData.citizenID);
      let data = get(response, "data", []).map((row, index) => {
        return {
          ...row,
          id: index + 1,
          receiveDate:
            row.receiveDate &&
            dayjs(new Date(row.receiveDate)).format("DD/MM/BBBB"),
          approveDate:
            row.approveDate &&
            dayjs(new Date(row.approveDate)).format("DD/MM/BBBB"),
          offerDate:
            row.offerDate &&
            dayjs(new Date(row.offerDate)).format("DD/MM/BBBB"),
          issueDate:
            row.issueDate &&
            dayjs(new Date(row.issueDate)).format("DD/MM/BBBB"),
          expireDate:
            row.expireDate &&
            dayjs(new Date(row.expireDate)).format("DD/MM/BBBB"),
        };
      });
      setLicenseSIC(data);
      setLoading(false);
    }
  };
  const onClickSubmit = async () => {
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
      if (!saleData.licenseNo) {
        Swal.fire({
          icon: "warning",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่พบข้อมูลใบอนุญาตหลัก",
        });
        return;
      }
      if (!currentLicenseSIC || !currentLicenseSIC.licenseNo) {
        Swal.fire({
          icon: "warning",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่พบข้อมูลใบอนุญาตกลต",
        });
        return;
      }
    }

    console.log();
    // let data = {
    //   citizenId: citizenId,
    //   licenseNo: currentLicense.licenseNo,
    //   issueDate: currentLicense.issueDate,
    //   expireDate: currentLicense.expireDate,
    //   offerType: currentLicense.offerType,
    //   approveDate: currentLicense.approveDate
    //     ? dayjs(new Date(currentLicense.approveDate)).format(
    //         "YYYY-MM-DDTHH:mm:ssZ"
    //       )
    //     : dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
    //   receiveDate: currentLicense.receiveDate
    //     ? dayjs(new Date(currentLicense.receiveDate)).format(
    //         "YYYY-MM-DDTHH:mm:ssZ"
    //       )
    //     : dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
    //   offerResult: currentLicense.offerResult,
    //   agentType: saleData.agentType,
    //   remark: currentLicense.remark,
    //   createUserCode: user && user.employeeID,
    //   updateUserCode: user && user.employeeID,
    // };

    // if (currentLicense.disapprovePerson) {
    //   const disapprovePerson = [];
    //   currentLicense.disapprovePerson.map((item) => {
    //     disapprovePerson.push({
    //       citizenId: citizenId,
    //       causeId: item.causeId,
    //       licenseType: currentLicense.offerType,
    //       historyId: currentLicense.historyId,
    //     });
    //   });
    //   data["disapprovePerson"] = disapprovePerson;
    // }

    // if (currentLicense.historyId) {
    //   data["historyId"] = currentLicense.historyId;
    // }

    // const response = await getLicenseULByCid(citizenId);
    // let currentUL = await get(response && response.data, "licenseUL");
    // if (currentUL && currentUL.licenseNo) {
    //   onClickUpdate(data);
    // } else onClickSave(data);
  };
  const onClickSave = async () => {
    // licenseDetail.citizenId = "1122334455667";
    // licenseDetail.createUserCode = "2901133";
    // console.log(licenseDetail);
    // try {
    //   let response = await insertExamApplication(licenseDetail);
    //   Swal.fire("Added!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
    // } catch (err) {
    //   let { data } = err.response;
    //   Swal.fire({
    //     icon: "error",
    //     title: "เกิดข้อผิดพลาด",
    //     text: data.errorMessage
    //       ? data.errorMessage
    //       : "พบข้อผิดพลาดในการบันทึกข้อมูล!",
    //   });
    // }
  };

  const onClickUpdate = async () => {
    // try {
    //   let data = {
    //     citizenId: licenseDetail.citizenId,
    //     scheduleId: licenseDetail.scheduleId,
    //     applyTime: licenseDetail.applyTime,
    //     applicantType: licenseDetail.applicantType,
    //     seatNo: licenseDetail.seatNo,
    //     examResult: licenseDetail.examResult,
    //     remark: licenseDetail.remark,
    //     createUserCode: licenseDetail.createUserCode,
    //     updateUserCode: licenseDetail.updateUserCode,
    //     referenceNo: licenseDetail.referenceNo,
    //   };
    //   let response = await updateExamApplication(licenseDetail);
    //   Swal.fire("Updated!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
    //   onClickCancel();
    //   fetchData();
    // } catch (err) {
    //   let { data } = err.response;
    //   Swal.fire({
    //     icon: "error",
    //     title: "เกิดข้อผิดพลาด",
    //     text: data.errorMessage
    //       ? data.errorMessage
    //       : "พบข้อผิดพลาดในการแก้ไขข้อมูล!",
    //   });
    // }
  };

  return (
    <Container>
      <EditLocationPopup />
      <div className="contents">
        <h2 className="head">ขอรับ/ขอต่อ ใบอนุญาต UK</h2>
        <Card>
          <SearchPerson />
          <CardBody>
            <LicenseDetail
              title="ผลการอบรมความรู้เกี่ยวกับขายกรมธรรม์ประกันชีวิตควบการลงทุน"
              data={currentTraining}
            />
          </CardBody>
          <CardBody>
            <ButtonGroup>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "add"}
                onClick={onClickAdd}
              >
                ขอขึ้นทะเบียน
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "history"}
                onClick={onClickShowHistory}
              >
                ประวัติ คปภ.
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "historySIC"}
                onClick={onClickShowHistorySIC}
              >
                ประวัติ ก.ล.ต.
              </Button>
            </ButtonGroup>
          </CardBody>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <CardBody>
                  <CardBody>
                    <FormLicenseIC
                      currentLicense={currentLicenseSIC}
                      licenseDetail={license}
                      expireDate={saleData && saleData.expireDate}
                      onChange={(v) => setCurrentLicenseSIC(v)}
                    />
                  </CardBody>
                  <CardBody>
                    <FormLicense
                      currentLicense={currentLicense}
                      licenseDetail={license}
                      expireDate={saleData && saleData.expireDate}
                      onChange={(v) => setCurrentLicense(v)}
                    />
                  </CardBody>
                  <CardBody>
                    <FormResult
                      currentLicense={currentLicense}
                      onChange={(v) => setCurrentLicense(v)}
                    />
                  </CardBody>
                  <CardBody>
                    <RsContainer>
                      <Row sm="1">
                        <Col sm="9">
                          <FormGroup>
                            <label className={styles.label}>หมายเหตุ</label>
                            <Input
                              type="text"
                              name="remark"
                              disabled={
                                get(currentLicense, "offerType", null)
                                  ? false
                                  : true
                              }
                              value={get(currentLicense, "remark", "")}
                              onChange={(e) =>
                                setCurrentLicense({
                                  ...currentLicense,
                                  remark: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormCreateUser mode={"history"} data={currentLicense} />
                    </RsContainer>
                    <CardBody style={{ textAlign: "right" }}>
                      <RsContainer>
                        <SubmitButton
                          disabled={disabled}
                          title="บันทึก"
                          onClick={onClickSubmit}
                        />{" "}
                        <CancelButton title="ยกเลิก" onClick={onClickCancel} />
                      </RsContainer>
                    </CardBody>
                  </CardBody>
                </CardBody>
              </TabPane>
              <TabPane tabId="2">
                <CardBody>
                  <Table
                    id="historyUK"
                    data={licenseUK}
                    columns={columns}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
              <TabPane tabId="3">
                <CardBody>
                  {" "}
                  <Table
                    id="historySIC"
                    data={licenseSIC}
                    columns={columnsSIC}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
            </TabContent>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default TrainingUK;
