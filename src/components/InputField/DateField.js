import React from "react";
import { Form, FormGroup, Col, FormText, FormFeedback } from "reactstrap";
// import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import styles from "../InputWithLabel/InputWithLabel.module.css";
import { Input } from "reactstrap";

export const DateField = ({ input, textboxSize, label, meta, mindate }) => {
  let { invalid, touched, error } = meta;

  const onChange = (e) => {
    if (e.target && e.target.value) input.onChange(e.target.value);
    // date ?  : input.onChange(null);
  };
  return (
    <Form>
      <FormGroup row>
        <label className={styles.label}>{label}</label>
        <Col xs={textboxSize}>
          <Input
            id={input.name}
            {...input}
            min={mindate}
            invalid={error && touched}
            type="date"
            value={input.value}
            onChange={onChange}
          />{" "}
          {touched && error && <FormFeedback>{error}</FormFeedback>}
        </Col>

        {/* <KeyboardDatePicker
          id={input.name}
          {...input}
          //   error={showError}
          error={error && touched}
          autoOk
          disableToolbar
          variant="inline"
          // inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          value={input.value ? new Date(input.value) : null}
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

DateField.defaultProps = {
  label: "",
  textboxSize: 9,
  mindate: "",
};
DateField.propTypes = {
  label: PropTypes.string,
  textboxSize: PropTypes.number,
  mindate: PropTypes.string,
};
