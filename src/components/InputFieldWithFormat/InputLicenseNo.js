import React from "react";
import { Input } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

export const InputLicenseNo = ({ label, type, value, width, onChange }) => {
  function autoTab(e) {
    if (e.target.value && /^\d+$/.test(e.target.value.replaceAll("-", ""))) {
      var pattern = new String("__________"); // กำหนดรูปแบบในนี้

      var obj_l = e.target.value.length;
      if (obj_l >= pattern.length) {
        e.target.value = e.target.value.substr(0, pattern.length);
      }
    } else e.target.value = null;
    onChange(e.target.value);
  }

  return (
    <div className={styles.div}>
      <label className={styles.label}>{label}</label>
      <Input
        id="InputLicenseNo"
        defaultValue="0000000000"
        className={styles.input}
        type={"tel"}
        // value={value}
        onChange={autoTab}
      />
    </div>
  );
};

InputLicenseNo.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height: "",
  onChange: () => {},
};

InputLicenseNo.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func,
};
