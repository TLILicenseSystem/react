import { combineReducers } from "redux";
import searchPopup from "./searchPopup.reducer";
import searchSchedulePopup from "./searchSchedulePopup.reducer";

export default combineReducers({
  searchPopup,
  searchSchedulePopup,
});
