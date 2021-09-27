import React,{useState,useEffect,useRef} from "react";
import { Form, FormGroup, Col, FormText, FormFeedback } from "reactstrap";
// import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import styles from "../InputWithLabel/InputWithLabel.module.css";
import { Input } from "reactstrap";
//import DatePicker from "reactstrap-date-picker";
import moment from "moment";
import SingleDatePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css"


export const DateField = ({ input, textboxSize, label, meta, mindate,maxdate }) => {
  let { invalid, touched, error } = meta;
  const [ initialSettings , setInitialSettings] = useState({
    singleDatePicker:true,
    showDropdowns:true,
    startDate: moment(),
    locale:{
      format :'DD/MM/YYYY'
    }
  })
 
  const keyRef = useRef(moment())
  useEffect(() => {
    keyRef.current = moment();
    setInitialSettings({
      ...initialSettings,
      startDate:  input.value ? moment( input.value) : moment()
    })
  },[input])
  useEffect(() => {
    keyRef.current = moment();
    setInitialSettings({
      ...initialSettings,
      maxDate :  maxdate ? moment(maxdate) : null
    })
  },[maxdate])

  const handleChange = (value) => {
    input.onChange(value);
  };
 
  console.log(maxdate,"mook",moment(maxdate))
  return (
    <Form>
      <FormGroup row>
        <label className={styles.label}>{label}</label>
        <Col xs={textboxSize}>
          {/*
          <DatePicker
            id={input.name}
            {...input}
            maxDate={moment(mindate).format()}
            invalid={error && touched}
            value={input.value && moment(input.value).format()}
            showTodayButton={true}
            dateFormat="DD/MM/YYYY"
            onChange={(v, f) => handleChange(v, f)}
          />
           */}
             
          <SingleDatePicker 
          key={keyRef.current}
          initialSettings={initialSettings}
          onCallback={(v, f) => handleChange(v)}
        //  onApply={(v, f) => handleChange(v)}
        >
          <input id={input.name}
              value={ input.value &&  moment( input.value).format("DD/MM/YYYY")}
              className={ error ? "is-invalid form-control" : "form-control"}
              type="text"            
       />
        </SingleDatePicker>
          { error && <FormFeedback>{error}</FormFeedback>}
        </Col>
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
