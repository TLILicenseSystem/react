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
  Table,
  EditButton,
  DeleteButton,
  AddButton,
  FilterCollapse,
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
  const [examOrganizerCode, setExamOrganizerCode] = useState(null);
  const [data, setData] = useState([]);

  const columns = [
    {
      field: "locationId",
      headerName: "รหัสที่ตั้ง",
      align: "center",
      width: 150,
    },
    {
      field: "orgName",
      headerName: "สนามสอบ",
      minWidth: 250,
      align: "left",
    },
    { field: "provinceName", headerName: "สถานที่สอบ", minWidth: 160 },
    {
      field: "locationName",
      headerName: "ประเภท",
      minWidth: 250,
      align: "left",
    },
    {
      field: "locationDetail",
      headerName: "สถานที่ตั้งสอบ",
      minWidth: 250,
      align: "left",
    },
    {
      field: "edit",
      headerName: "แก้ไข",
      align: "center",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <EditButton onClick={() => onClickEditExamLocation(cellValues.row)} />
        );
      },
    },
    {
      field: "delete",
      headerName: "ลบ",
      align: "center",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <DeleteButton onClick={() => onClickDeleteLocation(cellValues.row)} />
        );
      },
    },
  ];
  const dispatch = useDispatch();

  const fetchData = async () => {
    const responseLocation = await getExamLocation("A");
    let result = get(responseLocation, "data", []).map((row) => {
      const { locationId, ...rest } = row;
      return { id: locationId, locationId, ...rest };
    });
    setExamLocationList(result); // เก็บค่าแบบคงที่ ไม่เปลี่ยนแปลง
    setData(result); // เก็บค่าที่ผ่านการ filter
  };

  // ทำงานครั้งแรกที่เข้าหน้านี้
  useEffect(() => {
    console.log("LocationTable inital ");
    fetchData();
  }, []);

  // ทำงานทุกครั้งที่ตัวแปรใน [] เปลี่ยน
  // เหมาะสำหรับการ filter
  useEffect(() => {
    let result = examLocationList;
    if (examOrganizerCode) {
      result = result.filter((row) => {
        return row.orgCode === examOrganizerCode;
      });
    }
    if (provinceCode) {
      result = result.filter((row) => {
        return row.provinceCode === provinceCode;
      });
    }
    setData(result);
  }, [examOrganizerCode, provinceCode]);

  const onClickAddExamLocation = () => {
    onClickEditLocationPopup("add", null);
  };
  const onClickEditExamLocation = async (data) => {
    onClickEditLocationPopup("edit", data);
  };

  const onClickEditLocationPopup = (mode, data) => {
    let popupTitle = mode === "edit" ? "แก้ไขสถานที่สอบ" : "เพิ่มสถานที่สอบ";
    dispatch(
      showEditLocationPopup({
        title: popupTitle,
        description: mode,
        initialValues: data,
        action: async () => {
          await fetchData();
        },
      })
    );
  };

  const onClickDeleteLocation = async (data) => {
    let locationId = get(data, "locationId", "");
    let organizerName = "organizerName";
    //  get(e, "locationDetail.organizerName", "");
    let provinceName = "provinceName";
    // get(e, "locationDetail.provinceName", "");
    // ${organizerName} จังหวัด${provinceName}
    const { value: check } = await Swal.fire({
      text: `ต้องการลบสนามสอบ ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d9534f",
      confirmButtonColor: "#0275d8",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });

    if (check) {
      let response = await deleteExamLocation(locationId);
      {
      }
      if (response === "success") {
        Swal.fire("Deleted!", "ลบข้อมูลแล้ว", "success");
        fetchData();
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
      setRegionName(tmpRegionName);
    }
  };

  return (
    <Container>
      <EditLocationPopup
      // locationId={editLocationId}
      // locationTypeCode={editLocationTypeCode}
      // locationTypeName={editLocationTypeName}
      // region={region}
      // regionName={regionName}
      // organizerCode={editExamOrganizerCode}
      // organizerName={editExamOrganizerName}
      // provinceCode={editProvinceCode}
      // provinceName={editProvinceName}
      // locationDetail={editLocationDetail}
      // onChangeLocationDetail={(e) => setEditLocationDetail(e)}
      // onChangeExamType={(e) =>
      //   setEditLocationTypeCode(get(e, "examTypeId", ""))
      // }
      />
      <div className="contents">
        <div className="test">
          <h2 className="head">ตั้งค่าสถานที่สอบ</h2>
          <AddButton
            title="เพิ่มสถานที่สอบ"
            onClick={() => onClickAddExamLocation()}
          />
        </div>

        <Card>
          <CardBody>
            <FilterCollapse title="ตัวกรองข้อมูล">
              <Row>
                <Col xs="12" sm="4" md="4">
                  <DropdownExamOrganizer
                    label="สนามสอบ"
                    value={examOrganizerCode}
                    isClearable={true}
                    onClick={(e) => {
                      setExamOrganizerCode(get(e, "orgCode", ""));
                    }}
                  />
                </Col>
                <Col xs="12" sm="4" md="4">
                  <DropdownExamRegion
                    label="สถานที่สอบ"
                    value={provinceCode}
                    onClick={(e) => {
                      setProvinceCode(get(e, "provinceCode", ""));
                    }}
                  />
                </Col>
              </Row>
            </FilterCollapse>
          </CardBody>
          <CardBody>
            <Table
              data={data}
              id="locationId"
              columns={columns}
              // examOrganizerCode={examOrganizerCode}
              // onClick={onClickEditExamLocation}
              // event={{ event: "edit" }}
              // examLocationList={rows}
            />
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default FormExamLocation;
