import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

export const InputDepositCode = ({
  label,
  disabled,
  value,
  width,
  onChange,
}) => {
  const [depositCode, setDpositCode] = useState({
    first: "000",
    second: "00000",
  });

  useEffect(() => {
    setDpositCode({
      first: value.substr(0, 3),
      second: value.substr(3, value.length),
    });
  }, [value]);
  const autoTab_first = (e) => {
    if (depositCode.first)
      onChange(e.target.value + "" + depositCode.second.toUpperCase());
    else onChange("000" + depositCode.second.toUpperCase());

    setDpositCode({
      first: e.target.value,
      second: depositCode.second.toUpperCase(),
    });
  };
  const autoTab_second = (e) => {
    if (depositCode.first)
      onChange(depositCode.first + "" + e.target.value.toUpperCase());
    else onChange("000" + e.target.value.toUpperCase());

    setDpositCode({
      first: depositCode.first,
      second: e.target.value.toUpperCase(),
    });
  };
  console.log(depositCode, "depositCode");
  return (
    <div className={styles.div}>
      <label className={styles.label}>{label}</label>
      <Row>
        <Col md={4}>
          <InputMask
            id="depositCode_first"
            mask="999"
            maskChar=" "
            className="form-control"
            style={{ marginBottom: "20px" }}
            id="depositCode_first"
            type={"tel"}
            defaultValue={depositCode && depositCode.first}
            disabled={disabled}
            onChange={autoTab_first}
          />
          {/* <Input
            id="depositCode_first"
            defaultValue={depositCode.first}
            className={styles.input}
            type={"tel"}
            disabled={disabled}
            onChange={autoTab_first}
          /> */}
        </Col>
        <Col md={6}>
          <InputMask
            mask="*****"
            maskChar=" "
            className="form-control"
            style={{ marginBottom: "20px", textTransform: "uppercase" }}
            id="depositCode_second"
            type={"tel"}
            defaultValue={depositCode && depositCode.second}
            disabled={disabled}
            onChange={autoTab_second}
          />
          {/* <Input
            id="depositCode_second"
            defaultValue={depositCode.second}
            className={styles.input}
            type={"tel"}
            disabled={disabled}
            onChange={autoTab_second}
          /> */}
        </Col>
      </Row>
    </div>
  );
};

InputDepositCode.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height: "",
  disabled: false,
  onChange: () => {},
};

InputDepositCode.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
