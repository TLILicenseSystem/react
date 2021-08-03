import { HIDE_SEARCH_POPUP, SHOW_SEARCH_POPUP } from "../constants";

const initalState = {
  isShow: false,
  title: "",
  description: "",
  action: () => {},
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SHOW_SEARCH_POPUP:
      return { ...state, ...payload, isShow: true };

    case HIDE_SEARCH_POPUP:
      return initalState;

    default:
      return state;
  }
};

export default reducer;
