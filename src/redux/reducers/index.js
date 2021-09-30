import { combineReducers } from "redux";
import searchLocationPopup from "./searchLocationPopup.reducer";
import editSchedulePopup from "./editSchedulePopup.reducer";
import searchPopup from "./searchPopup.reducer";
import editLocationPopup from "./editLocationPopup.reducer";
import snackBar from "./snackBar.reducer";

import searchSchedulePopup from "./searchSchedulePopup.reducer";
import selectSalePopup from "./selectSalePopup.reducer";

import { reducer as formReducer } from "redux-form";

export default combineReducers({
  searchLocationPopup,
  editSchedulePopup,
  searchPopup,
  editLocationPopup,
  snackBar,
  searchSchedulePopup,
  selectSalePopup,
  form: formReducer,
});
