import React, { useEffect, useState } from "react";
import { Input, FormFeedback, FormGroup } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

export const InputStrID = ({ label, disabled, value, width, onChange }) => {
  const [error, setError] = useState(false);

  const autoTab = (e) =>{
    e.target.value = e.target.value.replaceAll("-", "");
    e.target.value= checkPattern(e.target.value)
    onChange(e.target.value);
  }

  const checkPattern = (str) =>{
    if (str.length === 3) {
      if (/^([P][0-9][A-Z])$/.test(str)) {
        str = str.split("").join("-");
      } else str = null;
    } else if (str.length === 5) {
      if (/^([HLNO]\d\d\d[A-Z])$/.test(str)) {
        str =
          str.slice(0, 1) +
          "-" +
          str.slice(1, str.length - 1) +
          "-" +
          str.slice(str.length - 1);
      } else str = null;
    } else if (str.length === 8) {
      if (/^([G]\d\d\d[.]\d\d[A-Z])$/.test(str)) {
        str =
          str.slice(0, 1) +
          "-" +
          str.slice(1, str.length - 1) +
          "-" +
          str.slice(str.length - 1);
      } else str = null;
    } else if (str.length === 10) {
      if (/^([ABD]\d\d\d\d\d\d\d\d[A-Z])$/.test(str)) {
        str =
          str.slice(0, 1) +
          "-" +
          str.slice(1, str.length - 1) +
          "-" +
          str.slice(str.length - 1);
      } else str = null;
    } else str = null;
    return str;
  }

  return (
    <>
      <div className={styles.div}>
        <label className={styles.label}>{label}</label>
        <Input
          id="strid"
          defaultValue={value && checkPattern(value)}
          invalid={error}
          className={styles.input}
          type={"tel"}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onBlur={autoTab}
        />
        <br />
      </div>
      {error && <FormFeedback>{"error"}</FormFeedback>}
    </>
  );
};

InputStrID.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height: "",
  disabled: false,
  onChange: () => {},
};

InputStrID.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
