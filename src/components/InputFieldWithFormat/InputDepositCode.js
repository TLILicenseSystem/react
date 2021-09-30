import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

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
  }, []);
  const autoTab_first = (e) => {
    if (e.target.value && /^\d+$/.test(e.target.value)) {
      if (e.target.value.length > 3) {
        e.target.value = e.target.value.substr(0, 3);
      }
    } else e.target.value = null;
    onChange(e.target.value +""+ depositCode.second);
  };
  const autoTab_second = (e) => {
    if (e.target.value && /^([A-Z0-9 _-]+)$/.test(e.target.value)) {
      if (e.target.value.length > 5) {
        e.target.value = e.target.value.substr(0, 5);
      }
    } else e.target.value = null;
    onChange(depositCode.first +""+ e.target.value);
  };
  return (
    <div className={styles.div}>
      <label className={styles.label}>{label}</label>
      <Row>
        <Col md={4}>
          <Input
            id="depositCode_first"
            defaultValue={depositCode.first}
            className={styles.input}
            type={"tel"}
            disabled={disabled}
            onChange={autoTab_first}
          />
        </Col>
        <Col md={6}>
          <Input
            id="depositCode_second"
            defaultValue={depositCode.second}
            className={styles.input}
            type={"tel"}
            disabled={disabled}
            onChange={autoTab_second}
          />
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
