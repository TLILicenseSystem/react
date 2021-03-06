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
import From3 from "./Form3";
import FormLicense from "./FormLicense";
import FormResult from "./FormResult";
import FormCreateUser from "../ExamApplication/FormCreateUser";

import moment from "moment";

const TrainingUL = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [licenseDetail, setLicenseDetail] = useState(null);
  const [mode, setMode] = useState("add");
  const [application, setApplication] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // setLoading(true);
    // const response = await getExamApplication("1122334455667");
    // setApplication(response);
    // setLoading(false);
  };

  const rows = application.map((row) => {
    return { id: row.scheduleId, ...row };
  });

  const onClickEditExamApplication = () => {};
  const onClickCancel = () => {
    setLicenseDetail(null);
    setActiveTab("1");
    setMode("add");
  };
  const onClickAdd = () => {
    setLicenseDetail(null);
    setActiveTab("1");
    setMode("add");
  };

  const onClickShowHistory = () => {
    setLicenseDetail(null);
    setActiveTab("2");
    setMode("history");
  };

  const onClickShowDetail = () => {
    setLicenseDetail(null);
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
        <h2 className="head">ขอรับ/ขอต่อ ใบอนุญาต UL</h2>
        <Card>
          <SearchPerson />
          <CardBody>
            <LicenseDetail title="ผลการอบรมหลักสูตร UL" />
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
                    <FormLicense />
                  </CardBody>
                  <CardBody>
                    <FormResult />
                  </CardBody>
                  <CardBody
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
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
                            disabled={true}
                            //  value={get(scheduleDetail, "remark", "")}
                            // onChange={(e) =>
                            //   setScheduleDetail({
                            //     ...scheduleDetail,
                            //     remark: e.target.value,
                            //   })
                            // }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormCreateUser mode={"history"} data={[]} />
                    <hr />
                  </CardBody>
                </CardBody>
              </TabPane>
              <TabPane tabId="2">
                <CardBody>
                  {" "}
                  <Table
                    id="scheduleId"
                    data={rows}
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
