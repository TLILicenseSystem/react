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
  Container,
  EditLocationPopup,
  Table,
  SearchSales,
  StructData,
  LicenseDetail,
} from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";

import { showSearchSchedulePopup } from "../../redux/actions";
import { getLicenseHistoryByCid } from "../../api/apiGetLicense";
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
  const [licenseDetail, setLicenseDetail] = useState(null);
  const [mode, setMode] = useState("add");
  const [license, setLicense] = useState([]);
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (saleData && saleData.citizenID) {
      fetchData();
    }
    console.log(dayjs().format("DD/MM/BBBB"));
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await getLicenseHistoryByCid(saleData.citizenID);
    setLicense(get(response, "data", []));
    setLoading(false);
  };

  const rows = license.map((row) => {
    return { id: row.licenseNo, ...row };
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
  const onClickShowHistoryCompany = () => {
    setLicenseDetail(null);
    setActiveTab("3");
    setMode("historycompany");
  };

  const onClickShowDetail = () => {
    setLicenseDetail(null);
    setActiveTab("4");
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
        <h2 className="head">ขอรับ/ขอต่อ ใบอนุญาต</h2>
        <Card>
          <SearchSales />
          <CardBody>
            <LicenseDetail title="ผลการอบรมหลักสูตร ขอรับ/ขอต่อ" />
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
                  <FormLicense />
                </CardBody>
                <CardBody>
                  <FormCompany />
                </CardBody>
                <CardBody>
                  <FormPayment />
                </CardBody>
                <CardBody>
                  <FormResult />
                </CardBody>
                <CardBody
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  <FormCreateUser mode={"history"} data={[]} />
                  <hr />
                </CardBody>
                <CardBody
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  <Row sm="1">
                    <Col sm="9">
                      <FormGroup>
                        <label className={styles.label}>
                          หมายเหตุ <label className={styles.required}> *</label>
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
              <TabPane tabId="3">
                <CardBody>
                  <Table
                    id="companyId"
                    data={rows}
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
