import React, { useState } from "react";
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

export const EditLocationPopup = ({ onChange }) => {
  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");
  const [locationDetail, setLocationDetail] = useState("");
  const [examTypeCode, setExamTypeCode] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const examZoneResonse = getExamLocationZone();
  const dispatch = useDispatch();
  const { isShow, title, description, locationEditDetail, action  } = useSelector(
    (state) => state.editLocationPopup
  );
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleAction = () => {
    //call back function
    action();
    dispatch(hideSearchPopup());
    onChange({ provinceCode, examOrganizerCode });
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
    fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(get(e, "orgCode", ""));
    fetchExamOrganizer(get(e, "orgCode", ""));
  };
  const onClickExamType = (e) => {
    setExamTypeCode(get(e, "examTypeId", "1"));
  };

  const toggle = () => dispatch(hideEditLocationPopup());

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
  const onClickAddExamLocation = async () => {
    if (
      examOrganizerCode === "" ||
      provinceCode === "" ||
      locationDetail === "" ||
      examTypeCode === ""
    ) {
      // Swal.fire({
      //   icon: "error",
      //   title: "เกิดข้อผิดพลาด",
      //   text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      // });
      // return;
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
      handleSnackbarOpen();
      // Swal.fire("Added!", "อัพโหลดข้อมูลแล้ว", "success");
      //reloadLocationList();
    } else {
      // Swal.fire({
      //   icon: "error",
      //   title: "เกิดข้อผิดพลาด",
      //   text: "ไม่สามารถแก้ไขข้อมูลได้",
      // });
    }
  };

  return (
    <Modal isOpen={isShow} className="div">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <ModalBody><h4 className="head">{title}</h4></ModalBody>
      <ModalBody>
        <Row xs="1">
          <Col xs="6">
            <InputWithLabelRow
              label="รหัสที่ตั้ง"
              value={get(locationEditDetail,"locationId","")}
              textboxSize={4}
              disabled={true}
            />
          </Col>
          <Col xs="6"></Col>
        </Row>
        <Row xs="1" sm="2">
          <Col xs="6">
            <DropdownExamRegion
              label="สนามสอบ"
              value={get(locationEditDetail,"provinceCode","")}
              requiredField={true}
              disabled={(description === "edit" ? true : false)}
              onClick={(e) => {
                onClickProvinceButton(e);
              }}
            />
          </Col>

          <Col xs="6">
            <InputWithLabelRow
              label="โซน"
              value={get(locationEditDetail,"organizerCode","") + " " + get(locationEditDetail,"organizerName","")}                    
              disabled={(description === "edit" ? true : false)}
              textboxSize={12}
            />
          </Col>
        </Row>
        <Row xs="1" sm="2">
          <DropdownExamOrganizer
            label="สถานที่สอบ"
            value={get(locationEditDetail,"organizerCode","")}
            requiredField={true}
            onClick={(e) => {
              onClickExamOrganizerButton(e);
            }}
          />
          <DropdownLocationType
            label="ประเภท"
            value={get(locationEditDetail,"locationTypeCode","")}
            requiredField={true}
            onClick={(e) => {
              onClickExamType(e);
            }}
          />
        </Row>
        <Row xs="1">
          <InputWithLabelRow
            label="สถานที่ตั้งสอบ"
            showTime={false}
            labelSize={2}
            textboxSize={12}
            value={get(locationEditDetail,"locationDetail","")}
            requiredField={true}
            onChange={(e) => {
              setLocationDetail(e.target.value);
            }}
          />
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button style={{fontFamily: "Prompt-Regular"}} onClick={(description === "edit" ? onClickAddExamLocation : {})} color="primary">
          อัพโหลดข้อมูล
        </Button>
        <Button style={{fontFamily: "Prompt-Regular"}} color="secondary" onClick={toggle}>
          ยกเลิก
        </Button>
      </ModalFooter>
    </Modal>
  );
};
EditLocationPopup.defaultProps = {
  onChange: () => {},
};
EditLocationPopup.propTypes = {
  onChange: PropTypes.func,
};
