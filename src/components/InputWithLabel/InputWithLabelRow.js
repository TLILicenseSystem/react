import React from "react";
import { Input, FormGroup, Form, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

// 4 props เพิ้อคุยกับ componant ชื่อ InputWithLabel
// label
// type
// value
// onChange

// { label, type, value, onChange } คือ props

export const InputWithLabelRow = ({ label, type, value, onChange, disabled, textboxSize, labelSize, requiredField }) => {
  return (
    <div>
      {/* ใส่ colon ที่ label เพื่อไม่ต้องใส่ที่หน้า login */}
      <Form>
        <FormGroup row>
          <label className={styles.label}>{label}<label className={styles.required}>{(value === "" && requiredField) ? "*" : ""}</label> :</label>
          
          <Col xs={textboxSize}>
          <Input
            className={styles.input}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
InputWithLabelRow.defaultProps = {
  label: "",
  type: "text",
  value: "",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onChange: () => {},
  disabled: false,
  textboxSize: 9,
  labelSize: 3,
  requiredField: false,
};

InputWithLabelRow.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  textboxSize: PropTypes.number,
  labelSize:PropTypes.number,
  requiredField: PropTypes.bool,
};
