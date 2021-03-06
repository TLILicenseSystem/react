import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { FormGroup, Form, Col } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getOrganizerAll } from "../../api/apiGetExamOrganizer";
import Select from "react-select";

// 4 props เพิ้อคุยกับ componant ชื่อ InputWithLabel
// label
// type
// value
// onClick

// { label, type, value, onChange } คือ props

export const DropdownExamOrganizer = ({
  label,
  type,
  value,
  onClick,
  isClearable,
  disabled,
  requiredField,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const response = await getOrganizerAll();
    setUserData(get(response, "data", []));
  };

  useEffect(() => {
    console.log("DropdownExamRegion inital ");
    fetchData();
  }, []);

  const customStyle = {
    option: (provided, state) => ({
      ...provided,
      fontFamily: "Prompt-Regular",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontFamily: "Prompt-Regular",
    }),
  };

  return (
    <Form>
      <FormGroup row>
        <label className={styles.labelDropdown}>
          {label}{" "}
          <label className={styles.required}>{requiredField ? " *" : ""}</label>
        </label>
        <Select
          styles={customStyle}
          className={styles.inputDropdown}
          isClearable={true}
          isSearchable={true}
          name="examOrganizer"
          options={userData}
          isDisabled={disabled}
          getOptionLabel={(option) => `${option.orgCode} ${option.orgName}`}
          getOptionValue={(option) => `${option.orgCode}`}
          onChange={onClick}
          value={userData.filter((option) => option.orgCode === value)}
        />
      </FormGroup>
    </Form>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
DropdownExamOrganizer.defaultProps = {
  label: "",
  type: "text",
  value: "",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onClick: () => {},
  isClearable: false,
  disabled: false,
  requiredField: false,
};

DropdownExamOrganizer.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  isClearable: PropTypes.bool,
  disabled: PropTypes.bool,
  requiredField: PropTypes.bool,
};
