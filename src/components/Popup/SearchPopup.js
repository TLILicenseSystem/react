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
import { DropdownExamRegion, DropdownExamOrganizer } from "../shared";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchPopup } from "../../redux/actions";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone } from "../../api/apiGetConfig";
import { get } from "lodash";
import PropTypes from "prop-types";

export const SearchPopup = ({onChange}) => {
  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");

  const examZoneResonse = getExamLocationZone();
  const dispatch = useDispatch();
  const { isShow, title, description, action } = useSelector(
    (state) => state.searchPopup
  );
  const handleAction = () => {
    //call back function
    action();
    dispatch(hideSearchPopup());
    onChange({provinceCode, examOrganizerCode});
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
    fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(get(e, "orgCode", ""));
    fetchExamOrganizer(get(e, "orgCode", ""));
  };

  const toggle = () => dispatch(hideSearchPopup());

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

  return (
    <Modal isOpen={isShow}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <DropdownExamRegion
          label="สนามสอบ"
          value={provinceCode}
          onClick={(e) => {
            onClickProvinceButton(e);
          }}
        />
        <DropdownExamOrganizer
          label="สถานที่สอบ"
          value={examOrganizerCode}
          onClick={(e) => {
            onClickExamOrganizerButton(e);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAction}>
          เลือก
        </Button>
        <Button color="secondary" onClick={toggle}>
          ยกเลิก
        </Button>
      </ModalFooter>
    </Modal>
  );
};
SearchPopup.defaultProps = {
  onChange: () => {},
};
SearchPopup.propTypes = {
  onChange: PropTypes.func,
};