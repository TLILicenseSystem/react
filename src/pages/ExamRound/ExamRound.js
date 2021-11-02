import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import { get } from "lodash";
import {
  Container,
  InputWithLabelRow,
  Table,
  TimePicker,
  AddButton,
  SubmitButton,
  CancelButton,
  DeleteButton,
  EditButton,
} from "../../components/shared";
//import { MDBTable, MDBTableBody, MDBTableHead, MDBDataTable } from "mdbreact";
import apiSpring from "../../api/apiSpring";
import {
  insertExamRound,
  updateExamRound,
  deleteExamRound,
} from "./ModelExamRound";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

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
  const [user, setUser] = useState(
    sessionStorage.getItem("updateUser")
      ? JSON.parse(sessionStorage.getItem("updateUser"))
      : null
  );
  const columns = [
    { field: "roundId", headerName: "รหัสรอบเวลาสอบ", width: 200 },
    { field: "timeStr", headerName: "รอบเวลาสอบ", width: 300 },
    {
      field: "lastUpdateFormat",
      headerName: "วันเวลาที่แก้ไข",
      minWidth: 200,
      align: "left",
      valueGetter: (params) =>
        `${dayjs(new Date(params.getValue(params.id, "lastUpdate"))).format(
          "DD/MM/BBBB HH:mm:ss"
        )}`,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "updateUserName",
      headerName: "ชื่อผู้แก้ไข",
      minWidth: 140,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
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

  let create_user_code = user && user.employeeID;
  let update_user_code = user && user.employeeID;

  const rows = result.map((row) => {
    const { roundId, ...rest } = row;
    return { id: roundId, roundId, ...rest };
  });

  useEffect(() => {
    fetchData();
  }, []);

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
        setResult(data);
        setInit(data);
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
      fetchData();
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
      Swal.fire("Updated!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
      fetchData();
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
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "พบข้อมูลซ้ำในระบบ กรุณาบันทึกรอบเวลาใหม่!",
      });
      // alert("พบข้อมูลซ้ำในระบบ กรุณาบันทึกรอบเวลาใหม่!");
      canInsert = false;
    } else canInsert = true;
  };

  const examRoundSave = () => {
    let showError = false;
    if (start === "" || start === null) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกเวลาเริ่มต้น!",
      });
      setEStart(true);
      showError = true;
    }
    if (end === "" || end === null) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกเวลาสิ้นสุด!",
      });
      setEEnd(true);
      showError = true;
    }
    if (end < start || start > end) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกเวลาให้ถูกต้อง",
      });
      setEStart(true);
      setEEnd(true);
      showError = true;
    }
    if (start === end) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกเวลาให้ถูกต้อง",
      });
      setEStart(true);
      setEEnd(true);
      showError = true;
    }
    if (start.length !== 5 || end.length !== 5) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกเวลาให้ถูกต้อง",
      });
      setEStart(true);
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
      text: `ต้องการลบข้อมูลเวลาสอบ ${param.timeStr} ใช่หรือไม่`,
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

  return (
    <Container>
      <div className="contents">
        <h2 className="head">ตั้งค่ารอบเวลาสอบ</h2>
        <Card>
          <CardBody>
            <Row style={{ marginTop: "30px", marginLeft: "20px" }}>
              <Col xs="12" sm="3" md="3">
                <InputWithLabelRow
                  id="round-id"
                  label="รหัส"
                  value={id}
                  textboxSize={6}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  disabled={true}
                />
              </Col>
              <Col xs="12" sm="2" md="2">
                <TimePicker
                  id="round-start"
                  label="เวลาสอบเริ่มต้น"
                  timeValue={start}
                  onClickTime={(value) => setStart(value, setEStart(false))}
                  eTime={eStart}
                  disabled={disableTime}
                />
              </Col>
              <Col xs="12" sm="2" md="2">
                <TimePicker
                  id="round-end"
                  label="เวลาสอบสิ้นสุด"
                  timeValue={end}
                  onClickTime={(value) => setEnd(value, setEEnd(false))}
                  eTime={eEnd}
                  disabled={disableTime}
                />
              </Col>
            </Row>
          </CardBody>
          <CardBody style={{ textAlign: "right", paddingBottom: 0 }}>
            <AddButton title="เพิ่มรอบใหม่" onClick={() => examRoundAdd()} />
          </CardBody>
          <CardBody style={{ textAlign: "right" }}>
            <Table data={rows} id="roundId" columns={columns} />
            <br />
            <SubmitButton
              title="บันทึก"
              disabled={disableTime}
              onClick={examRoundSave}
            />{" "}
            <CancelButton title="เคลียร์ข้อมูล" onClick={examRoundClear} />
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default ExamRound;
