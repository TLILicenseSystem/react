import React from "react";
import { Input } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import TimeInput from 'react-time-input';
// 4 props
// label
// type
// value
// onChange

export const InputTimeWithLabel = ({ label, type, value, onChange,showTime }) => {
  return (
    <div className={styles.div}>
      <label className={styles.label}>{label} :</label>
      <TimeInput disabled={showTime}
         className={styles.input}  
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputTimeWithLabel.defaultProps = {
  label: "",
  type: "text",
  value: "",
  onChange: () => {},
  showTime:true,
};

InputTimeWithLabel.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  showTime:PropTypes.bool,
};


//--------------------------ฟิลด์ textfield --------------------
export const InputWithLabel = ({ label, type, value, width, height,maxLength, onChange ,showTime}) => {
  
  return (
   
    <div className={styles.div}>
      <label className={styles.label}>{label} :</label>
      <Input  disabled={showTime} maxLength = {maxLength}
        className={styles.input} style={{ width: width ,height :height}}
        type={type}
        value={value}
        onChange={onChange}

      />
    </div>
  );
};

InputWithLabel.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height:"30px",
  maxLength:"",
  onChange: () => {},
  showTime:true,
};

InputWithLabel.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  maxLength: PropTypes.string,
  onChange: PropTypes.func,
  showTime:PropTypes.bool,
};


//------------------------ ปิดช่อง id ไม่ให้แก้ไข ---------------------
export const InputWithLabelID = ({ label, type, value, width, onChange}) => {
  return (
    <div className={styles.div}>
      <label className={styles.label}>{label} :</label>
      <Input  disabled={true}
        className={styles.input} style={{ width: /*"100px"*/width ,height :"30px"}}
        type={type}
        value={value}
        onChange={onChange}

      />
    </div>
  );
};

InputWithLabelID.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height: "",
  onChange: () => {},
};

InputWithLabelID.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func,
};