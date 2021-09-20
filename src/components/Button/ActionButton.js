import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { colors } from "../../themes/style";

export const AddButton = ({ onClick, title }) => {
  return (
    <Button
      id="addButton"
      onClick={onClick}
      style={{
        backgroundColor: `${colors.SECONDARYBLUE}`,
        border: `${colors.SECONDARYBLUE}`,
      }}
    >
      {title}
    </Button>
  );
};
AddButton.defaultProps = {
  title: "เพิ่ม",
  onClick: () => {},
};
AddButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export const EditButton = ({ title, onClick }) => {
  return (
    <Button
      id="editButton"
      size="sm"
      onClick={onClick}
      style={{
        backgroundColor: `${colors.SECONDARYBLUE}`,
        border: `${colors.SECONDARYBLUE}`,
      }}
    >
      {title}
    </Button>
  );
};
EditButton.defaultProps = {
  title: "แก้ไข",
  onClick: () => {},
};
EditButton.propTypes = {
  title: PropTypes.string,

  onClick: PropTypes.func,
};

export const DeleteButton = ({ title, onClick }) => {
  return (
    <Button
      id="deleteButton"
      size="sm"
      onClick={onClick}
      style={{
        backgroundColor: `${colors.GREY}`,
        border: `${colors.GREY}`,
      }}
    >
      {title}
    </Button>
  );
};

DeleteButton.defaultProps = {
  title: "ลบ",
  onClick: () => {},
};
DeleteButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export const SubmitButton = ({ type, title, disabled, onClick }) => {
  return (
    <Button
      id="submitButton"
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: `${colors.SECONDARYBLUE}`,
        border: `${colors.SECONDARYBLUE}`,
      }}
    >
      {title}
    </Button>
  );
};

SubmitButton.defaultProps = {
  type: "submit",
  title: "บันทึก",
  disabled: false,
  onClick: () => {},
};
SubmitButton.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export const CancelButton = ({ title, onClick }) => {
  return (
    <Button
      id="cancelButton"
      onClick={onClick}
      style={{
        backgroundColor: `${colors.GREY}`,
        border: `${colors.GREY}`,
      }}
    >
      {title}
    </Button>
  );
};

CancelButton.defaultProps = {
  title: "ยกเลิก",
  onClick: () => {},
};
CancelButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};
