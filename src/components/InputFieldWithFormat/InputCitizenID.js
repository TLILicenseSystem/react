import React from "react";
import { Input } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

export const InputCitizenID = ({ label, type, value, width, onChange }) => {
  function autoTab(e) {
    e.target.value = e.target.value.replaceAll("-", "");

    if (e.target.value && /^\d+$/.test(e.target.value.replaceAll("-", ""))) {
      var pattern = new String("_-____-_____-__-_"); // กำหนดรูปแบบในนี้
      var pattern_ex = new String("-"); // กำหนดสัญลักษณ์หรือเครื่องหมายที่ใช้แบ่งในนี้
      var returnText = new String("");
      var obj_l = e.target.value.length;
      var obj_l2 = obj_l - 1;
      for (let i = 0; i < pattern.length; i++) {
        console.log(
          obj_l2,
          pattern.charAt(i + 1),
          i,
          pattern.charAt(i + 1) == pattern_ex
        );

        if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
          returnText += e.target.value + pattern_ex;
          e.target.value = returnText;
        }
      }

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
        id="citizenID"
        className={styles.input}
        type={"tel"}
        defaultValue={value}
        onChange={autoTab}
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
  onChange: () => {},
};

InputCitizenID.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func,
};
