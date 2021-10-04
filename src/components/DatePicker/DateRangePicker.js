import React from "react";
import { Form, FormGroup, Input, Label, FormText, Col } from "reactstrap";
import PropTypes from "prop-types";
import styles from "../InputWithLabel/InputWithLabel.module.css";
import DatePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css"


export const DateRangePicker = ({
  label,
  value,
  onChange,
  mindate,
  showError,
  textboxSize,
}) => {
  const handleChange = (s,e) => {
    onChange(s,e);
  };
  return (
    <Form>
      <FormGroup row  style={{paddingLeft: '12px',paddingRight: '12px'}} >
        <label className={styles.label} style={{paddingLeft: 0}}>{label}</label>
        <DatePicker 
          initialSettings={{ 
           showDropdowns:true,
           // startDate:null,
            //endDate : null,
            locale:{
              format :'DD/MM/YYYY'
            }
          }}
          onCallback={(s,e) => handleChange(s,e)}
        >
          <input id="date-picker" type="text" className="form-control"         />
        </DatePicker>
      </FormGroup>
    </Form>
  );
};

DateRangePicker.defaultProps = {
  showError: false,
  textboxSize: 9,
};
DateRangePicker.propTypes = {
  showError: PropTypes.bool,
  textboxSize: PropTypes.string,
};
