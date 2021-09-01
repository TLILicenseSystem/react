import React from "react";
import { Form, FormGroup } from "reactstrap";
import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import styles from "../InputWithLabel/InputWithLabel.module.css";
import moment from "moment";
export const DatePicker = ({ label, value, onChange, showError }) => {
  return (
    <Form>
      <FormGroup row>
        <label className={styles.label}>{label}</label>
        <KeyboardDatePicker
          error={showError}
          autoOk
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={moment(value,"DD/MM/yyyy").format("MM/DD/yyyy")}
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
        />
      </FormGroup>
    </Form>
  );
};

DatePicker.defaultProps = {
  showError: false,
};
DatePicker.propTypes = {
  showError: PropTypes.bool,
};
