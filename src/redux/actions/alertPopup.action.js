import { HIDE_ALERT_POPUP, SHOW_ALERT_POPUP } from "../constants";

export const showAlertPopup = (payload) => ({
  type: SHOW_ALERT_POPUP,
  payload,
});

export const hideAlertPopup = () => ({
  type: HIDE_ALERT_POPUP,
});
