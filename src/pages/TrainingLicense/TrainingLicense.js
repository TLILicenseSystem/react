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
  Table,
  SearchPerson,
  StructData,
  LicenseDetail,
  SubmitButton,
  CancelButton,
} from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";

import { showSearchSchedulePopup } from "../../redux/actions";
import {
  getLicenseHistoryByCid,
  getLicenseByCid,
} from "../../api/apiGetLicense";
import {
  insertTrainingLicense,
  updateTrainingLicense,
} from "./ModelTrainingLicense";
import Swal from "sweetalert2";
import { columns, columns_company } from "./columns";
import { get } from "lodash";
import FormLicense from "./FormLicense";
import FormCompany from "./FormCompany";
import FormPayment from "../ExamApplication/FormPayment";
import FormCreateUser from "../ExamApplication/FormCreateUser";
import FormResult from "./FormResult";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const TrainingLicense = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [currentLicense, setCurrentLicense] = useState(null);
  const [mode, setMode] = useState("add");
  const [license, setLicense] = useState([]);
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );

  const { seleted } = useSelector((state) => state.selectSalePopup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (saleData && saleData.citizenID) {
      fetchData(saleData.citizenID);
    }
  }, []);

  useEffect(() => {
    setSaleData(seleted);
    if (seleted && seleted.citizenID) {
      fetchData(seleted.citizenID);
    }
  }, [seleted]);

  const fetchData = async (citizenID) => {
    setLoading(true);
    const response = await getLicenseHistoryByCid(citizenID);
    let data = get(response, "data", []).map((row, index) => {
      return {
        ...row,
        offerDate: dayjs(new Date(row.offerDate)).format("DD-MM-BBBB"),
        issueDate: dayjs(new Date(row.issueDate)).format("DD-MM-BBBB"),
        expireDate: dayjs(new Date(row.expireDate)).format("DD-MM-BBBB"),
        bookDate: dayjs(new Date(row.bookDate)).format("DD-MM-BBBB"),
      };
    });
    setLicense(data);
    setLoading(false);
    const current = await getLicenseByCid(citizenID);
    data = get(current, "data", []);
    setCurrentLicense(get(data, "license", []));
  };

  const rows = license.map((row, index) => {
    return { id: index + 1, ...row };
  });

  const onClickCancel = () => {
    setActiveTab("1");
    setMode("add");
  };
  const onClickAdd = () => {
    setActiveTab("1");
    setMode("add");
  };

  const onClickShowHistory = () => {
    setActiveTab("2");
    setMode("history");
  };
  const onClickShowHistoryCompany = () => {
    setActiveTab("3");
    setMode("historycompany");
  };

  const onClickShowDetail = () => {
    setActiveTab("4");
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
    }
    let data = {
      citizenId: citizenId,
      licenseNo: null,
      issueDate: null,
      expireDate: null,
      offerType: currentLicense.offerType,
      offerDate: currentLicense.offerDate
        ? dayjs(new Date(currentLicense.offerDate)).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          )
        : dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
      offerResult: currentLicense.offerResult,
      agentType: saleData.agentType,
      bookNo: currentLicense.bookNo,
      bookDate: currentLicense.bookDate
        ? dayjs(new Date(currentLicense.bookDate)).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          )
        : dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ"),
      referenceNo: "",
      remark: currentLicense.remark,
      createUserCode: "9123456",
      updateUserCode: "9123456",
    };

    if (currentLicense.licenseNo) {
      data["licenseNo"] = currentLicense.licenseNo;
      data["issueDate"] = dayjs(new Date(currentLicense.issueDate)).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      );
      data["expireDate"] = dayjs(new Date(currentLicense.expireDate)).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      );
    }
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
    if (currentLicense.historyId) {
      data["historyId"] = currentLicense.historyId;
    }
    if (currentLicense.licenseNo) {
      data["licenseNo"] = currentLicense.licenseNo;
      data["issueDate"] = dayjs(new Date(currentLicense.issueDate)).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      );
      data["expireDate"] = dayjs(new Date(currentLicense.expireDate)).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      );
      onClickUpdate(data);
    } else {
      onClickSave(data);
    }
  };
  const onClickSave = async (data) => {
    try {
      let response = await insertTrainingLicense(data);
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
      let response = await updateTrainingLicense(data);
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
        <h2 className="head">ขอรับ/ขอต่อ ใบอนุญาต</h2>
        <Card>
          <SearchPerson />
          {/* <CardBody>
            <LicenseDetail title="ผลการอบรมหลักสูตร ขอรับ/ขอต่อ" />
          </CardBody> */}
          <CardBody>
            <ButtonGroup>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "add"}
                onClick={onClickAdd}
              >
                ขอรับ/ขอต่อ
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
                active={mode === "historycompany"}
                onClick={onClickShowHistoryCompany}
              >
                ประวัติการย้ายบริษัท
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "detail"}
                onClick={onClickShowDetail}
              >
                สายงานการบังคับบัญชา
              </Button>
            </ButtonGroup>
          </CardBody>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <CardBody>
                  <FormLicense
                    currentLicense={currentLicense}
                    expireDate={saleData && saleData.expireDate}
                    onChange={(v) => setCurrentLicense(v)}
                  />
                </CardBody>
                <CardBody>
                  <FormCompany
                    currentLicense={currentLicense}
                    expireDate={saleData && saleData.expireDate}
                    onChange={(v) => setCurrentLicense(v)}
                  />
                </CardBody>
                <CardBody>
                  <FormPayment />
                </CardBody>
                <CardBody>
                  <FormResult
                    currentLicense={currentLicense}
                    onChange={(v) => setCurrentLicense(v)}
                  />
                </CardBody>
                <CardBody>
                  <RsContainer>
                    <FormCreateUser mode={"history"} data={currentLicense} />
                    <hr />
                  </RsContainer>
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
                        // disabled={
                        //   disabled ||
                        //   scheduleDetail === null ||
                        //   scheduleDetail === ""
                        // }
                        title="บันทึก"
                        // onClick={mode === "history" ? onClickUpdate : onClickSave}
                        onClick={onClickSubmit}
                      />{" "}
                      <CancelButton title="ยกเลิก" onClick={onClickCancel} />
                    </RsContainer>
                  </CardBody>
                </CardBody>
              </TabPane>
              <TabPane tabId="2">
                <CardBody>
                  <Table
                    id="license"
                    data={rows}
                    columns={columns}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
              <TabPane tabId="3">
                <CardBody>
                  <Table
                    id="companyId"
                    data={[]}
                    columns={columns_company}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
              <TabPane tabId="4">
                <CardBody style={{ margin: "1em 3em", padding: "1em 4em" }}>
                  <StructData />
                </CardBody>
              </TabPane>
            </TabContent>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default TrainingLicense;
