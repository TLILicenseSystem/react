import React from "react";
import { Input } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import TimeInput from 'react-time-input';
import { useForm, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// 4 props
// label
// type
// value
// onChange

export const InputTimeWithLabel = ({ label, type, value, onChange,showTime }) => {
  return (
    <div className={styles.div}>
      <label className={styles.label}>{label} :</label>
      <TimeInput disabled={showTime}
         className={styles.input}  
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputTimeWithLabel.defaultProps = {
  label: "",
  type: "text",
  value: "",
  onChange: () => {},
  showTime:true,
};

InputTimeWithLabel.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  showTime:PropTypes.bool,
};



//--------------------------ฟิลด์ textfield --------------------
export const InputWithLabel = ({ label, type, value, width, height,maxLength, onChange ,showTime,star,err}) => {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
console.log(err);
  return (
   
//<form onSubmit={handleSubmit(onSubmit)}>
    <div >
      <tr> 
        <td><label className={styles.label}>{label}</label><label className={styles.lableStar}>{star}</label></td>
        <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
      </tr>
    
      <tr>
        <td>
          <Input  disabled={showTime} maxLength = {maxLength}
         className={styles.input} style={{ width: width ,height :height}}
         type={type}
         value={value}
         onChange={onChange}
      />
      <p>{err}</p>
   <ErrorMessage
        errors={errors}
        name="singleErrorInput"
        render={({ message }) => <p>{err}</p>}
      /> 

      </td>
      </tr>

    </div>


    //</form>



  );
};

InputWithLabel.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "160px",
  height:"30px",
  maxLength:"",
  onChange: () => {},
  showTime:true,
  star : "",
};

InputWithLabel.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  maxLength: PropTypes.string,
  onChange: PropTypes.func,
  showTime:PropTypes.bool,
  star: PropTypes.string,
};


//------------------------ ปิดช่อง id ไม่ให้แก้ไข ---------------------
export const InputWithLabelID = ({ label, type, value, width, onChange}) => {
  return (
    <div className={styles.div}>
      <label className={styles.label}>{label} :</label>
      <Input  disabled={true}
        className={styles.input} style={{ width: /*"100px"*/width ,height :"30px"}}
        type={type}
        value={value}
        onChange={onChange}

      />
    </div>
  );
};

InputWithLabelID.defaultProps = {
  label: "",
  type: "text",
  value: "",
  width: "100px",
  height: "",
  onChange: () => {},
};

InputWithLabelID.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func,
};