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

export const EditButton = ({ onClick }) => {
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
      แก้ไข
    </Button>
  );
};
EditButton.defaultProps = {
  onClick: () => {},
};
EditButton.propTypes = {
  onClick: PropTypes.func,
};

export const DeleteButton = ({ onClick }) => {
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
      ลบ
    </Button>
  );
};

DeleteButton.defaultProps = {
  onClick: () => {},
};
DeleteButton.propTypes = {
  onClick: PropTypes.func,
};

export const SubmitButton = ({ type, disabled, onClick }) => {
  return (
    <Button
      id="submitButton"
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: `${colors.PRIMARYBLUE}`,
        border: `${colors.PRIMARYBLUE}`,
      }}
    >
      บันทึก
    </Button>
  );
};

SubmitButton.defaultProps = {
  type: "submit",
  disabled: false,
  onClick: () => {},
};
SubmitButton.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export const CancelButton = ({ onClick }) => {
  return (
    <Button
      id="cancelButton"
      onClick={onClick}
      style={{
        backgroundColor: `${colors.GREY}`,
        border: `${colors.GREY}`,
      }}
    >
      ยกเลิก
    </Button>
  );
};

CancelButton.defaultProps = {
  onClick: () => {},
};
CancelButton.propTypes = {
  onClick: PropTypes.func,
};
