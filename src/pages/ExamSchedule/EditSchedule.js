import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { get } from "lodash";
import {
  ButtonGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
} from "reactstrap";
import {
  Container,
  InputWithLabel,
  Wrapper,
  SearchLocationPopup,
  LocationTable,
  DatePicker,
  DropdownExamTime,
  DropdownExamOrganizer,
  DropdownExamRegion,
  ScheduleTable,
  EditSchedulePopup,
} from "../../components/shared";
import {
  showSearchLocationPopup,
  showEditSchedulePopup,
} from "../../redux/actions";
import BoxScheduleFirst from "../../pages/ExamSchedule/BoxScheduleFirst";
import BoxSchedule from "./BoxSchedule";
import BoxUserModify from "./BoxUserModify";
import {
  addExamSchedule,
  updateExamSchedule,
} from "../../api/apiAddExamSchedule";

import moment from "moment";
import Swal from "sweetalert2";

import styles from "../pageStyles.css";

const EditSchedule = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const scheduleDetail = get(location, "state", {});
  console.log("user", scheduleDetail);

  const [scheduleId, setScheduleId] = useState(get(scheduleDetail, "scheduleId", ""));
  const [examDate, setExamDate] = useState(get(scheduleDetail, "examDate", ""));
  const [closeDate, setCloseDate] = useState(
    get(scheduleDetail, "applyCloseDate", "")
  );
  const [examTime, setExamTime] = useState(get(scheduleDetail, "roundId", ""));
  const [receiveDate, setReceiveDate] = useState(
    get(scheduleDetail, "receiveDate", "")
  );
  const [receiveTime, setReceiveTime] = useState(
    get(scheduleDetail, "receiveTime", "")
  );
  const [num, setNum] = useState(get(scheduleDetail, "maxApplicant", "0"));
  const [mainLocation, setMainLocation] = useState(
    get(scheduleDetail, "locationDetail", "0")
  );
  const [alterLocation, setAlterLocation] = useState(
    get(scheduleDetail, "alteredLocationDetail", "0")
  );
  const [isShowMainLocation, setIsShowMainLocation] = useState(
    get(mainLocation, "locationId", "") !== "" ? true : false
  );
  const [isShowAlterLocation, setIsShowAlterLocation] = useState(
    get(mainLocation, "locationId", "") !== get(alterLocation, "locationId", "")
      ? true
      : false
  );
  const [mode, setMode] = useState(get(scheduleDetail, "mode", ""));
  const [userModify, setUserModify] = useState("2901133");
  const [modifyDate, setModifyDate] = useState(moment().format("DD/MM/YYYY"));
  const [dangerCard, setDangerCard] = useState("");
  const [eExamDate, setEExamDate] = useState(false);
  const [eCloseDate, setECloseDate] = useState(false);
  const [eRoundTime, setERoundTime] = useState(false);
  const [eReceiveDate, setEReceiveDate] = useState(false);
  const [eReceiveTime, setEReceiveTime] = useState(false);
  const [eNum, setENum] = useState(false);

  const validateForm = () => {
    console.log("examDate ", examDate);
    console.log("closeDate ", closeDate);
    console.log("examTime ", get(examTime,"roundId",""));
    console.log("receiveDate ", receiveDate);
    console.log("receiveTime ", receiveTime);
    let validate = true;
    if (examDate === "" || examDate === "Invalid date") {
      setEExamDate(true);
      validate = false;      
    } 
    if (closeDate === "" || closeDate === "Invalid date"){
      setECloseDate(true);
      validate = false;
      console.log("setExam");
    }
    if (get(examTime,"roundId","") === ""){
      setERoundTime(true);
      validate = false;
    }
    if (receiveDate === "" || examDate === "Invalid date"){
      setEReceiveDate(true);
      validate = false;
    }
    if (receiveTime === "" || receiveTime === null || receiveTime === "null"){
      setEReceiveTime(true);
      validate = false;
    }
    if (num === ""){
      setENum(true);
      validate = false;
    }
    if (mainLocation === "0"){
      setDangerCard("danger");
      validate = false;
    }
    if (validate) {
      setECloseDate(false);
    }
    
    return validate;
  };
  const getSearchValue = (e) => {
    if (scheduleId === "") {
      console.log("getSearchValue case new ", e);
      setMainLocation(e);
      setIsShowMainLocation(true);
    } else if (scheduleId !== "") {
      console.log("getSearchValue case edit ", e);
      setAlterLocation(e);
      setIsShowAlterLocation(true);
    } else {
      console.log("other case ", e);
    }
  };
  const changeToSchedulePage = () => {
    history.push("/examSchedule", null);
  }
  const onClickSaveChange = async () => {
    console.log("isShowMainLocation ", isShowMainLocation);
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุข้อมูลให้ครบถ้วน",
      });
      return;
    } else {
      if (mode === "add") {
        let examSchedule = {
          locationId: get(mainLocation, "locationId", ""),
          alteredLocationId: get(mainLocation, "locationId", ""),
          examDate: moment(examDate).format("yyyy-MM-DD"),
          roundId: get(examTime,"roundId",""),
          maxApplicant: num,
          applyOpenDate: moment().format("yyyy-MM-DD"),
          applyCloseDate: moment(closeDate).format("yyyy-MM-DD"),
          openStatus: "N",
          receiveDate: moment(receiveDate).format("yyyy-MM-DD"),
          receiveTime: moment(receiveTime,"HH:mm").format("HH:mm"),
          createUserCode: userModify,
          createTime: moment().format(),
          updateUserCode: userModify,
          lastUpdate: moment().format(),
        };
        let response = await addExamSchedule(examSchedule);
        if (response !== "error") {
          Swal.fire("Added!", "อัพโหลดข้อมูลแล้ว", "success");
          changeToSchedulePage();
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
        }
      } else if (mode !== "add") {
        if (scheduleId === "") {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "กรุณาค้นหาตารางสอบก่อนบันทึกแก้ไข",
          });
          return;
        }
        
        let examSchedule = {
          scheduleId: scheduleId,
          locationId: get(mainLocation, "locationId", ""),
          alteredLocationId: get(alterLocation, "locationId", ""),
          examDate: moment(examDate).format("yyyy-MM-DD"),
          roundId: get(examTime,"roundId",""),
          maxApplicant: num,
          applyOpenDate: moment().format("yyyy-MM-DD"),
          applyCloseDate: moment(closeDate).format("yyyy-MM-DD"),
          openStatus: "N",
          receiveDate: moment(receiveDate,"DD/MM/yyyy").format("yyyy-MM-DD"),
          receiveTime: moment(receiveTime,"HH:mm").format("HH:mm"),
          updateUserCode: userModify,
          lastUpdate: moment().format(),
        };
        let response = await updateExamSchedule(examSchedule);
        if (response !== "error") {
          Swal.fire("Updated!", "ปรับปรุงข้อมูลแล้ว", "success");
          changeToSchedulePage();
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
  const onClickChangeLocation = (locationTier) => {
    dispatch(
      showSearchLocationPopup({
        title: "ค้นหาสถานที่สอบ",
        description: locationTier,
      })
    );
  };  

  return (
    <Container>
      <SearchLocationPopup onChange={getSearchValue} />
      <div style={{ marginTop: "20px" }} className="div">
        <h2 className="head">ตั้งค่าตารางสอบ</h2>
        <Wrapper>
          <Card>
            <CardBody>
              <h3 className="head">{(mode === "") ? "แก้ไขตารางสอบ" : "เพิ่มตารางสอบ"}</h3>
              <BoxScheduleFirst
                lExamDate="วันที่สอบ"
                lCloseDate="วันที่ปิดรับสมัคร"
                lRoundTime="เวลาสอบ"
                lReceiveDate="วันที่ได้รับหนังสือ"
                lReceiveTime="เวลาที่ได้รับหนังสือ"
                lNum="จำนวนผู้สมัคร(คน)"
                InExamDate={examDate}
                onClickInExamDate={(e) =>
                  setExamDate(e, setEExamDate(false))
                }
                InCloseDate={closeDate}
                onClickInCloseDate={(e) =>
                  setCloseDate(e, setECloseDate(false))
                }
                InRoundTime={get(examTime,"roundId","")}
                onClickInRoundTime={(e) => setExamTime(e , setERoundTime(false))}
                InReceiveDate={receiveDate}
                onClickInReceiveDate={(e) =>
                  setReceiveDate(e, setEReceiveDate(false))
                }
                InReceiveTime={receiveTime}
                onClickInReceiveTime={(e) =>
                  setReceiveTime(e.target.value, setEReceiveTime(false))
                }
                InNum={num}
                onChangeInNum={(e) => setNum(e.target.value, setENum(false))}
                eExamDate={eExamDate}
                eCloseDate={eCloseDate}
                eRoundTime={eRoundTime}
                eReceiveDate={eReceiveDate}
                eReceiveTime={eReceiveTime}
                eNum={eNum}                
              />
              <Row>
                <Col xs="6">
                  {!isShowMainLocation ? (
                    <div style={{ marginTop: "20px" }}>
                      <h3 className="head">ข้อมูลสถานที่สอบหลัก</h3>
                      <Card body outline color={dangerCard}>
                        <CardBody>
                          <h6 className="head">
                            ไม่พบข้อมูลสถานที่สอบ กรุณาเลือก
                          </h6>
                          <i
                            class="far fa-edit"
                            style={{
                              paddingLeft: "20px",
                              paddingTop: "9px",
                              display: "flex",
                            }}
                            type="button"
                            onClick={() => onClickChangeLocation("main")}
                          >
                            <h6 className="head">เปลี่ยนแปลงสถานที่สอบ</h6>
                          </i>
                        </CardBody>
                      </Card>
                    </div>
                  ) : (
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ display: "flex" }}>
                        <h3 className="head">ข้อมูลสถานที่สอบหลัก</h3>
                        <div>
                          {isShowAlterLocation ? (
                            ""
                          ) : (
                            <i
                              class="far fa-edit"
                              style={{
                                paddingLeft: "20px",
                                paddingTop: "9px",
                                display: "flex",
                              }}
                              type="button"
                              onClick={() => onClickChangeLocation(scheduleId === "" ? "main" : "alter")}
                            >
                              {" "}
                              <h6 className="head">เพิ่มสถานที่สอบอื่นๆ</h6>
                            </i>
                          )}
                        </div>
                      </div>
                      <Card>
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
                            InProvinceName={get(
                              mainLocation,
                              "provinceName",
                              ""
                            )}
                            InType={get(mainLocation, "locationTypeName", "")}
                            InLocation={get(mainLocation, "locationDetail", "")}
                          />
                        </CardBody>
                      </Card>
                    </div>
                  )}
                </Col>

                <Col xs="6">
                  {!isShowAlterLocation ? (
                    ""
                  ) : (
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ display: "flex" }}>
                        <h3 className="head">ข้อมูลสถานที่สอบอื่นๆ</h3>
                        <div>
                          <i
                            class="far fa-edit"
                            style={{
                              paddingLeft: "20px",
                              paddingTop: "9px",
                              display: "flex",
                            }}
                            type="button"
                            onClick={() => onClickChangeLocation("alter")}
                          >
                            <h6 className="head">เปลี่ยนแปลง</h6>
                          </i>
                        </div>
                      </div>
                      <Card>
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
                            InProvinceName={get(
                              alterLocation,
                              "provinceName",
                              ""
                            )}
                            InType={get(alterLocation, "locationTypeName", "")}
                            InLocation={get(
                              alterLocation,
                              "locationDetail",
                              ""
                            )}
                          />
                        </CardBody>
                      </Card>
                    </div>
                  )}
                </Col>
              </Row>
              <CardBody>
                <Row>
                  <Col xs="8">
                    <BoxUserModify
                      lUser="ผู้บันทึก"
                      lModifyDate="วันที่บันทึก"
                      InUser={userModify}
                      InModifyDate={modifyDate}
                    />
                  </Col>
                  <Col xd="4" className="label" style={{ display:"flex",flexDirection: "row", alignItems : "flex-end"}}>
                    <Button color="primary" type="button" style={{marginRight:"10px"}} onClick={onClickSaveChange}>
                      บันทึก
                    </Button>
                    <Button color="secondary" type="button" onClick={changeToSchedulePage}>
                      ยกเลิก
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </CardBody>
          </Card>
        </Wrapper>
      </div>
    </Container>
  );
};

export default EditSchedule;
