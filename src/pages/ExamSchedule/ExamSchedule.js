import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showSearchPopup } from "../../redux/actions";
import { Container, InputWithLabel, Wrapper, SearchPopup, LocationTable } from "../../components/shared";
import BoxScheduleFirst from "./BoxScheduleFirst";
import BoxSchedule from "./BoxSchedule";
import BoxUserModify  from "./BoxUserModify";
import styles from "./ExamSchedule.module.css";
import { cond, get } from "lodash";
import { addExamSchedule } from "../../api/apiAddExamSchedule";
import { ButtonGroup, Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import moment from "moment";
import Swal from 'sweetalert2';

const ExamSchedule = (props) => {
    const dispatch = useDispatch();
    const [examDate, setExamDate] = useState("");
    const [closeDate, setCloseDate] = useState("");
    const [examTime, setExamTime] = useState("");
    const [receiveDate, setReceiveDate] = useState("");
    const [receiveTime, setReceiveTime] = useState("");
    const [num, setNum] = useState("0");

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
    const [radioValue, setRadioValue] = useState('1');

    const [isShowMainLocation, setIsShowMainLocation] = useState(false);
    const [isShowAlterLocation, setIsShowAlterLocation] = useState(false);
    const [searchValue, setSearchValue] = useState({});
    const [mainLocation, setMainLocation] = useState({});
    const [alterLocation, setAlterLocation] = useState({});

    const getSearchValue = (e) => {
      if (radioValue === "1"){
        console.log("getSearchValue case new ", e);
        setMainLocation(e);
        setIsShowMainLocation(true);
      } else if (radioValue === "2" && isShowMainLocation){
        console.log("getSearchValue case edit ", e);
        setAlterLocation(e);
        setIsShowMainLocation(true);
      }      
    };
    const onClickChangeLocation = () => {
      dispatch(
        showSearchPopup({
          title: "DlgListLocation",
          description: "",
        })
      );
    };
    const validateForm = () => {
      if (examDate === "" || closeDate === "" || examTime === "" || receiveDate === "" || receiveTime === "" || num === ""){
        return false;
      } else return true;
    };
    const onClickSaveChange = async () => {
      console.log("isShowMainLocation ", isShowMainLocation);
      const responseStatue = "error";
      if (!isShowMainLocation || !validateForm()){
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: "กรุณาระบุข้อมูลให้ครบถ้วน",
        });
        return;
      } else {
        if(radioValue === "1") {
          console.log("moment ", moment(closeDate).format("yyyy-MM-DD"))
          let examSchedule = {
            "scheduleId":"3",
            "locationId":get(mainLocation,"locationId",""),
            "alteredLocationId":get(mainLocation,"locationId",""),
            "examDate":moment(examDate).format("yyyy-MM-DD"),
            "roundId":examTime,
            "maxApplicant":num,
            "applyOpenDate":moment(closeDate).format("yyyy-MM-DD"),
            "applyCloseDate":moment(receiveDate).format("yyyy-MM-DD"),
            "openStatus":"N",
            "createUserCode":userModify,
            "createTime":moment(modifyDate).format("yyyy-MM-DD"),
            "updateUserCode":userModify,
            "lastUpdate":moment(modifyDate).format("yyyy-MM-DD"),
          };
          let response = await addExamSchedule(examSchedule);
          if (response !== "error") responseStatue = "";
        } else if (radioValue === "2") {


        };
      };

      if (responseStatue !== "error"){
        Swal.fire(
          'Added!',
          'อัพโหลดข้อมูลแล้ว',
          'success'
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถแก้ไขข้อมูลได้',
        });
      };  

    };

  return (
    <Container>
      <SearchPopup onChange={getSearchValue} />
      <Wrapper>

            <Button color="primary" type="button" >ค้นหา</Button>
 
            <ButtonGroup>
              <Button 
                color="outline-success"
                active={radioValue === "1"}
                onClick={() => setRadioValue("1")}
              >
                เพิ่ม
              </Button >
              <Button  
                color="outline-warning"
                active={radioValue === "2"}
                onClick={() => setRadioValue("2")}
              >
                แก้ไข
              </Button >
            </ButtonGroup>
        
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
              onClickInExamDate={(e) => setExamDate(moment(e).format("DD/MM/YYYY"))}
              InCloseDate={closeDate}
              onClickInCloseDate={(e) => setCloseDate(moment(e).format("DD/MM/YYYY"))}
              InRoundTime={examTime}
              onClickInRoundTime={(e) => setExamTime(e)}
              InReceiveDate={receiveDate}
              onClickInReceiveDate={(e) => setReceiveDate(moment(e).format("DD/MM/YYYY"))}
              InReceiveTime={receiveTime}
              onClickInReceiveTime={(e) => setReceiveTime(moment(e).format("HH:mm"))}
              InNum={num}
              onChangeInNum={(e) => setNum(e.target.value)}
            />
          </CardBody>
        </Card>
        {!isShowMainLocation ? "" :
        <Card>
          <CardHeader style={{ textAlign: 'center' }}>ข้อมูลสถานที่สอบหลัก</CardHeader>
          <CardBody>
              <BoxSchedule 
                lLocationID="รหัสสถานที่ตั้งสอบ" 
                lOrg="สถานที่สอบ"
                lProvince="สนามสอบ"
                lType="ประเภทสถานที่ตั้ง"
                lLocation="สถานที่ตั้งสอบ"
                InLocationID={get(mainLocation,"locationId","")}
                InOrg={get(mainLocation,"organizerName","")}
                InProvince={get(mainLocation,"provinceCode","")}
                InProvinceName={get(mainLocation,"provinceName","")}
                InType={get(mainLocation,"locationTypeName","")}
                InLocation={get(mainLocation,"locationDetail","")}
              />
          </CardBody>
          
        </Card>
        }

        <Row>
          <Col xs="9"/>
          <Col xs="3">
            <Button xs="3" size="sm" color="secondary" onClick={onClickChangeLocation}>เปลี่ยนแปลงสถานที่สอบ</Button>
          </Col>
        </Row>

        {!isShowAlterLocation ? "" :
          <Card>
            <CardHeader style={{ textAlign: 'center' }}>ข้อมูลสถานที่สอบอื่นๆ</CardHeader>
            <CardBody>
              <BoxSchedule  
                lLocationID="รหัสสถานที่ตั้งสอบ" 
                lOrg="สถานที่สอบ"
                lProvince="สนามสอบ"
                lType="ประเภทสถานที่ตั้ง"
                lLocation="สถานที่ตั้งสอบ"
                InLocationID={get(alterLocation,"locationId","")}
                InOrg={get(alterLocation,"organizerName","")}
                InProvince={get(alterLocation,"provinceCode","")}
                InProvinceName={get(alterLocation,"provinceName","")}
                InType={get(alterLocation,"locationTypeName","")}
                InLocation={get(alterLocation,"locationDetail","")}
              />
            </CardBody>
          </Card>
        }

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
            <Button color="primary" type="button" onClick={onClickSaveChange}>บันทึก</Button>
          </Col>
          <Col>
            <Button color="secondary" type="button" onClick={{}}>ยกเลิก</Button>
          </Col>
        </Row>
      </Wrapper>
    </Container>
  );
};
export default ExamSchedule;
