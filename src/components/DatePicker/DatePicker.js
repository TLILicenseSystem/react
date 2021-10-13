import React from "react";
import { Form, FormGroup, Input, Label, FormText, Col } from "reactstrap";
// import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import styles from "../InputWithLabel/InputWithLabel.module.css";
//import RSDatePicker from "reactstrap-date-picker";
import { DatePickerThai } from "../shared";

import "bootstrap-daterangepicker/daterangepicker.css";

export const DatePicker = ({
  label,
  value,
  onChange,
  mindate,
  maxdate,
  showError,
  textboxSize,
}) => {
  const handleChange = (value) => {
    onChange(value);
  };
  return (
    <Form>
      <FormGroup row>
        <label className={styles.label}>{label}</label>
        <DatePickerThai
          value={value}
          label={label}
          onChange={handleChange}
          mindate={mindate}
          maxdate={maxdate}
          showError={showError}
        />
      </FormGroup>
    </Form>
  );
};

DatePicker.defaultProps = {
  showError: false,
  textboxSize: 9,
  onChange: () => {},
};
DatePicker.propTypes = {
  showError: PropTypes.bool,
  textboxSize: PropTypes.string,
  onChange: PropTypes.func,
};
