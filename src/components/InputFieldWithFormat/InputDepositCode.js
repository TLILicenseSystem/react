import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

export const InputDepositCode = ({ label, type, value, width, onChange }) => {
  const [depositCode, setDpositCode] = useState({
    first: "000",
    second: "",
  });

  useEffect(() => {
    setDpositCode({
      first: value.substr(0, 3),
      second: value.substr(3, value.length),
    });
    console.log(value, "899789789798798");
  }, []);
  const autoTab_first = (e) => {
    if (e.target.value && /^\d+$/.test(e.target.value)) {
      if (e.target.value.length > 3) {
        e.target.value = e.target.value.substr(0, 3);
      }
    } else e.target.value = null;
  };
  const autoTab_second = (e) => {
    if (e.target.value && /([A-Z0-9])/.test(e.target.value)) {
      if (e.target.value.length > 5) {
        e.target.value = e.target.value.substr(0, 5);
      }
    } else e.target.value = null;
  };
  return (
    <div className={styles.div}>
      <label className={styles.label}>{label}</label>
      <Input
        id="depositCode_first"
        defaultValue={depositCode.first}
        className={styles.input}
        type={"tel"}
        // value={value}
        onChange={autoTab_first}
      />
      <Input
        id="depositCode_second"
        defaultValue={depositCode.second}
        className={styles.input}
        type={"tel"}
        // value={value}
        onChange={autoTab_second}
      />
    </div>
  );
};

InputDepositCode.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height: "",
  onChange: () => {},
};

InputDepositCode.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func,
};
