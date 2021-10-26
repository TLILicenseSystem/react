import React, { useState, useEffect } from "react";
//import { DropdownButton, Dropdown } from "react-bootstrap";
import { FormGroup, Form, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getProvinceCodeAll } from "../../api/apiGetProvinceCode";
import Select from "react-select";

// 4 props เพิ้อคุยกับ componant ชื่อ InputWithLabel
// label
// type
// value
// onClick

// { label, type, value, onChange } คือ props

export const DropdownExamRegion = ({
  label,
  type,
  value,
  onClick,
  disabled,
  requiredField,
}) => {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const response = await getProvinceCodeAll();
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
    <div>
      <Form>
        <FormGroup row>
          <label className={styles.labelDropdown}>
            {label}{" "}
            <label className={styles.required}>
              {requiredField ? " *" : ""}
            </label>
          </label>
          <Select
            styles={customStyle}
            className={styles.inputDropdown}
            isClearable={true}
            isSearchable={true}
            name="provinceCodeSelected"
            options={userData}
            getOptionLabel={(option) =>
              `${option.provinceCode} ${option.provinceName}`
            }
            getOptionValue={(option) => `${option.provinceCode}`}
            onChange={onClick}
            isDisabled={disabled}
            value={userData.filter((option) => option.provinceCode === value)}
          />
        </FormGroup>
      </Form>
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
  disabled: false,
  requiredField: false,
};

DropdownExamRegion.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  requiredField: PropTypes.bool,
};
