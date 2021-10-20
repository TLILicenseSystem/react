import React ,{useEffect,useRef}from "react";
import { Input } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

export const InputEmployeeID = ({ label, disabled, value, width, onChange }) => {

  return (
    <div className={styles.div}>
      <label className={styles.label}>{label}</label>
      <InputMask
        mask="999-9999"
         
        className="form-control"
        style={{ marginBottom: "20px" }}
        id="employeeID"
        type={"tel"}
        defaultValue={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

InputEmployeeID.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height: "",
  disabled: false,
  onChange: () => {},
};

InputEmployeeID.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
