import React, { useState, useEffect, useRef } from "react";
import { isValid } from "./validate";
import styles from "../InputWithLabel/InputWithLabel.module.css";
import { Input, Col, FormFeedback } from "reactstrap";

export const TimePicker = ({
  id,
  timeValue,
  disabled,
  mountFocus,
  type,
  placeholder,
  label,
  textboxSize,
  onClickTime,
}) => {
  const _input = useRef(null);

  useEffect(() => {
    if (!disabled && mountFocus) {
      setTimeout(() => {
        _input.current.focus();
      }, 0);
    }
  });

  let lastVal = "";

  const onChangeHandler = (val) => {
    if (val == timeValue) {
      return;
    }
    if (isValid(val)) {
      if (val.length === 2 && lastVal.length !== 3 && val.indexOf(":") === -1) {
        val = val + ":";
      }

      if (val.length === 2 && lastVal.length === 3) {
        val = val.slice(0, 1);
      }

      if (val.length > 5) {
        return false;
      }

      lastVal = val;

      onClickTime(val);

      if (val.length === 5) {
        onClickTime(val);
      }
    }
  };

  const getType = () => {
    if (type) {
      return type;
    }
    return "tel";
  };

  return (
    <div>
      <label className={styles.label}>{label}</label>
      <Col xs={textboxSize}>
        <Input
          id={id}
          name={id}
          type={getType()}
          disabled={disabled}
          placeholder={placeholder}
          value={timeValue}
          onChange={(e) => onChangeHandler(e.target.value)}
          ref={_input}
        />
      </Col>
    </div>
  );
};

TimePicker.defaultProps = {
  placeholder: " ",
  label: "",
  textboxSize: 9,
};
