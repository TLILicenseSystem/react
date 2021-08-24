import { combineReducers } from "redux";
import searchLocationPopup from "./searchLocationPopup.reducer";
import editSchedulePopup from "./editSchedulePopup.reducer";
import searchPopup from "./searchPopup.reducer";
import editLocationPopup from "./editLocationPopup.reducer";
import snackBar from "./snackBar.reducer";

export default combineReducers({
  searchLocationPopup,
  editSchedulePopup,
  searchPopup,
  editLocationPopup,
  snackBar,
});
