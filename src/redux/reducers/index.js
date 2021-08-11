import { combineReducers } from "redux";
import searchLocationPopup from "./searchLocationPopup.reducer";
import searchSchedulePopup from "./searchSchedulePopup.reducer";
import searchPopup from "./searchPopup.reducer";
import editLocationPopup from "./editLocationPopup.reducer";

export default combineReducers({
  searchLocationPopup,
  searchSchedulePopup,
  searchPopup,
  editLocationPopup,
});
