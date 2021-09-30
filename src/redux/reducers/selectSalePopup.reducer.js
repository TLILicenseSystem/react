import { SHOW_SELECT_SALE_POPUP, HIDE_SELECT_SALE_POPUP } from "../constants";

const initalState = {
  isShow: false,
  title: "",
  list: [],
  action: () => {},
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SHOW_SELECT_SALE_POPUP:
      return { ...state, ...payload, isShow: true };

    case HIDE_SELECT_SALE_POPUP:
      return initalState;

    default:
      return state;
  }
};

export default reducer;
