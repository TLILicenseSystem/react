import React from "react";
import { Col } from "reactstrap";
import PropTypes from "prop-types";
import { DatePickerThai } from "../shared";
import styles from "./InputWithLabel.module.css";

export const DateField = ({
  input,
  textboxSize,
  label,
  meta,
  mindate,
  maxdate,
}) => {
  let { error } = meta;

  const handleChange = (value) => {
    input.onChange(value);
  };
  return (
    <div>
      <label className={styles.label}>{label}</label>

      <Col xs={textboxSize}>
        <DatePickerThai
          label={label}
          onChange={handleChange}
          {...input}
          mindate={mindate}
          maxdate={maxdate}
          showError={error}
        />
      </Col>
    </div>
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
