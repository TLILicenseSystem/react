import { HIDE_ALERT_POPUP, SHOW_ALERT_POPUP } from "../constants";

const initalState = {
  isShow: false,
  title: "",
  description: "",
  action: () => {},
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SHOW_ALERT_POPUP:
      return { ...state, ...payload, isShow: true };

    case HIDE_ALERT_POPUP:
      return initalState;

    default:
      return state;
  }
};

export default reducer;
