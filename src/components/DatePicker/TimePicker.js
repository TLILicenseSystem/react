import React from "react";
import TextField from "@material-ui/core/TextField";
import { propTypes } from "react-bootstrap/esm/Image";
import styles from "../InputWithLabel/InputWithLabel.module.css";

export const TimePicker = ({
  label,
  timeValue,
  onClickTime,
  eTime,
  disabled,
}) => {
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <TextField
        disabled={disabled}
        error={eTime}
        id="time"
        type="time"
        value={timeValue}
        ampm={false}
        onChange={onClickTime}
        // variant="outlined"
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
    </div>
  );
};

TimePicker.defaultProps = {
  label: "",
  timeValue: "",
  disabled: false,
  onClickTime: () => {},
  eTime: () => {},
};
TimePicker.propTypes = {
  label: propTypes.string,
  timeValue: propTypes.string,
  onClickTime: propTypes.func,
  eTime: propTypes.func,
};
