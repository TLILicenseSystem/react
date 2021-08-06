import { HIDE_SEARCH_LOCATION_POPUP, SHOW_SEARCH_LOCATION_POPUP } from "../constants";

export const showSearchLocationPopup = (payload) => ({
  type: SHOW_SEARCH_LOCATION_POPUP,
  payload,
});

export const hideSearchLocationPopup = () => ({
  type: HIDE_SEARCH_LOCATION_POPUP,
});
