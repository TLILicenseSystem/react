import React, { useState } from "react";
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
} from "reactstrap";
//import {  } from "react-bootstrap";
import {
  InputWithLabel,
  DropdownExamRegion,
  DropdownExamOrganizer,
  DropdownLocationType,
  searchPopup,
  AlertPopup,
} from "../../components/shared";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone, getExamType } from "../../api/apiGetConfig";
import { getExamLocationAll } from "../../api/apiGetExamLocation";
import useFetchLocationList from "../../hooks/useFetchLocationList.js";
import { showSearchPopup, showAlertPopup } from "../redux/actions";
import { addExamLocation, updateExamLocation, deleteExamLocation } from "../../api/apiAddExamLocation";
import Swal from 'sweetalert2';
import classnames from "classnames";

const FormExamLocation = () => {
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [searchValue, setSearchValue] = useState({});
  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");
  const [examTypeCode, setExamTypeCode] = useState("");
  const [examTypeName, setExamTypeName] = useState("");
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

  const initEditExamForm = () => {
    setEditProvinceName("");
    setEditRegionName("");
    setEditExamTypeName("");
    setEditExamOrganizerName("");
    setEditExamTypeCode("");
    setEditLocationDetail("");
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", "") + "");
    fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickEditProvinceButton = (e) => {
    setEditProvinceCode(e + "");
    setEditProvinceName(getProvinceData(e));
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(e + "");
    fetchExamOrganizer(e);
  };
  const onClickEditExamOrganizerButton = (e) => {
    setEditExamOrganizerCode(e + "");
    fetchEditExamOrganizer(e);
  };
  const onClickExamType = (e) => {
    setExamTypeCode(e + "");
    setExamTypeName(
      get(
        examType.filter((type) => type.examTypeId === e)[0],
        "examTypeName",
        ""
      )
    );
  };
  const onClickEditExamType = (e) => {
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
          history.push("/FormExamLocation", "");
          setExamLocationStateList(examLocationList);
        },
      })
    );
  };
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const onClickAddExamLocation = async () => {

    if (examOrganizerCode === "" || provinceCode === "" || locationDetail === "" || examTypeCode === ""){
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      });
      return;
    };

    let examlocation = {
      orgCode: examOrganizerCode,
      provinceCode: provinceCode,
      locationDetail: locationDetail,
      locationType: examTypeCode,
      createUserCode: "2901133",
    };
    let response = await addExamLocation(examlocation);
    if (response !== "error"){
      Swal.fire(
        'Added!',
        'อัพโหลดข้อมูลแล้ว',
        'success'
      );
      reloadLocationList();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถแก้ไขข้อมูลได้',
      });
    };    
  };
  const onClickSearchAll = () => {
    setSearchValue();
    setExamLocationStateList(examLocationList);
  };
  const reloadLocationList = async () => {
    let response = await getExamLocationAll();    
    setExamLocationStateList(get(response,"data",[]));
  };
  const onClickEditLocation = (detail) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    toggleTab("2");
    initEditExamForm();
    console.log("onClickEditLocation ", detail);
    setEditLocationId(get(detail,"locationId",""));
    onClickEditProvinceButton(get(detail,"provinceCode",""));
    setEditRegionName(getRegionData(get(detail,"provinceCode","")));
    onClickEditExamOrganizerButton(get(detail,"orgCode",""));
    onClickEditExamType(get(detail,"locationType",""));
    setEditLocationDetail(get(detail,"locationDetail",""));
  };
  const onClickEditLocationData = async () => {
    if (editExamOrganizerCode === "" || editLocationDetail === "" || editExamTypeCode === ""){
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      });
      return;
    };

    let examlocation = {
      locationId: editLocationId,
      orgCode: editExamOrganizerCode,
      provinceCode: editProvinceCode,
      locationDetail: editLocationDetail,
      locationType: editExamTypeCode,
      createUserCode: "2901133",
    };

    let response = await updateExamLocation(examlocation);

    if (response !== "error"){
      Swal.fire(
        'Updated!',
        'แก้ไขข้อมูลแล้ว',
        'success'
      );
      reloadLocationList();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถแก้ไขข้อมูลได้',
      });
    };     
  };
  const onClickDeleteLocation = async (detail) => {

    const { value: check } = await Swal.fire({
      text: `ต้องการลบรหัสที่ตั้ง ${get(detail, "locationId", "")} จังหวัด${getProvinceData(get(detail, "provinceCode", ""))} ใช่หรือไม่`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    });

    if (check) {

      let locationId = get(detail, "locationId", "");
      let response = await deleteExamLocation(locationId);
      console.log("onClickDeleteLocation " , response);
      if (response === "success"){
        Swal.fire(
          'Deleted!',
          'ลบข้อมูลแล้ว',
          'success'
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถลบข้อมูลได้',
        });
      };      
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

  const history = useHistory();
  const dispatch = useDispatch();

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
    <Card>
      <SearchPopup onChange={getSearchValue} />
      <AlertPopup />
      <CardHeader>
        ตั้งค่าสถานที่สอบ{"   "}
        <ButtonGroup>
          <Button onClick={onClickSearchExam} color="primary">Search🔎</Button>
          <Button onClick={onClickSearchAll} color="secondary">Show All</Button>
        </ButtonGroup>
      </CardHeader>
      <CardBody>
        <ListGroup>
          <ListGroupItem>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggleTab("1");
                  }}
                >
                  เพิ่มสถานที่ตั้งสอบ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggleTab("2");
                  }}
                  disabled={true}
                >
                  แก้ไขสถานที่ตั้งสอบ
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row xs="1">
                  <Col xs="6">
                  <InputWithLabel
                    label="รหัสที่ตั้ง"
                    value=""
                    textboxSize={4}
                    disabled={true}
                  />
                  </Col>
                  <Col xs="6"></Col>
                </Row>
                <Row xs="1" sm="3">
                  <Col xs="6">
                    <DropdownExamRegion
                      label="สนามสอบ"
                      value={provinceCode}
                      requiredField={true}
                      onClick={(e) => {
                        onClickProvinceButton(e);
                      }}
                    />
                  </Col>

                  <Col xs="6">
                    <InputWithLabel
                      label="โซน"
                      value={regionName}
                      disabled={false}
                    />
                  </Col>
                </Row>
                <Row xs="1" sm="2">
                  <DropdownExamOrganizer
                    label="สถานที่สอบ"
                    value={examOrganizerCode + examOrganizerName}
                    requiredField={true}
                    onClick={(e) => {
                      onClickExamOrganizerButton(e);
                    }}
                  />
                  <DropdownLocationType
                    label="ประเภท"
                    value={examTypeCode + examTypeName}
                    requiredField={true}
                    onClick={(e) => {
                      onClickExamType(e);
                    }}
                  />
                </Row>
                <Row xs="1">
                  <InputWithLabel
                    label="สถานที่ตั้งสอบ"
                    labelSize={2}
                    textboxSize={9}
                    value={locationDetail}
                    requiredField={true}
                    onChange={(e) => {
                      setLocationDetail(e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <Button onClick={onClickAddExamLocation} color="primary">
                    อัพโหลดข้อมูล
                  </Button>
                </Row>
              </TabPane>


              <TabPane tabId="2">
                <Row xs="1">
                  <Col xs="6">
                  <InputWithLabel
                    label="รหัสที่ตั้ง"
                    value={editLocationId}
                    labelSize={4}
                    textboxSize={4}
                    disabled={true}
                    onChange={(e) => {
                      //setUsername(e.target.value);
                    }}
                  />
                  <Col xs="6"></Col>
                  </Col>
                </Row>
                <Row xs="1" sm="3">
                  <Col xs="6">
                    <DropdownExamRegion
                      label="สนามสอบ"
                      value={editProvinceCode}
                      disabled={true}
                    />
                  </Col>
                  <Col xs="6">
                    <InputWithLabel
                      label="โซน"
                      value={editRegionName}
                      disabled={true}
                    />
                  </Col>
                </Row>
                <Row xs="1" sm="2">
                  <DropdownExamOrganizer
                    label="สถานที่สอบ"
                    value={editExamOrganizerCode + editExamOrganizerName}
                    requiredField={true}
                    onClick={(e) => {
                      onClickEditExamOrganizerButton(e);
                    }}
                  />
                  <DropdownLocationType
                    label="ประเภท"
                    value={editExamTypeCode + editExamTypeName}
                    requiredField={true}
                    onClick={(e) => {
                      onClickEditExamType(e);
                    }}
                  />
                </Row>
                <Row xs="1">
                  <InputWithLabel
                    labelSize={2}
                    textboxSize={10}
                    label="สถานที่ตั้งสอบ"
                    value={editLocationDetail}
                    requiredField={true}
                    onChange={(e) => {
                      setEditLocationDetail(e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <Button onClick={onClickEditLocationData} color="warning">
                    แก้ไขข้อมูล
                  </Button>
                </Row>
              </TabPane>
            </TabContent>
          </ListGroupItem>

          <ListGroupItem>
            <div
              style={{
                maxHeight: "700px",
                overflowY: "auto",
              }}
            >
              <Table hover striped responsive bordered>
                <thead>
                  <tr>
                    <th>รหัสที่ตั้ง</th>
                    <th>สนามสอบ</th>
                    <th>โซน</th>
                    <th>สถานที่สอบ</th>
                    <th>ประเภท</th>
                    <th>สถานที่ตั้งสอบ</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>                  
                  {examLocationStateList
                    .filter(
                      (zone) =>
                        (zone.provinceCode ===
                          get(searchValue, "provinceCode", "") &&
                          zone.orgCode ===
                            get(searchValue, "examOrganizerCode", "")) ||
                        get(searchValue, "provinceCode", "") === ""
                    )
                    .map((detail, index) => {
                      return (
                        <tr key={index}>
                          <td>{get(detail, "locationId", "")}</td>
                          <td>
                            {get(detail, "provinceCode", "")}{" "}
                            {getProvinceData(get(detail, "provinceCode", ""))}
                          </td>
                          <td>
                            {get(detail, "zone", "")}{" "}
                            {getRegionData(get(detail, "provinceCode", ""))}
                          </td>
                          <td>
                            {get(detail, "orgCode", "")}{" "}
                            {getOrganizerData(get(detail, "orgCode", ""))}
                          </td>
                          <td>
                            {get(detail, "locationType", "")}{" "}
                            {getlocationDetailData(
                              get(detail, "locationType", "")
                            )}
                          </td>
                          <td>{get(detail, "locationDetail", "")}</td>
                          <td>
                          <ButtonGroup>
                            <Button onClick={() => {onClickEditLocation(detail)}} color="warning" size="sm">Edit</Button>
                            <Button onClick={() => {onClickDeleteLocation(detail)}} color="danger" size="sm">x</Button>
                          </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default FormExamLocation;
