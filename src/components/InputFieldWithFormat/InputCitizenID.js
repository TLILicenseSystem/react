import React from "react";
import { Input } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

export const InputCitizenID = ({ label, disabled, value, width, onChange }) => {
  return (
    <div className={styles.div}>
      <label className={styles.label}>{label}</label>
      <InputMask
        mask="9-9999-99999-99-9"
         
        className="form-control"
        style={{ marginBottom: "20px" }}
        id="citizenID"
        type={"tel"}
        defaultValue={value}
        disabled={disabled}
        onChange={(e) =>onChange(e.target.value)}
      />
    </div>
  );
};

InputCitizenID.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height: "",
  disabled: false,
  onChange: () => {},
};

InputCitizenID.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
