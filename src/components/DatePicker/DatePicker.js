import React from "react";
import { Form, FormGroup, Input, Label, FormText, Col } from "reactstrap";
// import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import styles from "../InputWithLabel/InputWithLabel.module.css";
//import RSDatePicker from "reactstrap-date-picker";
import moment from "moment";
import SingleDatePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css"


export const DatePicker = ({
  label,
  value,
  onChange,
  mindate,
  showError,
  textboxSize,
}) => {
  const handleChange = (value, formattedValue) => {
    onChange(value);
  };
  return (
    <Form>
      <FormGroup row>
        <label className={styles.label}>{label}</label>

      {/*  <RSDatePicker
          id="date-picker"
          minDate={mindate ? moment(mindate).format() : null}
          value={value && moment(value).isValid() && moment(value).format()}
          showTodayButton={true}
          dateFormat="DD/MM/YYYY"
          onChange={(v, f) => handleChange(v, f)}
        />
         */}
         <SingleDatePicker 
          initialSettings={{
            singleDatePicker:true,
            showDropdowns:true,
            minDate:mindate ? moment(mindate) : null,
            startDate: value && moment(value).isValid() && moment(value),
            locale:{
              format :'DD/MM/YYYY'
            }
          }}
          onCallback={(v, f) => handleChange(v, f)}
        >
          <input id="date-picker" type="text" className="form-control"         />
        </SingleDatePicker>

      </FormGroup>
    </Form>
  );
};

DatePicker.defaultProps = {
  showError: false,
  textboxSize: 9,
};
DatePicker.propTypes = {
  showError: PropTypes.bool,
  textboxSize: PropTypes.string,
};
