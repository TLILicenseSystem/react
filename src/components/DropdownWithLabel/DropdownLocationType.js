import React, { useState, useEffect } from "react";
import { FormGroup, Form, Col } from "reactstrap";
import { DropdownButton, Dropdown } from "react-bootstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getExamType } from "../../api/apiGetConfig";
import Select from 'react-select';

// 4 props เพิ้อคุยกับ componant ชื่อ InputWithLabel
// label
// type
// value
// onClick

// { label, type, value, onChange } คือ props

export const DropdownLocationType = ({ label, type, value, onClick, requiredField }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [userData, setUserData] = useState([]);

  const fetchData = () => {
    const response = getExamType();
    setUserData(response);
  };

  useEffect(() => {
    console.log("DropdownExamRegion inital ");
    fetchData();
  }, []);

  return (
    <div>
      {/* ใส่ colon ที่ label เพื่อไม่ต้องใส่ที่หน้า login */}
      <Form>
        <FormGroup row>
          <label className={styles.labelDropdown}>{label}<label className={styles.required}>{(value === "" && requiredField) ? "*" : ""}</label> :</label>
            <Select
                  className={styles.inputDropdown}
                  isClearable={false}
                  isSearchable={false}
                  name="locationType"
                  options={userData}                
                  getOptionLabel={(option) => `${option.examTypeName}`}
                  getOptionValue={(option) => `${option.examTypeId}`}
                  onChange={onClick}
                  value={userData.filter(option => option.examTypeId === value)}
                />    
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
DropdownLocationType.defaultProps = {
  label: "",
  type: "text",
  value: "",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onClick: () => {},
  requiredField: false,
};

DropdownLocationType.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  requiredField: PropTypes.bool,
};
