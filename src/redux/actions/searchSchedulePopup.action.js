import { HIDE_SEARCH_SCHEDULE_POPUP, SHOW_SEARCH_SCHEDULE_POPUP } from "../constants";

export const showSearchSchedulePopup = (payload) => ({
  type: SHOW_SEARCH_SCHEDULE_POPUP,
  payload,
});

export const hideSearchSchedulePopup = () => ({
  type: HIDE_SEARCH_SCHEDULE_POPUP,
});
