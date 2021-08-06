import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
} from "reactstrap";
import { Modal, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { hideAlertPopup } from "../../redux/actions";
import PropTypes from "prop-types";

export const AlertPopup = ({onChange}) => {

  const dispatch = useDispatch();
  const { isShow, title, description, action } = useSelector(
    (state) => state.alertPopup
  );
  const handleAction = () => {
    //call back function
    action();
    dispatch(hideAlertPopup());
    onChange({});
  };


  const toggle = () => dispatch(hideAlertPopup());

  return (
    
    <Modal show={isShow} onHide={toggle} dialogClassName="alert alert-danger">  
    <Modal.Body>
    <div>abcd</div>
    </Modal.Body>
    </Modal>
    
  );
};
AlertPopup.defaultProps = {
  onChange: () => {},
};
AlertPopup.propTypes = {
  onChange: PropTypes.func,
};