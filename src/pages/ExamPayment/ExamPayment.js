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
// import {
//   getExamApplication,
//   insertExamApplication,
//   updateExamApplication,
// } from "./ModelExamApplication";
// import { getExamResult} from "../../api/apiGetConfig"
import Swal from "sweetalert2";

import moment from "moment";

const ExamPayment = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [mode, setMode] = useState("history");
  const [application, setApplication] = useState([]);

  const dispatch = useDispatch();
  const columns = [
    {
      field: "a",
      headerName: "วันที่ทำรายการ",
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
      field: "b",
      headerName: "ประเภทการชำระ",
      minWidth: 100,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "c",
      headerName: "วันที่สอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "d",
      headerName: "สถานที่สอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },

    {
      field: "e",
      headerName: "จำนวนเงิน",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "f",
      headerName: "ผู้จ่ายค่าธรรมเนียม",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "x",
      headerName: "วันที่ชำระ",
      minWidth: 100,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "v",
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

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onClickAddExamApplication = () => {
    setScheduleDetail(null);
    setActiveTab("1");
    setMode("history");
  };

  const onClickShowExamApplication = () => {
    setScheduleDetail(null);
    setActiveTab("2");
    setMode("detail");
  };

  const onClickEditExamApplication = (values) => {
    setScheduleDetail(values);
    setActiveTab("1");
    setMode("detail");
  };
  const onClickCancel = () => {
    setScheduleDetail(null);
    setActiveTab("2");
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
    // scheduleDetail.citizenId = "1122334455667";
    // scheduleDetail.createUserCode = "2901133";
    // console.log(scheduleDetail);
    // try {
    //   let response = await insertExamApplication(scheduleDetail);
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
    //     citizenId: scheduleDetail.citizenId,
    //     scheduleId: scheduleDetail.scheduleId,
    //     applyTime: scheduleDetail.applyTime,
    //     applicantType: scheduleDetail.applicantType,
    //     seatNo: scheduleDetail.seatNo,
    //     examResult: scheduleDetail.examResult,
    //     remark: scheduleDetail.remark,
    //     createUserCode: scheduleDetail.createUserCode,
    //     updateUserCode: scheduleDetail.updateUserCode,
    //     referenceNo: scheduleDetail.referenceNo,
    //   };
    //   let response = await updateExamApplication(scheduleDetail);
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
        <h2 className="head">ค่าธรรมเนียม</h2>
        <Card>
          <SearchSales />
          <CardBody>
            <ButtonGroup>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "history"}
                onClick={onClickAddExamApplication}
              >
                ประวัติ
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={mode === "detail"}
                onClick={onClickShowExamApplication}
              >
                รายละเอียด
              </Button>
            </ButtonGroup>
          </CardBody>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <CardBody>
                  <Table
                    id="scheduleId"
                    data={rows}
                    columns={columns}
                    loading={false}
                  />
                </CardBody>
              </TabPane>
              <TabPane tabId="2">deferf</TabPane>
            </TabContent>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default ExamPayment;
