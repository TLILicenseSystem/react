import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  Form,
  Col,
  Row,
} from "reactstrap";
import { DropdownButton, Dropdown, } from 'react-bootstrap';
import { InputWithLabel,
    DropdownExamRegion,
    DropdownExamOrganizer,
    LocationTable,
    SearchPopup,
  } from "../shared";
import { getProvinceCode } from "../../api/apiGetProvinceCode";
import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { get } from "lodash";  
import { getProvinceCodeAll } from "../../api/apiGetProvinceCode";
import styles from "../InputWithLabel/InputWithLabel.module.css";

export const DropdownForSearch = ({ label, type, value, onClick }) => {

  const [provinceCode, setProvinceCode] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [region, setRegion] = useState("");
  const [regionName, setRegionName] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
  const [examOrganizerName, setExamOrganizerName] = useState("");

  const [dropdownProvinceOpen, setDropdownProvinceOpen] = useState(false);
  const toggle = () => setDropdownProvinceOpen((prevState) => !prevState);
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const response = await getProvinceCodeAll();
    setUserData(get(response, "data", []));
  };

  useEffect(() => {
    console.log("DropdownExamRegion inital ");
    fetchData();
  }, []);

  const onClickProvinceButton = (e) => {
    setProvinceCode(e + " ");
    fetchProvinceData(e);
  };
  const onClickExamOrganizerButton = (e) => {
    setExamOrganizerCode(e + " ");
    fetchExamOrganizer(e);
  };



  const fetchProvinceData = async (e) => {
    const response = await getProvinceCode(e);
    setRegion(get(response[0], "region", ""));
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
    <div>      
      <Row xs="1">
        <Col xs="12">
          <Form>
          <FormGroup row>
            <DropdownExamRegion
              label="สนามสอบ"
              value={provinceCode + provinceName}
              onClick={(e) => {
                onClickProvinceButton(e);
              }}
            />
            <DropdownExamOrganizer
              label="สถานที่สอบ"
              value={examOrganizerCode + examOrganizerName}
              onClick={(e) => {
                onClickExamOrganizerButton(e);
              }}
            />   
          </FormGroup>
        </Form>
        </Col>
      </Row>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
DropdownExamRegion.defaultProps = {
  label: "",
  type: "text",
  value: "",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onClick: () => {},
};

DropdownExamRegion.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};
