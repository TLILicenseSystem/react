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
  StructData,
} from "../../components/shared";
import { showSearchSchedulePopup } from "../../redux/actions";

import { getLicenseHistoryByCid } from "../../api/apiGetLicense";
import Swal from "sweetalert2";
import { columns } from "./columns";
import moment from "moment";

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
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await getLicenseHistoryByCid(saleData.citizenID);
    setLicense(response);
    setLoading(false);
  };

  const rows = license.map((row) => {
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
        <h2 className="head">ขอรับ/ขอต่อ ใบอนุญาต</h2>
        <Card>
          <SearchSales />
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
                <CardBody>eee</CardBody>
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
