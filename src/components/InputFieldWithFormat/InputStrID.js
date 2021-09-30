import React, { useState } from "react";
import { Input, FormFeedback, FormGroup } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

export const InputStrID = ({ label, disabled, value, width, onChange }) => {
  const [error, setError] = useState(false);

  function autoTab(e) {
    // if (e.target.value.length === 10) {
    // } else if (e.target.value.length === 8) {
    // } else if (e.target.value.length === 5) {
    // } else

    if (e.target.value.replaceAll("-", "").length === 3) {
      if (/^([P][0-9][A-Z])$/.test(e.target.value)) {
        var pattern = new String("_-_-_"); // กำหนดรูปแบบในนี้
        var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
        var returnText = new String("");
        var obj_l = e.target.value.length;
        var obj_l2 = obj_l - 1;
        console.log(pattern.length, "pattern.length");
        console.log(e.target.value.length, "e.target.value.length");
        for (let i = 0; i < pattern.length; i++) {
          if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
            console.log(obj_l2, "obj_l2");
            // console.log(pattern.charAt(i + 1), "pattern.charAt(i + 1)");
            returnText += e.target.value + pattern_ex;
            e.target.value = returnText;
          }
        }
      }
    }
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
