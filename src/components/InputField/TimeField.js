import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import styles from "../InputWithLabel/InputWithLabel.module.css";
import TimePicker from "react-bootstrap-time-picker";
import { Input, Col } from "reactstrap";

export const TimeField = ({ input, label, disabled, meta, textboxSize }) => {
  let { invalid, touched, error } = meta;
  const onChange = (time) => {
    time ? input.onChange(time) : input.onChange(null);
  };
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <Col xs={textboxSize}>
        {/* <Input
        id={input.name}
        // {...input}
        className={styles.input}
        type="text"
        invalid={error && touched}
        disabled={disabled}
        onChange={(e) => console.log("e", e)}
      /> */}
        {/*  <TimePicker
        id={input.name}
        {...input}
        error={error && touched}
        disabled={disabled}
        type="time"
        value={input.value ? input.value : null}
        onChange={onChange}
        format={24}
        // start="10:00"
        // end="21:00"
        step={30}
      /> */}
        <TextField
          id={input.name}
          {...input}
          //   error={showError}
          error={error && touched}
          disabled={disabled}
          type="time"
          value={input.value ? input.value.trim() : null}
          ampm={false}
          onChange={onChange}
          // variant="outlined"
          format="HH:mm:ss"
          size="small"
          pattern="[0-9]{2}:[0-9]{2}"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
            style: {
              fontSize: 15,
              //height: 10,
              padding: "8px",
              fontFamily: "Prompt-Regular",
            },
          }}
          style={{
            marginLeft: "0px",
            marginTop: "11px",
            width: "100%",
            height: "0px",
          }}
        />
      </Col>
    </div>
  );
};

TimeField.defaultProps = {
  label: "",
  textboxSize: 9,
};
TimeField.propTypes = {
  label: PropTypes.string,
  textboxSize: PropTypes.number,
};
