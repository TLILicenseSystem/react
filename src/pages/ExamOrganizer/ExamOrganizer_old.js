import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
//import styles from "./ExamOrganizer.module.css";
import styles from "../../components/LicenseStyle/LicenseExamStlye.module.css";
import {
  Container,
  InputWithLabel,
  Wrapper,
  EditLocationTable,
} from "../../components/shared";
//import { useHistory } from "react-router-dom";
//import { useDispatch } from "react-redux";
//import { showSpinner } from "../../redux/actions";
//import * as ReactBootstrap from "react-bootstrap";
import { get } from "lodash";
import { confirm } from "../../components/Container/Comfirmation";
import apiSpring from "../../api/apiSpring";
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
    let formData = new FormData(); //formdata object
    formData.append("type", "A"); //append the values with key, value pair
    const config = { headers: { "content-type": "application/json" } };

    try {
      const { status, data } = await apiSpring.post(
        "/examorganizer/search",
        formData,
        config
      );
      if (status === 200) {
        setResult(data); //เมื่อ setResult แล้ว ค่า result จะได้เป็นค่า arraylist ของ data สามารถนำค่า resultมาใช้ได้เลย เช่น result[0] คือ arrayตัวที่0
        console.log("result in fetchData spring >>>>>>>>>>>>>.. ", data);
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "พบข้อผิดพลาดในการค้นหาข้อมูลรอบสถานที่สอบ!",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "พบข้อผิดพลาดในการโหลดข้อมูล!",
      });
      // throw err;
    }

    // const response = await getAllUser();
    //   console.log('response', response);
    //   setUserData(response);
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
      Swal.fire("Added!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
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
        text: "พบข้อมูลซ้ำในระบบ กรุณาบันทึกรอบเวลาใหม่!",
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
      text: `ต้องการลบรหัสสถานที่ ${param.orgCode} ใช่หรือไม่`,
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

  const doAction = (action) => {
    if (get(action, "action", "") === "edit") {
      // alert("edit");
      console.log("action===", action);
      console.log("action sel===", action.selected);

      editData(action.selected);
    } else if (get(action, "action", "") === "delete") {
      removeData(action.selected);
    }
  };

  const renderOrganizer = (org, index) => {
    return (
      <tr className={styles.title} key={index}>
        <td>{org.orgCode}</td>
        <td>{org.orgName}</td>

        <td className={styles.operation}>
          <button className={styles.buttonEdit} onClick={() => editData(org)}>
            แก้ไข
          </button>
        </td>

        <td className={styles.operation}>
          <button
            className={styles.buttonDelete}
            onClick={() => removeData(org)}
          >
            ลบ
          </button>
        </td>
      </tr>
    );
  };
  return (
    <Container>
      <div style={{ marginTop: "20px" }} className="div">
        <h2 className="head">ตั้งค่าสถานที่สอบ</h2>
        <Wrapper>
          <Card>
            <Row style={{ marginTop: "30px", marginLeft: "20px" }}>
              <Col xs="4">
                <InputWithLabel
                  label="รหัส"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  showTime={true}
                />
              </Col>
              <Col xs="5">
                <InputWithLabel
                  label="ชื่อสถานที่สอบ"
                  value={orgName}
                  width="300px"
                  onChange={(e) => {
                    setOrgName(e.target.value);
                  }}
                  showTime={disableTime}
                />
              </Col>
              <Col xs="3">
                <Button
                  style={{
                    marginTop: "30px",
                    fontFamily: "Prompt-Regular",
                  }}
                  color="success"
                  type="button"
                  onClick={ExamOrganizerAdd}
                >
                  เพิ่มสถานที่สอบ
                </Button>
              </Col>
            </Row>
            <CardBody>
              <EditLocationTable rows={rows} onClick={doAction} />
            </CardBody>
          </Card>
          <CardBody>
            <Col
              style={{
                textAlign: "right",
                fontFamily: "Prompt-Regular",
              }}
            >
              <Button
                color="primary"
                type="button"
                onClick={ExamOrganizerSave}
                style={{ marginRight: "10px" }}
              >
                บันทึก
              </Button>
              <Button
                color="secondary"
                type="button"
                onClick={ExamOrganizerClear}
              >
                เคลียร์ข้อมูล
              </Button>
            </Col>
          </CardBody>
        </Wrapper>
      </div>
    </Container>
  );
};

export default ExamOrganizer;
