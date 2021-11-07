import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
import InputMask from "react-input-mask";
import buddhistEra from "dayjs/plugin/buddhistEra";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
} from "reactstrap";
import "./DatePickerThai.css";
dayjs.extend(buddhistEra);

export const DatePickerThai = ({
  canNull,
  value,
  onChange,
  mindate,
  maxdate,
  showError,
}) => {
  const [valuePicker, setValuePicker] = useState();
  const [buddhistDate, setBuddhistDate] = useState(
    dayjs(valuePicker).format("DD/MM/BBBB")
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (canNull) {
      setFormat(value);
    } else {
      if (value) {
        setFormat(value);
      }
    }
  }, [value]);

  const setFormat = (value) => {
    setBuddhistDate(dayjs(value).format("DD/MM/BBBB"));
    setValuePicker(new Date(value));
  };

  const onChangePicker = (date) => {
    setValuePicker(date);
    onChange(date);
  };

  const onChangeinput = (e) => {
    setBuddhistDate(e.target.value);
  };

  const onBlur = (e) => {
    if (e.target.value.length === 10) {
      const date = e.target.value.split("/");
      date[2] = date[2] - 543;
      let christDate = date[2] + "-" + date[1] + "-" + date[0];
      if (dayjs(new Date(christDate)).isValid()) {
        setValuePicker(new Date(christDate));
        onChange(new Date(christDate));
      } else {
        setValuePicker(new Date());
        onChange(new Date());
      }
    } else {
      if (canNull) {
        onChange(null);
      } else onChange(new Date());
    }
    setBuddhistDate(e.target.value);
  };

  return (
    <Form>
      <FormGroup row>
        <InputGroup>
          <InputMask
            ref={formRef}
            mask="99/99/9999"
            onChange={onChangeinput}
            onBlur={onBlur}
            className={showError ? "is-invalid form-control" : "form-control"}
            defaultValue={buddhistDate ? buddhistDate : null}
            value={buddhistDate}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <DatePicker
                locale="th-TH"
                clearIcon={null}
                calendarIcon={<FontAwesomeIcon icon={faCalendarAlt} />}
                onChange={onChangePicker}
                value={valuePicker}
                minDate={mindate ? new Date(mindate) : undefined}
                maxDate={maxdate ? new Date(maxdate) : undefined}
              />
            </InputGroupText>
          </InputGroupAddon>
          {showError && <FormFeedback>{showError}</FormFeedback>}
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

DatePickerThai.defaultProps = {
  showError: false,
  canNull: false,
  onChange: () => {},
};
DatePickerThai.propTypes = {
  showError: PropTypes.bool,
  canNull: PropTypes.bool,
  onChange: PropTypes.func,
};
