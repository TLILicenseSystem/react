import React, { useState } from "react";
import { Input, FormFeedback, FormGroup } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

export const InputStrID = ({ label, disabled, value, width, onChange }) => {
  const [error, setError] = useState(false);

  function autoTab(e) {
    e.target.value = e.target.value.replaceAll("-", "");
    if (e.target.value.length === 3) {
      if (/^([P][0-9][A-Z])$/.test(e.target.value)) {
        e.target.value = e.target.value.split("").join("-");
      } else e.target.value = null;
    } else if (e.target.value.length === 5) {
      if (/^([HLNO]\d\d\d[A-Z])$/.test(e.target.value)) {
        e.target.value =
          e.target.value.slice(0, 1) +
          "-" +
          e.target.value.slice(1, e.target.value.length - 1) +
          "-" +
          e.target.value.slice(e.target.value.length - 1);
      } else e.target.value = null;
    } else if (e.target.value.length === 8) {
      if (/^([G]\d\d\d[.]\d\d[A-Z])$/.test(e.target.value)) {
        e.target.value =
          e.target.value.slice(0, 1) +
          "-" +
          e.target.value.slice(1, e.target.value.length - 1) +
          "-" +
          e.target.value.slice(e.target.value.length - 1);
      } else e.target.value = null;
    } else if (e.target.value.length === 10) {
      if (/^([ABD]\d\d\d\d\d\d\d\d[A-Z])$/.test(e.target.value)) {
        e.target.value =
          e.target.value.slice(0, 1) +
          "-" +
          e.target.value.slice(1, e.target.value.length - 1) +
          "-" +
          e.target.value.slice(e.target.value.length - 1);
      } else e.target.value = null;
    } else e.target.value = null;
    onChange(e.target.value);
  }

  return (
    <>
      <div className={styles.div}>
        <label className={styles.label}>{label}</label>
        <Input
          id="strid"
          defaultValue=""
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
