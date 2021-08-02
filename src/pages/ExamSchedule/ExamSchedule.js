import React, { useEffect, useState } from "react";
import { Container, InputWithLabel, Wrapper } from "../../components/shared";
import BoxScheduleFirst from "./BoxScheduleFirst";
import BoxSchedule from "./BoxSchedule";
import BoxUserModify  from "./BoxUserModify";
import styles from "./ExamSchedule.module.css";
import { Button } from "reactstrap";
const ExamSchedule = (props) => {
    const [examDate, setExamDate] = useState("00/00/0000");
    const [closeDate, setCloseDate] = useState("00/00/0000");
    const [examTime, setExamTime] = useState("00.00");
    const [receiveDate, setReceiveDate] = useState("00/00/0000");
    const [receiveTime, setReceiveTime] = useState("00/00/0000");
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
    const [userModify, setUserModify] = useState(""); 
    const [modifyDate, setModifyDate] = useState(""); 

    // const [disableExam, setDisableExam]= useState(true); 
    // const changeExam = () => {
    //     setDisableTime(false);
    //   }
    // };


    // useEffect(() => {
    //   fetchData();
    // }, []);

  return (
    <Container>
      <Wrapper>
        <div>
          <td colSpan='6'>
            <Button color="primary" type="button" >ค้นหา</Button>
          </td>
          <td>
            <Button color="success" type="button" >เพิ่ม</Button>
          </td>
          <td>
            <Button color="warning" type="button" >แก้ไข</Button>
          </td>
          <td>
            <Button color="danger" type="button" >ลบ</Button>
          </td>

        </div>

        <div>
          <BoxScheduleFirst lExamDate="วันที่สอบ"
                       lCloseDate="วันที่ปิดรับสมัคร"
                       lRoundTime="เวลาสอบ"
                       lReceiveDate="วันที่ได้รับหนังสือ"
                       lReceiveTime="เวลาที่ได้รับหนังสือ"
                       lNum="จำนวนผู้สมัคร(คน)"
                       InExamDate={examDate} 
                       InCloseDate={closeDate}
                       InRoundTime={examTime}
                       InReceiveDate={receiveDate}
                       InReceiveTime={receiveTime}
                       InNum={num}
                      />
        </div>

        <div className={styles.head}>
            <td>
            <p>ข้อมูลสถานที่สอบหลัก</p>
            </td>
        </div>

        <div className={styles.scheduleContainer}>
          <BoxSchedule 
                        lLocationID="รหัสสถานที่ตั้งสอบ" 
                        lOrg="สถานที่สอบ"
                        lProvince="สนามสอบ"
                        lType="ประเภทสถานที่ตั้ง"
                        lLocation="สถานที่ตั้งสอบ"
                        InLocationID={locationID1}
                        InOrg={org1}
                        InProvince={regionCode1}
                        InProvinceName={regionName1}
                        InType={locationType1}
                        InLocation={Location1}

          />
        </div>

        <div className={styles.buttonChangeSchedule} >
            <td>
            <button type="button" class="btn btn-secondary btn-sm" >เปลี่ยนแปลงสถานที่สอบ</button>
            </td>

        </div>

        <div className={styles.head}>
            <td>
            <p>ข้อมูลสถานที่สอบอื่นๆ</p>
            </td>

        </div>


        <div className={styles.scheduleContainer}>
          <BoxSchedule 
                        lLocationID="รหัสสถานที่ตั้งสอบ" 
                        lOrg="สถานที่สอบ"
                        lProvince="สนามสอบ"
                        lType="ประเภทสถานที่ตั้ง"
                        lLocation="สถานที่ตั้งสอบ"
                        InLocationID={locationID2}
                        InOrg={org2}
                        InProvince={regionCode2}
                        InProvinceName={regionName2}
                        InType={locationType2}
                        InLocation={Location2}
          
          
          />
        </div>

        <div>
            <BoxUserModify
                lUser="ผู้บันทึก"
                lModifyDate="วันที่บันทึก"
                InUser={userModify}
                InModifyDate={modifyDate}
            />
           
        </div>


        <div className={styles.center}>
            <td>
            <Button color="primary" type="button" >บันทึก</Button>
            </td>&nbsp;&nbsp;&nbsp;
            <td>
            <Button color="secondary" type="button" >ยกเลิก</Button>
            </td>

        </div>
      </Wrapper>
    </Container>
  );
};
export default ExamSchedule;
