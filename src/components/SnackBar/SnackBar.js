import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { hideSnackBar } from "../../redux/actions";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const SnackBar = () => {
  const { open, severity, message } = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();
  const vertical = "top";
  const horizontal = "center";
  const handleClose = () => {
    dispatch(hideSnackBar());
  };

  return (
    <div style={{ fontFamily: "Prompt-Regular" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
