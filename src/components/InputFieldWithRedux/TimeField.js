import React, { useState, useEffect, useRef } from "react";
import { isValid } from "./TimeValidate";
import styles from "./InputWithLabel.module.css";
import { Input, Col, FormFeedback } from "reactstrap";

export const TimeField = ({
  input,
  disabled,
  mountFocus,
  type,
  placeholder,
  label,
  textboxSize,
  meta,
}) => {
  let { invalid, touched, error } = meta;

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
    if (val == input.val) {
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

      input.onChange(val);

      if (val.length === 5) {
        input.onChange(val);
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
      <label className={styles.label}> {label} </label>
      <Col xs={textboxSize}>
        <Input
          id={input.name}
          name={input.name}
          invalid={error}
          type={getType()}
          disabled={disabled}
          placeholder={placeholder}
          value={input.value}
          onChange={(e) => onChangeHandler(e.target.value)}
          ref={_input}
        />
        {error && <FormFeedback>{error}</FormFeedback>}
      </Col>
    </div>
  );
};

TimeField.defaultProps = {
  placeholder: " ",
  label: "",
  textboxSize: 9,
};
