import { HIDE_EDIT_LOCATION_POPUP, SHOW_EDIT_LOCATION_POPUP } from "../constants";

export const showEditLocationPopup = (payload) => ({
  type: SHOW_EDIT_LOCATION_POPUP,
  payload,
});

export const hideEditLocationPopup = () => ({
  type: HIDE_EDIT_LOCATION_POPUP,
});
