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
  Container,
  EditLocationPopup,
  CancelButton,
  SubmitButton,
  Table,
  SearchPerson,
  LicenseDetail,
} from "../../components/shared";
import { get } from "lodash";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import Swal from "sweetalert2";
import { columns } from "./columns";
import From3 from "./Form3";
import FormLicense from "./FormLicense";
import FormResult from "./FormResult";
import FormCreateUser from "../ExamApplication/FormCreateUser";
import { getTrainingByCid } from "../../api/apiTraining";
import { getLicenseByCid } from "../../api/apiGetLicense";
import {
  insertTrainingLicenseUL,
  updateTrainingLicenseUL,
} from "./ModelTrainingLicenseUL";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const TrainingUL = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [currentLicense, setCurrentLicense] = useState(null);
  const [license, setLicense] = useState(null);

  const [currentTraining, setCurrentTraining] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [mode, setMode] = useState("add");
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );
  const [user, setUser] = useState(
    sessionStorage.getItem("updateUser")
      ? JSON.parse(sessionStorage.getItem("updateUser"))
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
    const training = await getTrainingByCid(citizenID);
    setCurrentTraining(training);
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

  const onClickCancel = () => {
    setCurrentLicense(null);
    setActiveTab("1");
    setMode("add");
  };
  const onClickAdd = () => {
    setCurrentLicense(null);
    setActiveTab("1");
    setMode("add");
  };

  const onClickShowHistory = () => {
    setCurrentLicense(null);
    setActiveTab("2");
    setMode("history");
  };

  const onClickShowDetail = () => {
    setCurrentLicense(null);
    setActiveTab("3");
    setMode("detail");
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
    }
    let data = {
      citizenId: citizenId,
      licenseNo: currentLicense.licenseNo,
      issueDate: currentLicense.issueDate,
      expireDate: currentLicense.expireDate,
      offerType: currentLicense.offerType,
      approveDate: currentLicense.approveDate
        ? dayjs(new Date(currentLicense.approveDate)).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          )
        : dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
      receiveDate: currentLicense.receiveDate
        ? dayjs(new Date(currentLicense.receiveDate)).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          )
        : dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
      offerResult: currentLicense.offerResult,
      agentType: saleData.agentType,
      remark: currentLicense.remark,
      createUserCode: user && user.employeeID,
      updateUserCode: user && user.employeeID,
    };

    if (currentLicense.disapprovePerson) {
      const disapprovePerson = [];
      currentLicense.disapprovePerson.map((item) => {
        disapprovePerson.push({
          citizenId: citizenId,
          causeId: item.causeId,
          licenseType: currentLicense.offerType,
          historyId: currentLicense.historyId,
        });
      });
      data["disapprovePerson"] = disapprovePerson;
    }
    console.log(data);

    if (currentLicense.historyId) {
      data["historyId"] = currentLicense.historyId;
      onClickUpdate(data);
    } else {
      onClickSave(data);
    }
  };
  const onClickSave = async (data) => {
    try {
      let response = await insertTrainingLicenseUL(data);
      Swal.fire("Added!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      if (saleData && saleData.citizenID) {
        fetchData(saleData.citizenID);
      }
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

  const onClickUpdate = async (data) => {
    try {
      let response = await insertTrainingLicenseUL(data);
      Swal.fire("Updated!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
      if (saleData && saleData.citizenID) {
        fetchData(saleData.citizenID);
      }
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
        <h2 className="head">ขอรับ/ขอต่อ ใบอนุญาต UL</h2>
        <Card>
          <SearchPerson />
          <CardBody>
            <LicenseDetail
              title="ผลการอบรมหลักสูตร UL"
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
                ประวัติ
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "detail"}
                onClick={onClickShowDetail}
              >
                ตรวจสอบคุณสมบัติ
              </Button>
            </ButtonGroup>
          </CardBody>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <CardBody>
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
                  {" "}
                  <Table
                    id="scheduleId"
                    data={[]}
                    columns={columns}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
              <TabPane tabId="3">
                <CardBody>
                  <From3 />
                </CardBody>
              </TabPane>
            </TabContent>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default TrainingUL;
