import {
  HIDE_EDIT_LOCATION_POPUP,
  SHOW_EDIT_LOCATION_POPUP,
} from "../constants";

const initalState = {
  isShow: false,
  title: "",
  initialValues: null,
  // locationEditDetail: {},
  // locationDetail: "",
  // locationId: "",
  // locationTypeCode: "",
  // locationTypeName: "",
  // organizerCode: "",
  // organizerName: "",
  // provinceCode: "",
  // provinceName: "",
  action: () => {},
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SHOW_EDIT_LOCATION_POPUP:
      return { ...state, ...payload, isShow: true };

    case HIDE_EDIT_LOCATION_POPUP:
      return initalState;

    default:
      return state;
  }
};

export default reducer;
