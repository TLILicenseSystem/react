import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showSearchLocationPopup, showSearchSchedulePopup } from "../../redux/actions";
import {
  Container,
  InputWithLabel,
  Wrapper,
  SearchLocationPopup,
  LocationTable,
  SearchSchedulePopup,
} from "../../components/shared";
import BoxScheduleFirst from "./BoxScheduleFirst";
import BoxSchedule from "./BoxSchedule";
import BoxUserModify from "./BoxUserModify";
import { FontAwesomeIcon } from "@fortawesome/fontawesome-free";
import { cond, get } from "lodash";
import { addExamSchedule, updateExamSchedule } from "../../api/apiAddExamSchedule";
import {
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import moment from "moment";
import Swal from "sweetalert2";

const ExamSchedule = (props) => {
  const dispatch = useDispatch();
  const [scheduleId, setScheduleId] = useState("");
  const [examDate, setExamDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [receiveTime, setReceiveTime] = useState("");
  const [num, setNum] = useState(0);

  //--------------สถานที่ตั้งสอบหลัก (main)--------------
  const [locationID1, setLocationID1] = useState(""); //สถานที่ตั้งสอบ
  const [org1, setOrg1] = useState(""); //สถานที่สอบ
  const [regionCode1, setRegionCode1] = useState(""); //รหัสสนามสอบ
  const [regionName1, setRegionName1] = useState("");
  const [locationType1, setLocationType1] = useState("");
  const [Location1, setLocation1] = useState("");

  //--------------สถานที่ตั้งสอบสำรอง (alter)--------------
  const [locationID2, setLocationID2] = useState(""); //สถานที่ตั้งสอบ
  const [org2, setOrg2] = useState(""); //สถานที่สอบ
  const [regionCode2, setRegionCode2] = useState(""); //รหัสสนามสอบ
  const [regionName2, setRegionName2] = useState("");
  const [locationType2, setLocationType2] = useState("");
  const [Location2, setLocation2] = useState("");

  //------------------ผู้บันทึก------------------------
  const [userModify, setUserModify] = useState("2901133");
  const [modifyDate, setModifyDate] = useState(moment().format("DD/MM/YYYY"));

  //------------------radio button------------------
  const [radioValue, setRadioValue] = useState("1");

  const [isShowMainLocation, setIsShowMainLocation] = useState(false);
  const [isShowAlterLocation, setIsShowAlterLocation] = useState(false);
  const [searchValue, setSearchValue] = useState({});
  const [mainLocation, setMainLocation] = useState({});
  const [alterLocation, setAlterLocation] = useState({});

  const getSearchValue = (e) => {
    if (radioValue === "1") {
      console.log("getSearchValue case new ", e);
      setMainLocation(e);
      setIsShowMainLocation(true);
    } else if (radioValue === "2" && isShowMainLocation) {
      console.log("getSearchValue case edit ", e);
      setAlterLocation(e);
      setIsShowAlterLocation(true);
    }
  };
  const getSearchScheduleValue = (e) => {
    console.log("handleAction ", e);
    if (
      get(e, "locationDetail.locationId", "") ===
      get(e, "alteredLocationDetail.locationId", "")
    ) {
      console.log("same location ");
      setMainLocation(get(e, "locationDetail", {}));
      setIsShowAlterLocation(false);
    } else {
      console.log("diff location ");
      setIsShowAlterLocation(true);
      setAlterLocation(get(e, "alteredLocationDetail", {}));
    }
    setIsShowMainLocation(true);
    console.log("receiveTime ", get(e, "receiveTime", ""));
    setScheduleId(get(e, "scheduleId", ""));
    setExamDate(get(e, "examDate", ""));
    setCloseDate(moment(get(e, "applyCloseDate", ""),"DD/MM/yyyy"));
    setExamTime(get(e, "roundId", ""));
    setReceiveDate(moment(get(e, "receiveDate", "")),"DD/MM/yyyy");
    setReceiveTime(moment(get(e, "receiveTime", ""),"HH:mm "));
    setNum(get(e, "maxApplicant", ""));
    setRadioValue("2");
  };
  const onClickChangeLocation = () => {
    dispatch(
      showSearchLocationPopup({
        title: "DlgListLocation",
        description: "",
      })
    );
  };
  const onClickSearchSchedule = () => {
    dispatch(
      showSearchSchedulePopup({
        title: "SearchSchedule",
        description: "",
        action: () => {},
      })
    );
  };
  const validateForm = () => {
    console.log("examDate ",examDate);
    console.log("closeDate ",closeDate);
    console.log("examTime ",examTime);
    console.log("receiveDate ",receiveDate);
    console.log("receiveTime ",receiveTime);
    if (
      examDate === "" ||
      closeDate === "" ||
      examTime === "" ||
      receiveDate === "" ||
      receiveTime === "" ||
      num === ""
    ) {
      return false;
    } else return true;
  };
  const onClickSaveChange = async () => {
    console.log("isShowMainLocation ", isShowMainLocation);
    const responseStatue = "error";
    if (!isShowMainLocation || !validateForm()) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุข้อมูลให้ครบถ้วน",
      });
      return;
    } else {
      if (radioValue === "1") {
        let examSchedule = {
          locationId: get(mainLocation, "locationId", ""),
          alteredLocationId: get(mainLocation, "locationId", ""),
          examDate: moment(examDate).format("yyyy-MM-DD"),
          roundId: examTime,
          maxApplicant: num,
          applyOpenDate: moment().format("yyyy-MM-DD"),
          applyCloseDate: moment(closeDate).format("yyyy-MM-DD"),
          openStatus: "N",
          receiveDate: moment(receiveDate).format("yyyy-MM-DD"),
          receiveTime: moment(receiveTime).format("HH:mm"),
          createUserCode: userModify,
          createTime: moment(modifyDate).format("yyyy-MM-DD HH:mm"),
          updateUserCode: userModify,
          lastUpdate: moment(modifyDate).format("yyyy-MM-DD HH:mm"),
        };
        let response = await addExamSchedule(examSchedule);
        if (response !== "error") {
          Swal.fire("Added!", "อัพโหลดข้อมูลแล้ว", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
        }
      } else if (radioValue === "2") {
        if (scheduleId === "") {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "กรุณาค้นหาตารางสอบก่อนบันทึกแก้ไข",
          });
          return;
        }
        console.log("receiveTime " ,receiveTime);
        console.log("receiveTime " , moment(receiveTime,"HH:mm").format("HH:mm"));
        let examSchedule = {
          scheduleId: scheduleId,
          locationId: get(mainLocation, "locationId", ""),
          alteredLocationId: get(mainLocation, "locationId", ""),
          examDate: moment(examDate).format("yyyy-MM-DD"),
          roundId: examTime,
          maxApplicant: num,
          applyOpenDate: moment().format("yyyy-MM-DD"),
          applyCloseDate: moment(closeDate).format("yyyy-MM-DD"),
          openStatus: "N",
          receiveDate: moment(receiveDate).format("yyyy-MM-DD"),
          receiveTime: moment(receiveTime,"HH:mm").format("HH:mm"),
          updateUserCode: userModify,
          lastUpdate: moment(modifyDate).format("yyyy-MM-DD"),
        };
        let response = await updateExamSchedule(examSchedule);
        if (response !== "error") {
          Swal.fire("Updated!", "ปรับปรุงข้อมูลแล้ว", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
        }
      }
    }
  };
  const setRadioAddSchedule = () => {
    setRadioValue("1");
    setScheduleId("");
    setExamDate("");
    setCloseDate("");
    setExamTime("");
    setReceiveDate("");
    setReceiveTime("");
    setNum("");
    setIsShowMainLocation(false);
    setIsShowAlterLocation(false);
    setMainLocation({});
    setAlterLocation({});
  };

  return (
    <Container>
      <SearchLocationPopup onChange={getSearchValue} />
      <SearchSchedulePopup onChange={getSearchScheduleValue} />
      <Wrapper>
        <CardHeader>
          ตั้งค่าสถานที่สอบ{"   "}
          <ButtonGroup className="w-50">
            <Button
              color="primary"
              type="button"
              onClick={onClickSearchSchedule}
              style={{ marginLeft:20 }}
            >
              ค้นหา 🔎
            </Button>
            <ButtonGroup className="w-50"> 
              <Button
                color="outline-success"
                type="button"
                active={radioValue === "1"}
                onClick={setRadioAddSchedule}
              >
                เพิ่ม
              </Button>
              <Button
                color="outline-warning"
                type="button"
                active={radioValue === "2"}
                onClick={() => setRadioValue("2")}
              >
                แก้ไข
              </Button>
            </ButtonGroup>
            <Button color="danger" type="button" onClick={{}}>
              ลบ
            </Button>
          </ButtonGroup>
        </CardHeader>

        {/* <label style={{ marginLeft:20 }}>กำลังดำเนินการ: {(radioValue === "1" ? "เพิ่ม" : "แก้ไข")}</label> */}

        <Card>
          <CardBody>
            <BoxScheduleFirst
              lExamDate="วันที่สอบ"
              lCloseDate="วันที่ปิดรับสมัคร"
              lRoundTime="เวลาสอบ"
              lReceiveDate="วันที่ได้รับหนังสือ"
              lReceiveTime="เวลาที่ได้รับหนังสือ"
              lNum="จำนวนผู้สมัคร(คน)"
              InExamDate={examDate}
              onClickInExamDate={(e) =>
                setExamDate(moment(e).format("MM/DD/yyyy"))
              }
              InCloseDate={closeDate}
              onClickInCloseDate={(e) =>
                setCloseDate(moment(e).format("MM/DD/YYYY"))
              }
              InRoundTime={examTime}
              onClickInRoundTime={(e) => setExamTime(get(e,"roundId",""))}
              InReceiveDate={receiveDate}
              onClickInReceiveDate={(e) =>
                setReceiveDate(moment(e).format("MM/DD/YYYY"))
              }
              InReceiveTime={receiveTime}
              onClickInReceiveTime={(e) =>
                setReceiveTime(moment(e).format("HH:mm"))
              }
              InNum={num}
              onChangeInNum={(e) => setNum(e.target.value)}
            />
          </CardBody>
        </Card>
        {!isShowMainLocation ? (
          ""
        ) : (
          <Card>
            <CardHeader style={{ textAlign: "left" }}>
              ข้อมูลสถานที่สอบหลัก <i class="far fa-edit" type="button" onClick={{}}></i>
            </CardHeader>
            <CardBody>
              <BoxSchedule
                lLocationID="รหัสสถานที่ตั้งสอบ"
                lOrg="สถานที่สอบ"
                lProvince="สนามสอบ"
                lType="ประเภทสถานที่ตั้ง"
                lLocation="สถานที่ตั้งสอบ"
                InLocationID={get(mainLocation, "locationId", "")}
                InOrg={get(mainLocation, "organizerName", "")}
                InProvince={get(mainLocation, "provinceCode", "")}
                InProvinceName={get(mainLocation, "provinceName", "")}
                InType={get(mainLocation, "locationTypeName", "")}
                InLocation={get(mainLocation, "locationDetail", "")}
              />
            </CardBody>
          </Card>
        )}

        <Row>
          <Col xs="9" />
          <Col xs="3">
            <Button
              xs="3"
              size="sm"
              color="secondary"
              onClick={onClickChangeLocation}
            >
              เปลี่ยนแปลงสถานที่สอบ
            </Button>
          </Col>
        </Row>

        {!isShowAlterLocation ? (
          ""
        ) : (
          <Card>
            <CardHeader style={{ textAlign: "left" }}>
              ข้อมูลสถานที่สอบอื่นๆ
            </CardHeader>
            <CardBody>
              <BoxSchedule
                lLocationID="รหัสสถานที่ตั้งสอบ"
                lOrg="สถานที่สอบ"
                lProvince="สนามสอบ"
                lType="ประเภทสถานที่ตั้ง"
                lLocation="สถานที่ตั้งสอบ"
                InLocationID={get(alterLocation, "locationId", "")}
                InOrg={get(alterLocation, "organizerName", "")}
                InProvince={get(alterLocation, "provinceCode", "")}
                InProvinceName={get(alterLocation, "provinceName", "")}
                InType={get(alterLocation, "locationTypeName", "")}
                InLocation={get(alterLocation, "locationDetail", "")}
              />
            </CardBody>
          </Card>
        )}

        <Card>
          <CardBody style={{ textAlign: "center" }}>
            <BoxUserModify
              lUser="ผู้บันทึก"
              lModifyDate="วันที่บันทึก"
              InUser={userModify}
              InModifyDate={modifyDate}
            />
          </CardBody>
        </Card>

        <Row>
          <Col style={{ textAlign: "right" }}>
            <Button color="primary" type="button" onClick={onClickSaveChange}>
              บันทึก
            </Button>
          </Col>
          <Col>
            <Button
              color="secondary"
              type="button"
              onClick={setRadioAddSchedule}
            >
              ยกเลิก
            </Button>
          </Col>
        </Row>
      </Wrapper>
    </Container>
  );
};
export default ExamSchedule;
