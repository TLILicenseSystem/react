import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
//import styles from "./ExamOrganizer.module.css";
import styles from "../../components/LicenseStyle/LicenseExamStlye.module.css";
import {
  Container,
  InputWithLabel,
  Wrapper,
  EditLocationTable,
  InputWithLabelRow,
  Table,
  TimePicker,
  AddButton,
  SubmitButton,
  CancelButton,
  DeleteButton,
  EditButton,
} from "../../components/shared";
//import { useHistory } from "react-router-dom";
//import { useDispatch } from "react-redux";
//import { showSpinner } from "../../redux/actions";
//import * as ReactBootstrap from "react-bootstrap";\apiGetExamOrganizer
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { get } from "lodash";
import { confirm } from "../../components/Container/Comfirmation";
import {
  insertExamOrganizer,
  updateExamOrganizer,
  deleteExamOrganizer,
} from "./ModelExamOrganizer";
import Swal from "sweetalert2";

const ExamOrganizer = (props) => {
  //   const history = useHistory();
  const [id, setId] = useState("");
  const [orgName, setOrgName] = useState("");
  const [disableTime, setDisableTime] = useState(true);
  const [pressEdit, setPressEdit] = useState(false);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "orgCode", headerName: "รหัสสถานที่สอบ", width: 200 },
    { field: "orgName", headerName: "สถานที่สอบ", width: 400 },
    {
      field: "edit",
      headerName: "แก้ไข",
      align: "center",
      width: 150,
      renderCell: (cellValues) => {
        return <EditButton onClick={() => editData(cellValues.row)} />;
      },
    },
    {
      field: "delete",
      headerName: "ลบ",
      align: "center",
      width: 150,
      renderCell: (cellValues) => {
        return <DeleteButton onClick={() => removeData(cellValues.row)} />;
      },
    },
  ];

  let canInsert = false;
  // let date = new Date().toISOString(); //2020-11-05T14:06:33.006Z
  // let messageId = "028840ec147510517da2b23c8b0b6707";
  let create_user_code = "9009998";
  let update_user_code = "9009999";

  useEffect(() => {
    fetchData();
  }, []);

  const rows = result.map((row) => {
    const { orgCode, ...rest } = row;
    return { id: orgCode, orgCode, ...rest };
  });

  //----------------------------for SearchAll spring boot------------------------
  const fetchData = async () => {
    setLoading(true);
    const response = await getOrganizer("A");
    setResult(response);
    setLoading(false);
  };

  //----------------------------for insert spring boot------------------------
  const insertExamOrganizerProcess = async (orgCode, orgName) => {
    try {
      const response = await insertExamOrganizer(
        orgCode,
        orgName,
        create_user_code,
        update_user_code
      );
      // add row ในตาราง
      setResult([...result, { orgCode: id, orgName: orgName }]);
      //alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      Swal.fire("Added!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "พบข้อผิดพลาดในการบันทึกข้อมูล!",
      });
      throw new Error("พบข้อผิดพลาดในการบันทึกข้อมูล! ", err);

      // throw err;
    }
  };
  //----------------------------for update spring boot------------------------
  const updateExamOrganizerProcess = async (orgCode, orgName) => {
    try {
      const response = await updateExamOrganizer(
        orgCode,
        orgName,
        create_user_code,
        update_user_code
      );
      // update row ในตาราง
      updateItem(id, "orgName", orgName);
      Swal.fire("Updated!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
      //alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "พบข้อผิดพลาดในการแก้ไขข้อมูล!",
      });
      throw new Error("พบข้อผิดพลาดในการแก้ไขข้อมูล! ", err);
      // throw err;
    }
  };
  //----------------------------for delete spring boot------------------------
  const deleteExamOrganizerProcess = async (orgCode, processType) => {
    try {
      const response = await deleteExamOrganizer(orgCode);
      setResult(result.filter((item) => item.orgCode !== orgCode)); //ให้แสดงข้อมูลทั้งหมดใน result โดยไม่แสดง orgCode ที่ส่งเข้ามา
      ExamOrganizerClear();
      Swal.fire("Deleted!", "ลบข้อมูลเรียบร้อยแล้ว", "success");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "พบข้อผิดพลาดในการลบข้อมูล!",
      });
      throw new Error("พบข้อผิดพลาดในการลบข้อมูล! ", err);
      // throw err;
    }
  };
  //--------------------------------------------------------------------
  const checkDuplicateData = () => {
    //check ข้อมูลซ้ำก่อนกดบันทึก ให้ alert แจ้งเตือน ไม่ให้บันทึก
    const dup = result.find((o) => o.orgName === orgName);
    if (typeof dup !== "undefined" && dup != null) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "พบข้อมูลซ้ำในระบบ กรุณาบันทึกชื่อสถานที่สอบใหม่ใหม่!",
      });
      canInsert = false;
    } else canInsert = true;
  };

  const ExamOrganizerSave = () => {
    if (orgName === "") {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกสถานที่สอบ!",
      });
    } else {
      checkDuplicateData();
      if (canInsert) {
        if (pressEdit) updateExamOrganizerProcess(id, orgName);
        else insertExamOrganizerProcess(id, orgName);

        //-----------------------------------------------------------------------
        ExamOrganizerClear();
        setDisableTime(true);
      } else setDisableTime(false);
    }
  };

  const getListOrganizer = (org, index) => {
    return org.orgCode;
  };

  const ExamOrganizerAdd = () => {
    setPressEdit(false);
    setOrgName("");
    setDisableTime(false);

    console.log("size list ExamOrganizer in database ======", result.length);
    if (result.length === 0) setId("01");
    else {
      let max = Math.max.apply(null, result.map(getListOrganizer));

      let newOrgCode = String(parseInt(max) + 1);
      if (newOrgCode.length === 1) newOrgCode = "0" + newOrgCode;
      setId(newOrgCode);
    }
  };

  const ExamOrganizerClear = () => {
    setPressEdit(false);
    setOrgName("");
    setId("");
    setDisableTime(true);
  };

  const dlgConfirm = async (param) => {
    const { value: check } = await Swal.fire({
      text: `ต้องการลบสถานที่สอบ ${param.orgName} ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d9534f",
      confirmButtonColor: "#0275d8",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });
    if (check) {
      deleteExamOrganizerProcess(param.orgCode, "D");
    }
  };
  const removeData = (param) => {
    setPressEdit(false);
    dlgConfirm(param);
  };

  const updateItem = (orgCode, whichvalue, newvalue) => {
    var index = result.findIndex((x) => x.orgCode === orgCode);

    let g = result[index];
    g[whichvalue] = newvalue;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setResult([...result.slice(0, index), g, ...result.slice(index + 1)]);
  };

  const editData = (param) => {
    setPressEdit(true);
    setId(param.orgCode);
    setOrgName(param.orgName);

    setDisableTime(false);
  };

  return (
    <Container>
      <div className="contents">
        <h2 className="head">ตั้งค่าสถานที่สอบ</h2>
        <Card>
          <CardBody>
            <Row style={{ marginTop: "30px", marginLeft: "20px" }}>
              <Col xs="12" sm="3" md="3">
                <InputWithLabelRow
                  id="org-id"
                  label="รหัส"
                  value={id}
                  textboxSize={6}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  disabled={true}
                />
              </Col>
              <Col xs="12" sm="3" md="3">
                <InputWithLabelRow
                  id="org-id"
                  label="ชื่อสถานที่สอบ"
                  value={orgName}
                  onChange={(e) => {
                    setOrgName(e.target.value);
                  }}
                  disabled={disableTime}
                />
              </Col>
            </Row>
          </CardBody>

          <CardBody style={{ textAlign: "right", paddingBottom: 0 }}>
            <AddButton
              title="เพิ่มสถานที่สอบ"
              onClick={() => ExamOrganizerAdd()}
            />
          </CardBody>
          <CardBody style={{ textAlign: "right" }}>
            {/* <EditLocationTable rows={rows} onClick={doAction} /> */}
            <Table
              data={rows}
              id="orgCode"
              columns={columns}
              loading={loading}
            />
            <br />
            <SubmitButton
              title="บันทึก"
              disabled={disableTime}
              onClick={ExamOrganizerSave}
            />{" "}
            <CancelButton title="เคลียร์ข้อมูล" onClick={ExamOrganizerClear} />
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default ExamOrganizer;
