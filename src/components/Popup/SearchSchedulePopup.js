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
import {
  DropdownExamRegion,
  DropdownExamOrganizer,
  DropdownExamTime,
  LocationTable,
} from "../shared";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchSchedulePopup } from "../../redux/actions";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone } from "../../api/apiGetConfig";
import { getExamLocation } from "../../api/apiGetExamLocation";
import { get } from "lodash";
import PropTypes from "prop-types";

export const SearchSchedulePopup = ({ onChange }) => {
  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");
  const [searchProvince, setSearchProvince] = useState({});
  const [examLocationList, setExamLocationList] = useState([]);
  const [roundId, setRoundId] = useState([]);

  const examZoneResonse = getExamLocationZone();
  const dispatch = useDispatch();
  const { isShow, title, description, action } = useSelector(
    (state) => state.searchSchedulePopup
  );
  const handleAction = (e) => {
    //call back function
    console.log("SearchSchedulePopup ", e);
    dispatch(hideSearchSchedulePopup());
    onChange(e);
  };
  const onClickProvinceButton = (e) => {
    setProvinceCode(get(e, "provinceCode", ""));
    fetchProvinceData(get(e, "provinceCode", ""));
  };
  const onClickExamOrganizerButton = (e) => {
    console.log("onClickExamOrganizerButton ", e);
    setExamOrganizerCode(get(e, "orgCode", ""));
    fetchExamOrganizer(get(e, "orgCode", ""));
    setSearchProvince({
      provinceCode: provinceCode,
      examOrganizerCode: examOrganizerCode,
    });
  };

  const onClickRoundButton = (e) => {};
  const fetchData = async () => {
    const responseLocation = await getExamLocation("A");
    setExamLocationList(get(responseLocation, "data", []));
  };
  useEffect(() => {
    console.log("LocationTable inital ");
    fetchData();
  }, []);

  const toggle = () => dispatch(hideSearchSchedulePopup());

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
    if (e !== "") {
      const response = await getOrganizer(e);
      setExamOrganizerName(get(response[0], "orgName", ""));
    }
  };

  const rows = examLocationList.map((row) => {
    const { locationId, ...rest } = row;
    return { id: locationId, locationId, ...rest };
  });

  return (
    <Modal isOpen={isShow} size="xl" toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Row>
          <Col sm={{ size: 4, offset: 2 }}>
            <DropdownExamOrganizer
              label="สถานที่สอบ "
              value={examOrganizerCode}
              onClick={(e) => {
                onClickExamOrganizerButton(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 4, offset: 2 }}>
            <DropdownExamRegion
              label="สนามสอบ"
              value={provinceCode}
              onClick={(e) => {
                onClickProvinceButton(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 4, offset: 2 }}>
            <DropdownExamTime
              label="เวลาสอบ"
              value={roundId}
              onClick={(e) => {
                onClickRoundButton(e);
              }}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <LocationTable
          provinceCode={provinceCode}
          examOrganizerCode={examOrganizerCode}
          examLocationList={rows}
          event={{ event: "search" }}
          onClick={handleAction}
        />
      </ModalFooter>
    </Modal>
  );
};
SearchSchedulePopup.defaultProps = {
  onChange: () => {},
};
SearchSchedulePopup.propTypes = {
  onChange: PropTypes.func,
};
