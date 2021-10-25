import React, { useState, useEffect } from "react";
//import { DropdownButton, Dropdown } from "react-bootstrap";
import { FormGroup, Form, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getCompany } from "../../api/apiGetConfig";
import Select from "react-select";

export const DropdownCompany = ({
  label,
  type,
  value,
  onClick,
  disabled,
  requiredField,
  isClearable,
  showError,
}) => {
  const [companyList, setCompanyList] = useState([]);

  const fetchData = async () => {
    const response = await getCompany();
    setCompanyList(get(response, "data", []));
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
            {label}
            <label className={styles.required}>
              {value === "" && requiredField ? "*" : ""}
            </label>
          </label>
          <Select
            styles={customStyle}
            className={styles.inputDropdown}
            isClearable={true}
            isSearchable={true}
            name="company"
            isDisabled={disabled}
            options={companyList}
            getOptionLabel={(option) =>
              `${option.companyPrefix}${option.companyName}`
            }
            getOptionValue={(option) => `${option.companyCode}`}
            onChange={onClick}
            value={companyList.filter((option) => option.companyCode === value)}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
DropdownCompany.defaultProps = {
  label: "",
  type: "text",
  value: "",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onClick: () => {},
  disabled: false,
  requiredField: false,
  isClearable: false,
};

DropdownCompany.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  requiredField: PropTypes.bool,
  isClearable: PropTypes.bool,
};
