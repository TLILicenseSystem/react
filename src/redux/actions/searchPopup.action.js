import { HIDE_SEARCH_POPUP, SHOW_SEARCH_POPUP } from "../constants";

export const showSearchPopup = (payload) => ({
  type: SHOW_SEARCH_POPUP,
  payload,
});

export const hideSearchPopup = () => ({
  type: HIDE_SEARCH_POPUP,
});
