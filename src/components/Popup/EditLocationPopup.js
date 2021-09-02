import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import { Alert } from "react-bootstrap";
import {
  DropdownExamRegion,
  DropdownExamOrganizer,
  DropdownLocationType,
  SearchPopup,
  InputWithLabelRow,
} from "../../components/shared";
import {
  addExamLocation,
  updateExamLocation,
  deleteExamLocation,
} from "../../api/apiAddExamLocation";
import Snackbar from "@material-ui/core/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchPopup, hideEditLocationPopup } from "../../redux/actions";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone } from "../../api/apiGetConfig";
import { get } from "lodash";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const EditLocationPopup = ({
  locationId,
  locationTypeCode,
  locationTypeName,
  region,
  regionName,   
  organizerCode,
  organizerName,
  provinceCode,
  provinceName,
  locationDetail,
  onChangeLocationDetail,
  onChangeExamType,
}) => {

  const [addRegion, setAddRegion] = useState("");
  const [addRegionName, setAddRegionName] = useState("");
  const [addProvinceCode, setAddProvinceCode] = useState("");
  // const [provinceName, setProvinceName] = useState("");
  const [addExamOrganizerCode, setAddExamOrganizerCode] = useState("");
  const [addExamOrganizerName, setAddExamOrganizerName] = useState("");
  // const [locationDetail, setLocationDetail] = useState("");
  const [addExamTypeCode, setAddExamTypeCode] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const examZoneResonse = getExamLocationZone();
  const dispatch = useDispatch();
  const { isShow, title, description, locationEditDetail, action } =
    useSelector((state) => state.editLocationPopup);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const onClickProvinceButton = (e) => {
    setAddProvinceCode(get(e, "provinceCode", ""));
    fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickExamOrganizerButton = (e) => {
    setAddExamOrganizerCode(get(e, "orgCode", ""));
    //fetchExamOrganizer(get(e, "orgCode", ""));
  };
  // const onClickExamType = (e) => {
  //   setExamTypeCode(get(e, "examTypeId", "1"));
  // };

  const onChangeLocationDetailInpopup = (e) => {
    //bug when click edit examLocation
    onChangeLocationDetail(e.target.value);
    console.log("onChangeLocationDetailInpopup " , e.target.value);
  }

  const toggle = () => dispatch(hideEditLocationPopup());

  const fetchProvinceData = async (e) => {
    if (e === "") {
      setAddRegion("");
      setAddRegionName("");
    } else {
      const response = await getProvinceCode(e);
      let tmpRegionCode = get(response[0], "region", "");
      setAddRegion(tmpRegionCode);      
      let tmpRegionName = get(
        examZoneResonse.filter(
          (zone) => zone.regionCode === get(response[0], "region", "")
        )[0],
        "regionName",
        ""
      );
      console.log(tmpRegionName);
      setAddRegionName(tmpRegionName);
    }
  };
  const onClickAddExamLocation = async () => {
    console.log("addExamOrganizerCode ",addExamOrganizerCode);
    console.log("addProvinceCode ",addProvinceCode);
    console.log("locationDetail ",locationDetail);
    console.log("locationTypeCode ",locationTypeCode);
    if (
      addExamOrganizerCode === "" ||
      addProvinceCode === "" ||
      locationDetail === "" ||
      locationTypeCode === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      });
      return;
    }
    let examlocation = {
      orgCode: addExamOrganizerCode,
      provinceCode: addProvinceCode,
      locationDetail: locationDetail,
      locationType: locationTypeCode,
      createUserCode: "2901133",
    };
    let response = await addExamLocation(examlocation);
    if (response !== "error") {
      Swal.fire("Added!", "อัพโหลดข้อมูลแล้ว", "success");
      action();
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขข้อมูลได้",
      });
    }
    toggle();
  };
  const onClickEditLocationData = async () => {
    if (
      locationId === "" ||
      organizerCode === "" ||
      locationTypeCode === "" ||
      locationTypeCode === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      });
      return;
    }

    let examlocation = {
      locationId: locationId,
      orgCode: organizerCode,
      provinceCode: provinceCode,
      locationDetail: locationDetail,
      locationType: locationTypeCode,
      createUserCode: "2901133",
    };

    let response = await updateExamLocation(examlocation);

    if (response !== "error") {
      Swal.fire("Updated!", "แก้ไขข้อมูลแล้ว", "success");
      action();
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขข้อมูลได้",
      });
    }
    toggle();

  };

  return (
    <div>
    <Modal isOpen={isShow} className="div">
      <ModalBody>
        <h4 className="head">{title}</h4>
      </ModalBody>
      <ModalBody>
        <Row xs="1">
          <Col xs="6">
            <InputWithLabelRow
              label="รหัสที่ตั้ง"
              value={locationId}
              textboxSize={6}
              disabled={true}
            />
          </Col>
          <Col xs="6"></Col>
        </Row>
        <Row xs="1" sm="2">
          <Col xs="6">
            <DropdownExamRegion
              label="สนามสอบ"
              value={description === "edit" ? provinceCode : addProvinceCode}
              requiredField={true}
              disabled={description === "edit" ? true : false}
              onClick={(e) => {
                onClickProvinceButton(e);
              }}
            />
          </Col>

          <Col xs="6">
            <InputWithLabelRow
              label="โซน"
              value={description === "edit" ? regionName : addRegionName}
              disabled={description === "edit" ? true : false}
              textboxSize={12}
            />
          </Col>
        </Row>
        <Row xs="1" sm="2">
          <DropdownExamOrganizer
            label="สถานที่สอบ"
            value={description === "edit" ? organizerCode : addExamOrganizerCode}
            requiredField={true}
            disabled={description === "edit" ? true : false}
            onClick={(e) => {
              onClickExamOrganizerButton(e);
            }}
          />
          <DropdownLocationType
            label="ประเภท"
            value={locationTypeCode}
            requiredField={true}
            onClick={(e) => {
              onChangeExamType(e);
            }}
          />
        </Row>
        <Row xs="1">
          <InputWithLabelRow
            label="สถานที่ตั้งสอบ"
            showTime={false}
            labelSize={2}
            textboxSize={12}
            value={locationDetail}
            requiredField={true}
            onChange={(e) => {
              onChangeLocationDetailInpopup(e);
            }}
          />
        </Row>
      </ModalBody>
      <ModalFooter>  
        <Button
          style={{ fontFamily: "Prompt-Regular" }}
          onClick={description === "edit" ? onClickEditLocationData : onClickAddExamLocation}
          color="primary"
        >
          บันทึก
        </Button>
        <Button
          style={{ fontFamily: "Prompt-Regular" }}
          color="secondary"
          onClick={toggle}
        >
          ยกเลิก
        </Button>
      </ModalFooter>
    </Modal>
    </div>
  );
};
EditLocationPopup.defaultProps = {
  onChange: () => {},
  onChangeLocationDetail: () => {},
  onChangeExamType: () => {},
};
EditLocationPopup.propTypes = {
  onChange: PropTypes.func,
  onChangeLocationDetail: PropTypes.func,
  onChangeExamType: PropTypes.func,
};
