import React from "react";
import { Input, FormGroup, Form, Col, FormFeedback } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

export const InputField = ({
  input,
  label,
  type,
  value,
  disabled,
  textboxSize,
  requiredField,
  meta,
}) => {
  let { invalid, touched, error } = meta;
  return (
    <div>
      {/* ใส่ colon ที่ label เพื่อไม่ต้องใส่ที่หน้า login */}
      <Form>
        <FormGroup row>
          <label className={styles.label}>
            {label}
            <label className={styles.required}>
              {requiredField ? " *" : ""}
            </label>
          </label>

          <Col xs={textboxSize}>
            <Input
              id={input.name}
              {...input}
              className={styles.input}
              type={type}
              invalid={error}
              disabled={disabled}
            />
            {error && <FormFeedback>{error}</FormFeedback>}
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
InputField.defaultProps = {
  label: "",
  type: "text",
  disabled: false,
  textboxSize: 9,
  requiredField: false,
  meta: {
    invalid: false,
    touched: false,
    error: false,
  },
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  textboxSize: PropTypes.number,
  requiredField: PropTypes.bool,
  meta: PropTypes.object,
};
