import React, { useState, useEffect } from "react";
//import { DropdownButton, Dropdown } from "react-bootstrap";
import { FormGroup, Form, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getProvinceCodeAll } from "../../api/apiGetProvinceCode";
import Select from 'react-select';

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

  return (
    <div>
      <Form>
        <FormGroup row>
          <Col xs={3}>
            <label className={styles.label}>{label} :</label>
            <label className={styles.required}>{(value === "" && requiredField) ? "*" : ""}</label>
          </Col>
          <Col xs={9}>
            <Select
                className={styles.input}
                isClearable={true}
                isSearchable={true}
                name="provinceCodeSelected"
                options={userData}                
                getOptionLabel={(option) => `${option.provinceCode} ${option.provinceName}`}
                getOptionValue={(option) => `${option.provinceCode}`}
                onChange={onClick}
                isDisabled={disabled}
                value={userData.filter(option => option.provinceCode === value)}
              />              
          </Col>
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
