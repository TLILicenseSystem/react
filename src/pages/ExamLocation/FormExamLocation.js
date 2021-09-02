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
import {
  showSearchPopup,
  showEditLocationPopup,
  showSnackBar,
} from "../../redux/actions";
import {
  addExamLocation,
  updateExamLocation,
  deleteExamLocation,
} from "../../api/apiAddExamLocation";
import useFetchLocationList from "../../hooks/useFetchLocationList.js";
import styles from "../pageStyles.css";
import Swal from "sweetalert2";


const FormExamLocation = (props) => {
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

  const [examLocationList, setExamLocationList] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const responseLocation = await getExamLocation("A");
    setExamLocationList(get(responseLocation, "data", []));
  };
  useEffect(() => {
    console.log("LocationTable inital ");
    fetchData();
  }, []);

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
  // const onClickEditProvinceButton = (e) => {
  //   setEditProvinceCode(e + "");
  //   setEditProvinceName(getProvinceData(e));
  // };
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
    if (get(e,"event","") === "delete"){
      onClickDeleteLocation(e);
    } else {
      console.log("onClickEditExamLocation ", e);
      console.log("orgCode ", get(e.selected, "orgCode", ""));
      setEditLocationId(get(e.selected, "locationId", ""));
      setEditLocationTypeCode(get(e.selected, "locationType", ""));
      setEditExamOrganizerCode(get(e.selected, "orgCode", ""));
      setEditExamOrganizerName(get(e.selected, "orgName", ""));
      setEditProvinceCode(get(e.selected, "provinceCode", ""));
      setEditProvinceName(get(e.selected, "provinceName", ""));
      let regionId,
        regionName = getRegionData(get(e.selected, "provinceCode", ""));
      setRegion(regionId);
      setRegionName(regionName);
      setEditLocationDetail(get(e.selected, "locationDetail", ""));

      onClickEditLocationPopup("edit", e);
    }
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
    let popupTitle = mode === "edit" ? "แก้ไขสถานที่สอบ" : "เพิ่มสถานที่สอบ";
    dispatch(
      showEditLocationPopup({
        title: popupTitle,
        description: mode,
        locationEditDetail: e,
        action: async () => {
          const responseLocation = await getExamLocationAll();
          setExamLocationList(get(responseLocation, "data", []));
        },
      })
    );
  };

  const onClickDeleteLocation = async (e) => {

    let locationId = get(e,"locationDetail.locationId","");
    let organizerName = get(e,"locationDetail.organizerName","");
    let provinceName = get(e,"locationDetail.provinceName","");

    const { value: check } = await Swal.fire({
      text: `ต้องการลบสนามสอบ ${organizerName} จังหวัด${provinceName} ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d9534f",
      confirmButtonColor: "#0275d8",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });

    if (check) {
      let response = await deleteExamLocation(locationId);
      console.log("onClickDeleteLocation ", response);
      if (response === "success") {
        Swal.fire("Deleted!", "ลบข้อมูลแล้ว", "success");
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบข้อมูลได้",
        });
      }
      
    }
    
  };

  const examZoneResonse = getExamLocationZone();
  const examType = getExamType();

  const getRegionData = async (e) => {
    if (e === "") {
      return "", "";
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

  const rows = examLocationList.map((row) => {
    const { locationId, ...rest } = row;
    return { id: locationId, locationId, ...rest };
  });

  return (
    <Container>
      <EditLocationPopup
        locationId={editLocationId}
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
        onChangeExamType={(e) =>
          setEditLocationTypeCode(get(e, "examTypeId", ""))
        }
      />
      <div style={{ marginTop: "20px" }} className="div">
        <h2 className="head">ตั้งค่าสถานที่สอบ</h2>
        <Wrapper>
          <Card>
            <CardBody>
              <h3 className="head">ตัวกรองข้อมูล</h3>
              <Card>    
                <Row style={{ marginTop: "30px", marginLeft: "20px", minWidth: "1000px"}}>
                  <Col xs="5">
                    <DropdownExamOrganizer
                      label="สนามสอบ"
                      value={examOrganizerCode}
                      isClearable={true}
                      onClick={(e) => {
                        onClickExamOrganizerButton(e);
                      }}
                    />
                  </Col>
                  <Col xs="5">
                    <DropdownExamRegion
                      label="สถานที่สอบ"
                      value={provinceCode}
                      onClick={(e) => {
                        onClickProvinceButton(e);
                      }}
                    />
                  </Col>
                  <Col xs="2">
                    <Button
                      onClick={() => onClickAddExamLocation("add", null)}
                      color="success"
                      style={{
                        marginLeft: 0,
                        marginTop: 34,
                        fontFamily: "Prompt-Regular",
                      }}
                    >
                      เพิ่มสถานที่สอบ
                    </Button>
                  </Col>
                </Row>    
              </Card>
            </CardBody>            
            <CardBody>
              <LocationTable
                provinceCode={provinceCode}
                examOrganizerCode={examOrganizerCode}
                onClick={onClickEditExamLocation}
                event={{event:"edit"}}
                examLocationList={rows}
              />
            </CardBody>
          </Card>
        </Wrapper>
      </div>
    </Container>
  );
};

export default FormExamLocation;
