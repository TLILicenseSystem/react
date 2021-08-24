import { HIDE_EDIT_SCHEDULE_POPUP, SHOW_EDIT_SCHEDULE_POPUP } from "../constants";

export const showEditSchedulePopup = (payload) => ({
  type: SHOW_EDIT_SCHEDULE_POPUP,
  payload,
});

export const hideEditSchedulePopup = () => ({
  type: HIDE_EDIT_SCHEDULE_POPUP,
});
