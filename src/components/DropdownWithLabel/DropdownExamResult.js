import React, { useState, useEffect } from "react";
//import { DropdownButton, Dropdown } from "react-bootstrap";
import { FormGroup, Form, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getExamResult } from "../../api/apiGetConfig";
import Select from "react-select";

// 4 props เพิ้อคุยกับ componant ชื่อ InputWithLabel
// label
// type
// value
// onClick

// { label, type, value, onChange } คือ props

export const DropdownExamResult = ({
  label,
  type,
  value,
  onClick,
  disabled,
  requiredField,
  isClearable,
  showError,
}) => {
  const [examResultList, setExamResultList] = useState([]);

  const fetchData = async () => {
    const response = await getExamResult();
    setExamResultList(get(response, "data", []));
  };

  useEffect(() => {
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
    control: (provided) => ({
      ...provided,
      borderColor: showError ? "red" : "#adb5bd",
    }),
  };

  return (
    <div>
      <Form>
        <FormGroup row>
          <label className={styles.labelDropdown} style={{ marginTop: 0 }}>
            {label}{" "}
            <label className={styles.required}>
              {requiredField ? "*" : ""}
            </label>
          </label>
          <Select
            styles={customStyle}
            className={styles.inputDropdown}
            isClearable={true}
            isSearchable={true}
            name="examResult"
            isDisabled={disabled}
            options={examResultList}
            getOptionLabel={(option) => `${option.resultName}`}
            getOptionValue={(option) => `${option.resultId}`}
            onChange={onClick}
            value={examResultList.filter((option) => option.resultId === value)}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
DropdownExamResult.defaultProps = {
  label: "",
  type: "text",
  value: "",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onClick: () => {},
  disabled: false,
  requiredField: false,
  isClearable: false,
};

DropdownExamResult.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  requiredField: PropTypes.bool,
  isClearable: PropTypes.bool,
};
