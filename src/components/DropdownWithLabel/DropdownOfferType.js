import React, { useState, useEffect } from "react";
//import { DropdownButton, Dropdown } from "react-bootstrap";
import { FormGroup, Form, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getOfferType } from "../../api/apiGetConfig";
import Select from "react-select";

export const DropdownOfferType = ({
  label,
  type,
  value,
  onClick,
  disabled,
  requiredField,
  showError,
}) => {
  const [offerType, setOfferType] = useState([]);

  const fetchData = async () => {
    const response = await getOfferType(type);
    setOfferType(response);
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
              {requiredField ? " *" : ""}
            </label>
          </label>
          <Select
            styles={customStyle}
            className={styles.inputDropdown}
            isClearable={true}
            isSearchable={true}
            name="offerType"
            isDisabled={disabled}
            options={offerType}
            getOptionLabel={(option) => `${option.offerTypeName}`}
            getOptionValue={(option) => `${option.offerType}`}
            onChange={onClick}
            value={offerType.filter((option) => option.offerType === value)}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
DropdownOfferType.defaultProps = {
  label: "",
  value: "",
  type: "offerType",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onClick: () => {},
  disabled: false,
  requiredField: false,
  isClearable: false,
};

DropdownOfferType.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  requiredField: PropTypes.bool,
  isClearable: PropTypes.bool,
};
