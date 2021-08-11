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
import Swal from "sweetalert2";
import classnames from "classnames";
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
  const [editRegionName, setEditRegionName] = useState("");
  const [editExamOrganizerCode, setEditExamOrganizerCode] = useState("");
  const [editExamTypeCode, setEditExamTypeCode] = useState("");
  const [editExamTypeName, setEditExamTypeName] = useState("");
  const [editExamOrganizerName, setEditExamOrganizerName] = useState("");
  const [editLocationDetail, setEditLocationDetail] = useState("");

  const dispatch = useDispatch();

  const initEditExamForm = () => {
    setEditProvinceName("");
    setEditRegionName("");
    setEditExamTypeName("");
    setEditExamOrganizerName("");
    setEditExamTypeCode("");
    setEditLocationDetail("");
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
    fetchProvinceData(get(e, "provinceCode", ""));
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
  const onClickEditExamLocation = (e) => {
    console.log("onClickEditExamLocation ",e);
    onClickEditLocationPopup("edit", e);
    setEditExamTypeCode(e + "");
    setEditExamTypeName(
      get(
        examType.filter((type) => type.examTypeId === e)[0],
        "examTypeName",
        ""
      )
    );
  };
  const onClickSearchExam = () => {
    dispatch(
      showSearchPopup({
        title: "DlgListLocation",
        description: "",
        action: () => {
          //คำสั่งในการเปลี่ยนหน้า (หน้าที่ต้องการไป, state หรือ parametter ที่ parse ไปอีกหน้า ซึ่งส่งได้ตัวเดียว)
          //setExamLocationStateList(examLocationList);
        },
      })
    );
  };
  const onClickEditLocationPopup = (mode, e) => {
    let popupTitle = mode === "edit" ? "แก้ไขสถานที่สอบ" : "เพิ่มสถานที่สอบ";
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
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const onClickAddExamLocation = async () => {
    if (
      examOrganizerCode === "" ||
      provinceCode === "" ||
      locationDetail === "" ||
      examTypeCode === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      });
      return;
    }

    let examlocation = {
      orgCode: examOrganizerCode,
      provinceCode: provinceCode,
      locationDetail: locationDetail,
      locationType: examTypeCode,
      createUserCode: "2901133",
    };
    let response = await addExamLocation(examlocation);
    if (response !== "error") {
      Swal.fire("Added!", "อัพโหลดข้อมูลแล้ว", "success");
      reloadLocationList();
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขข้อมูลได้",
      });
    }
  };
  const onClickSearchAll = () => {
    setSearchValue();
    setExamLocationStateList(examLocationList);
  };
  const reloadLocationList = async () => {
    let response = await getExamLocationAll();
    setExamLocationStateList(get(response, "data", []));
  };

  const onClickEditLocationData = async () => {
    if (
      editExamOrganizerCode === "" ||
      editLocationDetail === "" ||
      editExamTypeCode === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      });
      return;
    }

    let examlocation = {
      locationId: editLocationId,
      orgCode: editExamOrganizerCode,
      provinceCode: editProvinceCode,
      locationDetail: editLocationDetail,
      locationType: editExamTypeCode,
      createUserCode: "2901133",
    };

    let response = await updateExamLocation(examlocation);

    if (response !== "error") {
      Swal.fire("Updated!", "แก้ไขข้อมูลแล้ว", "success");
      reloadLocationList();
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขข้อมูลได้",
      });
    }
  };
  const onClickDeleteLocation = async (detail) => {
    const { value: check } = await Swal.fire({
      text: `ต้องการลบรหัสที่ตั้ง ${get(
        detail,
        "locationId",
        ""
      )} จังหวัด${getProvinceData(get(detail, "provinceCode", ""))} ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    });

    if (check) {
      let locationId = get(detail, "locationId", "");
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
  const {
    examLocationList,
    examProvinceList,
    examZoneList,
    examOrganizerList,
  } = useFetchLocationList();

  const fetchProvinceData = async (e) => {
    const response = await getProvinceCode(e);
    setRegion(get(response[0], "region", ""));
    setRegionName(
      get(
        examZoneResonse.filter(
          (zone) => zone.regionCode === get(response[0], "region", "")
        )[0],
        "regionName",
        ""
      )
    );
    setProvinceName(
      get(
        response.filter((zone) => zone.provinceCode === e)[0],
        "provinceName",
        ""
      )
    );
  };
  const fetchExamOrganizer = async (e) => {
    const response = await getOrganizer(e);
    setExamOrganizerName(get(response[0], "orgName", ""));
  };
  const fetchEditExamOrganizer = async (e) => {
    const response = await getOrganizer(e);
    setEditExamOrganizerName(get(response[0], "orgName", ""));
  };
  const getSearchValue = (e) => {
    setSearchValue(e);
  };
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
  const getRegionData = (e) => {
    if (e !== "" || e !== null) {
      const region = get(
        examProvinceList.filter((zone) => zone.provinceCode === e)[0],
        "region",
        ""
      );

      if (region !== "") {
        const regionName = get(
          examZoneList.filter((zone) => zone.regionCode === region)[0],
          "regionName",
          ""
        );
        return regionName;
      }
    }
    return "";
  };
  const getOrganizerData = (e) => {
    if (e !== "" || e !== null) {
      const organizerName = get(
        examOrganizerList.filter((zone) => zone.orgCode === e)[0],
        "orgName",
        ""
      );
      return organizerName;
    } else {
      return "";
    }
  };
  const getlocationDetailData = (e) => {
    if (e !== "" || e !== null) {
      const locationDetail = get(
        examType.filter((zone) => zone.examTypeId === e)[0],
        "examTypeName",
        ""
      );
      return locationDetail;
    } else {
      return "";
    }
  };

  return (
    <Container>
      {/* <SearchPopup onChange={getSearchValue} /> */}
      <EditLocationPopup />
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
                    onClick={() => onClickEditLocationPopup("add")}
                    color="success"
                    style={{ marginLeft: 0, marginTop: 33, fontFamily: "Prompt-Regular"}}
                  >
                    เพิ่มสถานที่สอบ
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card style={{ marginTop: "20px" }}>
            <CardBody>
              <LocationTable
                provinceCode={provinceCode}
                examOrganizerCode={examOrganizerCode}
                onClick={onClickEditExamLocation}
              />
            </CardBody>
          </Card>
        </Wrapper>
      </div>
    </Container>
  );
};

export default FormExamLocation;
