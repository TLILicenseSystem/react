import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";

import { get } from "lodash";
//import styles from "./ExamRound.module.css";
import styles from "../../components/LicenseStyle/LicenseExamStlye.module.css";
import {
  Container,
  InputWithLabel,
  Wrapper,
  BoxSearch,
  BoxCriteria,
  RoundTable,
} from "../../components/shared";
//import { MDBTable, MDBTableBody, MDBTableHead, MDBDataTable } from "mdbreact";
import { confirm } from "../../components/Container/Comfirmation";
import apiSpring from "../../api/apiSpring";
import {
  insertExamRound,
  updateExamRound,
  deleteExamRound,
} from "./ModelExamRound";

const ExamRound = (props) => {
  // const history = useHistory();
  const [id, setId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
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
        alert("พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ! ", status);
        //throw new Error();
      }
    } catch (err) {
      alert("พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ! ", err);
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
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      console.log("after insert=", result);
    } catch (err) {
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
      alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
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
      alert("ลบข้อมูลเรียบร้อยแล้ว");
    } catch (err) {
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
    if (start === "") {
      // setErr("กรุณากรอกเวลาเริ่มต้น!");
      alert("กรุณากรอกเวลาเริ่มต้น!");
    } else if (end === "") {
      alert("กรุณากรอกเวลาสิ้นสุด!");
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
    if (await confirm("ต้องการลบข้อมูลใช่หรือไม่?")) {
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
              <Row style={{ marginTop: "30px", marginLeft: "20px" }}>
                <Col xs="3">
                  <InputWithLabel
                    label="รหัส"
                    value={id}
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                    showTime={true}
                    err
                  />
                </Col>
                <Col xs="3">
                  <InputWithLabel
                    label="เวลาสอบเริ่มต้น"
                    value={start}
                    maxLength="5"
                    star="*"
                    onChange={(e) => {
                      setStart(e.target.value);
                    }}
                    showTime={disableTime}
                    err
                  />
                </Col>
                <Col xs="3">
                  <InputWithLabel
                    label="เวลาสอบสิ้นสุด"
                    type="end"
                    star="*"
                    value={end}
                    maxLength="5"
                    onChange={(e) => {
                      setEnd(e.target.value);
                    }}
                    showTime={disableTime}
                    err={err}
                  />
                </Col>
                <Col xs="3">
                  <Button color="primary" type="button" onClick={examRoundAdd} style={{marginTop:"26px"}}>
                    เพิ่มรอบใหม่
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card style={{ marginTop: "20px" }}>
            <CardBody>
              <RoundTable onClick={doAction} rows={rows} />
            </CardBody>
          </Card>
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
        </Wrapper>
      </div>
    </Container>
  );
};

export default ExamRound;
