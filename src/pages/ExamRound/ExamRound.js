import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";

import { get } from "lodash";
//import styles from "./ExamRound.module.css";
import styles from "../../components/LicenseStyle/LicenseExamStlye.module.css";
import {
  Container,
  InputWithLabel,
  InputWithLabelRow,
  Wrapper,
  BoxSearch,
  BoxCriteria,
  RoundTable,
  TimePicker,
} from "../../components/shared";
//import { MDBTable, MDBTableBody, MDBTableHead, MDBDataTable } from "mdbreact";
import { confirm } from "../../components/Container/Comfirmation";
import apiSpring from "../../api/apiSpring";
import {
  insertExamRound,
  updateExamRound,
  deleteExamRound,
} from "./ModelExamRound";
import Swal from "sweetalert2";

const ExamRound = (props) => {
  // const history = useHistory();
  const [id, setId] = useState("");
  const [start, setStart] = useState("");
  const [eStart, setEStart] = useState(false);
  const [end, setEnd] = useState("");
  const [eEnd, setEEnd] = useState(false);
  const [disableTime, setDisableTime] = useState(true);
  const [pressEdit, setPressEdit] = useState(false);
  const [init, setInit] = useState([]);
  const [result, setResult] = useState([]);
  let canInsert = false;

  let create_user_code = "9009998";
  let update_user_code = "9009999";

  const [err, setErr] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const rows = result.map((row) => {
    const { roundId, ...rest } = row;
    return { id: roundId, roundId, ...rest };
  });

  // //----------------------------for SearchAll spring boot------------------------
  const fetchData = async () => {
    let formData = new FormData(); //formdata object
    formData.append("type", "A"); //append the values with key, value pair
    const config = { headers: { "content-type": "application/json" } };

    try {
      const { status, data } = await apiSpring.post(
        "/examround/search",
        formData,
        config
      );
      if (status === 200) {
        // setResult(data); //เมื่อ setResult แล้ว ค่า result จะได้เป็นค่า arraylist ของ data สามารถนำค่า resultมาใช้ได้เลย เช่น result[0] คือ arrayตัวที่0
        console.log("result in fetchData spring >>>>>>>>>>>>>.. ", data);
        setResult(data);

        setInit(data);
        console.log("setResult in fetchData spring >>>>>>>>>>>>>.. ", result);
        console.log("setInit in fetchData spring >>>>>>>>>>>>>.. ", init);
        //setInit([...init, {id:init.roundId}]);
      } else {
        // alert("พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ! ", status);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ!",
        });
        //throw new Error();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ!",
      });
      //alert("พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ! ", err);
      //throw err;
    }
  };

  // //----------------------------for inse-rt spring boot------------------------
  const insertExamRoundProcess = async (roundId, timeStr) => {
    try {
      const response = await insertExamRound(
        roundId,
        timeStr,
        create_user_code,
        update_user_code
      );
      // add row ในตาราง
      setResult([
        ...result,
        { id: id, roundId: id, timeStr: `${start}-${end}` },
      ]);
      Swal.fire("Added!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      console.log("after insert=", result);
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
  const updateExamRoundProcess = async (roundId, timeStr) => {
    try {
      const response = await updateExamRound(
        roundId,
        timeStr,
        create_user_code,
        update_user_code
      );
      // update row ในตาราง
      updateItem(id, "timeStr", `${start}-${end}`);
      //alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
      Swal.fire("Added!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");

    } catch (err) {
      throw new Error("พบข้อผิดพลาดในการแก้ไขข้อมูล! ", err);
      // throw err;
    }
  };
  //----------------------------for delete spring boot------------------------
  const deleteExamRoundProcess = async (roundId) => {
    try {
      //ต้องเช็คว่ามีการบันทึกที่แฟ้มอื่นไปแล้วไหม ถ้ามีห้ามลบ ต้องแจ้งเตือน
      //
      const response = await deleteExamRound(roundId);
      setResult(result.filter((item) => item.roundId !== roundId)); //ให้แสดงข้อมูลทั้งหมดใน result โดยไม่แสดง roundId ที่ส่งเข้ามา
      examRoundClear();
      Swal.fire("Deleted!", "ลบข้อมูลเรียบร้อยแล้ว", "success");
      //alert("ลบข้อมูลเรียบร้อยแล้ว");
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
    const dup = result.find((o) => o.timeStr === `${start}-${end}`);
    if (typeof dup !== "undefined" && dup != null) {
      alert("พบข้อมูลซ้ำในระบบ กรุณาบันทึกรอบเวลาใหม่!");
      canInsert = false;
    } else canInsert = true;
  };

  const examRoundSave = () => {
    let showError = false;
    if (start === "") {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกเวลาเริ่มต้น!",
      });
      setEStart(true);
      showError = true;
    } if (end === "") {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกเวลาสิ้นสุด!",
      });
      setEEnd(true);
      showError = true;
    } 
    if (showError) {

    } else {
      checkDuplicateData();
      if (canInsert) {
        if (pressEdit) updateExamRoundProcess(id, `${start}-${end}`);
        else insertExamRoundProcess(id, `${start}-${end}`);

        //-----------------------------------------------------------------------
        examRoundClear();
        setDisableTime(true);
      } else setDisableTime(false);
    }
    //setErr("");
  };

  const getListRoundID = (roundTime, index) => {
    return roundTime.roundId;
  };

  const examRoundAdd = () => {
    setPressEdit(false);
    setStart("");
    setEnd("");
    setDisableTime(false);

    console.log("size list examround in database ======", result.length);
    if (result.length === 0) setId("01");
    else {
      let max = Math.max.apply(null, result.map(getListRoundID));

      let newRound = String(parseInt(max) + 1);
      if (newRound.length === 1) newRound = "0" + newRound;
      setId(newRound);
    }
  };

  const examRoundClear = () => {
    setPressEdit(false);
    setStart("");
    setEnd("");
    setId("");
    setDisableTime(true);
  };

  const dlgConfirm = async (param) => {
    const { value: check } = await Swal.fire({
      text: `ต้องการลบข้อมูลรหัสเวลาสอบ ${param.roundId} ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d9534f",
      confirmButtonColor: "#0275d8",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });
    if (check) {
      deleteExamRoundProcess(param.roundId);
    }
  };
  const removeData = (param) => {
    setPressEdit(false);
    dlgConfirm(param);
  };

  const updateItem = (roundId, whichvalue, newvalue) => {
    var index = result.findIndex((x) => x.roundId === roundId);

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
    setId(param.roundId);
    setStart(param.timeStr.substring(0, 5));
    setEnd(param.timeStr.substring(6));

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

  console.log("result ====", result);
  console.log("rows ====", rows);
  console.log("init ====", init);
  return (
    <Container>
      <div style={{ marginTop: "20px" }} className="div">
        <h2 className="head">ตั้งค่าเวลาสอบ</h2>
        <Wrapper>
          <Card>
            <CardBody>
            <h3 className="head">ตัวกรองข้อมูล</h3>          
            <Card>                  
              <Row style={{ marginTop: "30px", marginLeft: "20px" }}>
                <Col xs="3">
                  <InputWithLabelRow
                    label="รหัส"
                    value={id}
                    textboxSize={6}
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                    disabled={true}
                  />
                </Col>
                <Col xs="3">
                  <TimePicker
                    label="เวลาสอบเริ่มต้น"
                    timeValue={start}
                    onClickTime={(e) =>
                      setStart(e.target.value, setEStart(false))}
                    eTime={eStart}
                    disabled={disableTime}/>
                </Col>
                <Col xs="3">
                  <TimePicker
                    label="เวลาสอบสิ้นสุด"
                    timeValue={end}
                    onClickTime={(e) =>
                      setEnd(e.target.value, setEEnd(false))}
                    eTime={eEnd}
                    disabled={disableTime}/>
                </Col>
                <Col xs="3">
                  <Button color="primary" type="button" onClick={examRoundAdd} style={{marginTop:"34px", fontFamily: "Prompt-Regular"}}>
                    เพิ่มรอบใหม่
                  </Button>
                </Col>
              </Row>
            </Card>
            </CardBody>          
            <CardBody>
              <RoundTable onClick={doAction} rows={rows} />
            </CardBody>
            <CardBody >
              <Col xs="12" style={{ textAlign: "right"}}>
                <Button color="success" type="button" onClick={examRoundSave} style={{marginRight:"10px"}}>
                  บันทึก
                </Button>
                <Button color="secondary" type="button" onClick={examRoundClear}>
                  เคลียร์ข้อมูล
                </Button>
              </Col>
            </CardBody>
          </Card>
        </Wrapper>
      </div>
    </Container>
  );
};

export default ExamRound;
