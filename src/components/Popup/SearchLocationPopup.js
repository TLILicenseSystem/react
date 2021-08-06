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
import { DropdownExamRegion, DropdownExamOrganizer, LocationTable } from "../shared";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchLocationPopup } from "../../redux/actions";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone } from "../../api/apiGetConfig";
import { get } from "lodash";
import PropTypes from "prop-types";

export const SearchLocationPopup = ({onChange}) => {
  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");
  const [searchProvince, setSearchProvince] = useState({});

  const examZoneResonse = getExamLocationZone();
  const dispatch = useDispatch();
  const { isShow, title, description, action } = useSelector(
    (state) => state.searchLocationPopup
  );
  const handleAction = (e) => {
    //call back function
    dispatch(hideSearchLocationPopup());
    onChange(e);
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
    fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(get(e,"orgCode",""));
    fetchExamOrganizer(get(e,"orgCode",""));
    setSearchProvince({"provinceCode":provinceCode,"examOrganizerCode":examOrganizerCode});
  };

  const toggle = () => dispatch(hideSearchLocationPopup());

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
    console.log("fetchExamOrganizer " , e);
    if (e !== ""){
      const response = await getOrganizer(e);
      setExamOrganizerName(get(response[0], "orgName", ""));
    }
  };

  return (
    <Modal isOpen={isShow} size="lg" toggle={toggle}> 
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
          <LocationTable 
            provinceCode={provinceCode}
            examOrganizerCode={examOrganizerCode}
            onClick={handleAction}/>
      </ModalFooter>
    </Modal>
  );
};
SearchLocationPopup.defaultProps = {
  onChange: () => {},
};
SearchLocationPopup.propTypes = {
  onChange: PropTypes.func,
};