import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ButtonGroup,
  Media,
} from "reactstrap";
//import {  } from "react-bootstrap";
import {
  InputWithLabel,
  DropdownExamRegion,
  DropdownExamOrganizer,
  DropdownLocationType,
  SearchPopup,
  Container,
  Wrapper,
  InputWithLabelRow,
  EditLocationPopup,
  LocationTable,
} from "../../components/shared";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getProvinceCode,
  getProvinceCodeAll,
} from "../../api/apiGetProvinceCode";
import { getOrganizer, getOrganizerAll } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone, getExamType } from "../../api/apiGetConfig";
import {
  getExamLocation,
  getExamLocationAll,
} from "../../api/apiGetExamLocation";
import { showSearchPopup, showEditLocationPopup } from "../../redux/actions";
import {
  addExamLocation,
  updateExamLocation,
  deleteExamLocation,
} from "../../api/apiAddExamLocation";
import useFetchLocationList from "../../hooks/useFetchLocationList.js";
import styles from "../pageStyles.css";

const FormExamLocation = () => {
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [searchValue, setSearchValue] = useState({});
  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");
  const [examTypeCode, setExamTypeCode] = useState("");
  const [locationDetail, setLocationDetail] = useState("");
  const [examLocationStateList, setExamLocationStateList] = useState([]);

  const [editLocationId, setEditLocationId] = useState("");
  const [editProvinceCode, setEditProvinceCode] = useState("");
  const [editProvinceName, setEditProvinceName] = useState("");
  const [editLocationTypeCode, setEditLocationTypeCode] = useState("");
  const [editLocationTypeName, setEditLocationTypeName] = useState("");
  const [editRegionName, setEditRegionName] = useState("");
  const [editExamOrganizerCode, setEditExamOrganizerCode] = useState("");
  const [editExamOrganizerName, setEditExamOrganizerName] = useState("");
  const [editLocationDetail, setEditLocationDetail] = useState("");

  const dispatch = useDispatch();

  const initEditExamForm = () => {
    setEditProvinceName("");
    setEditRegionName("");
    setEditLocationTypeName("");
    setEditExamOrganizerName("");
    setEditLocationTypeCode("");
    setEditLocationDetail("");
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
    //fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickEditProvinceButton = (e) => {
    setEditProvinceCode(e + "");
    setEditProvinceName(getProvinceData(e));
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(get(e, "orgCode", ""));
  };
  const onClickEditExamOrganizerButton = (e) => {
    setEditExamOrganizerCode(e + "");
  };
  const onClickExamType = (e) => {
    setExamTypeCode(get(e, "examTypeId", "1"));
  };
  const onClickEditExamLocation = async (e) => {
    console.log("onClickEditExamLocation ",e);
    setEditLocationId(get(e,"locationId",""));
    setEditLocationTypeCode(get(e,"locationTypeCode",""));
    setEditLocationTypeName(get(e,"locationTypeName",""));
    setEditExamOrganizerCode(get(e,"organizerCode",""));
    setEditExamOrganizerName(get(e,"organizerName",""));
    setEditProvinceCode(get(e,"provinceCode",""));
    setEditProvinceName(get(e,"provinceName",""));
    let regionId, regionName = getRegionData(get(e,"provinceCode",""));
    setRegion(regionId);
    setRegionName(regionName);
    setEditLocationDetail(get(e,"locationDetail",""));

    onClickEditLocationPopup("edit", e);
    // setEditLocationTypeCode(e + "");
    // setEditLocationTypeName(
    //   get(
    //     examType.filter((type) => type.examTypeId === e)[0],
    //     "examTypeName",
    //     ""
    //   )
    // );    
  };
  const onClickAddExamLocation = (mode) => {
    setEditLocationId("");
    setEditLocationTypeCode("");
    setEditLocationTypeName("");
    setEditExamOrganizerCode("");
    setEditExamOrganizerName("");
    setEditProvinceCode("");
    setEditProvinceName("");
    setEditLocationDetail("");

    onClickEditLocationPopup(mode);

  };
  const onClickEditLocationPopup = (mode, e) => {
    let popupTitle = (mode === "edit" ? "แก้ไขสถานที่สอบ" : "เพิ่มสถานที่สอบ");
    dispatch(
      showEditLocationPopup({
        title: popupTitle,
        description: mode,
        locationEditDetail: e,        
        action: () => {
          //คำสั่งในการเปลี่ยนหน้า (หน้าที่ต้องการไป, state หรือ parametter ที่ parse ไปอีกหน้า ซึ่งส่งได้ตัวเดียว)
          //setExamLocationStateList(examLocationList);
        },
      })
    );
  };

  const examZoneResonse = getExamLocationZone();
  const examType = getExamType();
  const {
    examLocationList,
    examProvinceList,
    examZoneList,
    examOrganizerList,
  } = useFetchLocationList();
  const getProvinceData = (e) => {
    if (e !== "" || e !== null) {
      const provinceName = get(
        examProvinceList.filter((zone) => zone.provinceCode === e)[0],
        "provinceName",
        ""
      );
      return provinceName;
    } else {
      return "";
    }
  };
  const getRegionData = async (e) => {
    if (e === "") {
      return ("","");
    } else {
      const response = await getProvinceCode(e);
      let tmpRegionCode = get(response[0], "region", "");
      setRegion(tmpRegionCode);      
      let tmpRegionName = get(
        examZoneResonse.filter(
          (zone) => zone.regionCode === get(response[0], "region", "")
        )[0],
        "regionName",
        ""
      );
      console.log(tmpRegionName);
      setRegionName(tmpRegionName);
    }
  };

  return (
    <Container>
      
      {/* <SearchPopup onChange={getSearchValue} /> */}
      <EditLocationPopup locationId={editLocationId}
                        locationTypeCode={editLocationTypeCode}
                        locationTypeName={editLocationTypeName}
                        region={region}
                        regionName={regionName}                        
                        organizerCode={editExamOrganizerCode}
                        organizerName={editExamOrganizerName}
                        provinceCode={editProvinceCode}
                        provinceName={editProvinceName}
                        locationDetail={editLocationDetail}
                        onChangeLocationDetail={(e) => setEditLocationDetail(e)}
                        onChangeExamType={(e) => setEditLocationTypeCode(get(e,"examTypeId",""))}/>
      <div style={{ marginTop: "20px" }} className="div">
        <h2 className="head">ตั้งค่าสถานที่สอบ</h2>
        <Wrapper>
          <Card>
            <CardBody>
              <h3 className="head">ตัวกรองข้อมูล</h3>

              <Row style={{ marginTop: "30px", marginLeft: "20px" }}>
                <Col xs="5">
                  <DropdownExamRegion
                    label="สนามสอบ"
                    value={provinceCode}
                    onClick={(e) => {
                      onClickProvinceButton(e);
                    }}
                  />
                </Col>
                <Col xs="5">
                  <DropdownExamOrganizer
                    label="สถานที่สอบ"
                    value={examOrganizerCode}
                    isClearable={true}
                    onClick={(e) => {
                      onClickExamOrganizerButton(e);
                    }}
                  />
                </Col>
                <Col xs="2">
                  <Button
                    onClick={() => onClickAddExamLocation("add", null)}
                    color="success"
                    style={{ marginLeft: 0, marginTop: 33, fontFamily: "Prompt-Regular"}}
                  >
                    เพิ่มสถานที่สอบ
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
          {/* <Card style={{ marginTop: "20px" }}> */}
            <CardBody>
              <LocationTable
                provinceCode={provinceCode}
                examOrganizerCode={examOrganizerCode}
                onClick={onClickEditExamLocation}
              />
            </CardBody>
          {/* </Card> */}
        </Wrapper>
      </div>
    </Container>
  );
};

export default FormExamLocation;
