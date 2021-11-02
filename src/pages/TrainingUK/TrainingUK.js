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
import { showSearchSchedulePopup } from "../../redux/actions";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
// import {
//   getExamApplication,
//   insertExamApplication,
//   updateExamApplication,
// } from "./ModelExamApplication";
// import { getExamResult} from "../../api/apiGetConfig"
import Swal from "sweetalert2";
import { columns } from "./columns";
import FormLicense from "./FormLicense";
import FormResult from "./FormResult";
import FormCreateUser from "../ExamApplication/FormCreateUser";
import { getTrainingByCid } from "../../api/apiTraining";

import moment from "moment";

const TrainingUK = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [currentLicense, setCurrentLicense] = useState(null);

  const [currentTraining, setCurrentTraining] = useState(null);
  const [disabled, setDisabled] = useState(false);

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
    // setLoading(true);
    // const response = await getExamApplication("1122334455667");
    // setApplication(response);
    // setLoading(false);
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

  const onClickEditExamApplication = () => {};
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
  const onClickChangeLocation = () => {
    dispatch(
      showSearchSchedulePopup({
        title: "ค้นหาตารางสอบ",
        description: "",
      })
    );
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
                active={mode === "detail"}
                onClick={onClickShowDetail}
              >
                ประวัติ ก.ล.ต.
              </Button>
            </ButtonGroup>
          </CardBody>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <CardBody>
                  <CardBody>fergreg</CardBody>
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
                          onClick={() => console.log("defef")}
                          // onClick={onClickSubmit}
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
                    columns={[]}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
              <TabPane tabId="3">
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
            </TabContent>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default TrainingUK;
