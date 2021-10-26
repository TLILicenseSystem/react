import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import {
  DropdownExamRegion,
  DropdownExamOrganizer,
  Container,
  EditLocationPopup,
  Table,
  EditButton,
  DeleteButton,
  AddButton,
  FilterCollapse,
} from "../../components/shared";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { getExamLocation } from "../../api/apiGetExamLocation";
import { showEditLocationPopup } from "../../redux/actions";
import { deleteExamLocation } from "../../api/apiAddExamLocation";
import Swal from "sweetalert2";

const FormExamLocation = (props) => {
  const [provinceCode, setProvinceCode] = useState("");
  const [examLocationList, setExamLocationList] = useState([]);
  const [examOrganizerCode, setExamOrganizerCode] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      field: "locationId",
      headerName: "รหัสที่ตั้ง",
      width: 150,
    },
    {
      field: "orgName",
      headerName: "สถานที่สอบ",
      minWidth: 250,
      align: "left",
    },
    { field: "provinceName", headerName: "สนามสอบ", minWidth: 160 },
    {
      field: "locationTypeName",
      headerName: "แก้ไขสถานที่สอบ",
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

  const filterData = (data) => {
    let result = data;
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
  };

  const fetchData = async () => {
    setLoading(true);
    const responseLocation = await getExamLocation("A");
    let result = get(responseLocation, "data", []).map((row) => {
      const { locationId, ...rest } = row;
      return { id: locationId, locationId, ...rest };
    });
    setExamLocationList(result); // เก็บค่าแบบคงที่ ไม่เปลี่ยนแปลง
    filterData(result); // เก็บค่าที่ผ่านการ filter
    setLoading(false);
  };

  // ทำงานครั้งแรกที่เข้าหน้านี้
  useEffect(() => {
    fetchData();
  }, []);

  // ทำงานทุกครั้งที่ตัวแปรใน [] เปลี่ยน
  // เหมาะสำหรับการ filter
  useEffect(() => {
    filterData(examLocationList);
  }, [examOrganizerCode, provinceCode]);

  const onClickAddExamLocation = () => {
    onClickEditLocationPopup("add", null);
  };
  const onClickEditExamLocation = async (data) => {
    onClickEditLocationPopup("edit", data);
  };

  const onClickEditLocationPopup = (mode, data) => {
    let popupTitle =
      mode === "edit" ? "แก้ไขสถานที่ตั้งสอบ" : "เพิ่มสถานที่ตั้งสอบ";
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
    // let organizerName = get(data, "organizerName", "");
    // let provinceName = get(data, "provinceName", "");
    let locationDetail = get(data, "locationDetail", "");
    const { value: check } = await Swal.fire({
      text: `ต้องการลบสถานที่ตั้งสอบ ${locationDetail} ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d9534f",
      confirmButtonColor: "#0275d8",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    });

    if (check) {
      let response = await deleteExamLocation(locationId);

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

  return (
    <Container>
      <EditLocationPopup />
      <div className="contents">
        <h2 className="head">ตั้งค่าสถานที่ตั้งสอบ</h2>
        <Card>
          <CardBody>
            <FilterCollapse title="ตัวกรองข้อมูล">
              <Row>
                <Col xs="12" sm="4" md="4">
                  <DropdownExamOrganizer
                    label="สถานที่สอบ"
                    value={examOrganizerCode}
                    isClearable={true}
                    onClick={(e) => {
                      setExamOrganizerCode(get(e, "orgCode", ""));
                    }}
                  />
                </Col>
                <Col xs="12" sm="4" md="4">
                  <DropdownExamRegion
                    label="สนามสอบ"
                    value={provinceCode}
                    onClick={(e) => {
                      setProvinceCode(get(e, "provinceCode", ""));
                    }}
                  />
                </Col>
              </Row>
            </FilterCollapse>
          </CardBody>
          <CardBody style={{ textAlign: "right", paddingBottom: 0 }}>
            <AddButton
              title="เพิ่มสถานที่ตั้งสอบ"
              onClick={() => onClickAddExamLocation()}
            />
          </CardBody>
          <CardBody>
            <Table
              data={data}
              id="locationId"
              columns={columns}
              loading={loading}
            />
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default FormExamLocation;
