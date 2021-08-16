import { HIDE_SNACKBAR, SHOW_SNACKBAR } from "../constants";

export const showSnackBar = (payload) => ({
  type: SHOW_SNACKBAR,
  payload,
});

export const hideSnackBar = () => ({
  type: HIDE_SNACKBAR,
});
