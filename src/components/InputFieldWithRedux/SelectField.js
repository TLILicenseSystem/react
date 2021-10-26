import React from "react";
import { Input, FormGroup, Form, Col, FormFeedback } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { get } from "lodash";

export const SelectField = ({
  input,
  label,
  value,
  disabled,
  textboxSize,
  requiredField,
  option,
  meta,
  isClearable,
  onClick,
}) => {
  let { invalid, touched, error } = meta;

  const customStyle = {
    option: (provided, state) => ({
      ...provided,
      fontFamily: "Prompt-Regular",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontFamily: "Prompt-Regular",
    }),
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused ? "#ced4da" : error ? "#dc3545" : "#ced4da",
      // overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused
          ? "#ced4da"
          : error
          ? "#dc3545"
          : "#ced4da",
      },
    }),
  };

  return (
    <div>
      <Form>
        <FormGroup row>
          <label className={styles.label}>
            {label}{" "}
            <label className={styles.required}>
              {requiredField ? " *" : ""}
            </label>
          </label>
          <Col xs={textboxSize}>
            <Select
              id={input.name}
              className={error && "is-invalid"}
              styles={customStyle}
              value={option.find((option) => option.value === input.value)}
              defaultValue={option.find(
                (option) => option.value === input.value
              )}
              isClearable={true}
              isSearchable={true}
              options={option}
              isDisabled={disabled}
              onChange={(e) => input.onChange(get(e, "value", null))}
            />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
SelectField.defaultProps = {
  label: "",
  type: "text",
  disabled: false,
  textboxSize: 9,
  requiredField: false,
  option: [],
  meta: {
    invalid: false,
    touched: false,
    error: false,
  },
};

SelectField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  option: PropTypes.array,
  disabled: PropTypes.bool,
  textboxSize: PropTypes.number,
  requiredField: PropTypes.bool,
  meta: PropTypes.object,
};
