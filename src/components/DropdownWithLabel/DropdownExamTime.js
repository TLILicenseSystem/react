import React, { useState, useEffect } from "react";
//import { DropdownButton, Dropdown } from "react-bootstrap";
import { FormGroup, Form, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getExamRoundAll } from "../../api/apiGetExamRound";
import Select from "react-select";

// 4 props เพิ้อคุยกับ componant ชื่อ InputWithLabel
// label
// type
// value
// onClick

// { label, type, value, onChange } คือ props

export const DropdownExamTime = ({
  label,
  type,
  value,
  onClick,
  disabled,
  requiredField,
  isClearable,
  showError,
}) => {
  const [examRoundList, setExamRoundList] = useState([]);

  const fetchData = async () => {
    const response = await getExamRoundAll();
    setExamRoundList(get(response, "data", []));
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
    control: provided => ({
      ...provided,
      borderColor: showError ? "red" : "#adb5bd",
    }),
  };

  return (
    <div>
      <Form>
        <FormGroup row>
          <label className={styles.labelDropdown}>
            {label}
            <label className={styles.required}>
              {value === "" && requiredField ? "*" : ""}
            </label>
          </label>
          <Select
            styles={customStyle}
            className={styles.inputDropdown}
            isClearable={isClearable}
            isSearchable={false}
            name="examTime"
            options={examRoundList}
            getOptionLabel={(option) => `${option.timeStr}`}
            getOptionValue={(option) => `${option.roundId}`}
            onChange={onClick}
            value={examRoundList.filter((option) => option.roundId === value)}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
DropdownExamTime.defaultProps = {
  label: "",
  type: "text",
  value: "",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onClick: () => {},
  disabled: false,
  requiredField: false,
  isClearable: false,
};

DropdownExamTime.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  requiredField: PropTypes.bool,
  isClearable: PropTypes.bool,
};
