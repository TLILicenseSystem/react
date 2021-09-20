import React from "react";
import { Form, FormGroup, Input, Label, FormText, Col } from "reactstrap";
// import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import styles from "../InputWithLabel/InputWithLabel.module.css";
import RSDatePicker from "reactstrap-date-picker";
import moment from "moment";

export const DatePicker = ({
  label,
  value,
  onChange,
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
        {/* <Input
          id="date-picker"
          type="date"
          value={value ? value : null}
          onChange={(e) =>
            onChange(e.target && e.target.value ? e.target.value : null)
          }
        /> */}
        <RSDatePicker
          id="date-picker"
          value={value && moment(value).toISOString()}
          showTodayButton={true}
          dateFormat="DD/MM/YYYY"
          onChange={(v, f) => handleChange(v, f)}
        />

        {/* <KeyboardDatePicker
          error={showError}
          autoOk
          disableToolbar
          variant="inline"
          // inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={moment(value, "DD/MM/yyyy").format("MM/DD/yyyy")}
          onChange={onChange}
          invalidDateMessage=""
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          InputProps={{
            style: {
              fontSize: 16,
              height: 35,
              fontFamily: "Prompt-Regular",
            },
          }}
          style={{
            marginLeft: "13px",
            marginTop: "4px",
            width: "90%",
            height: "0px",
          }}
        /> */}
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
