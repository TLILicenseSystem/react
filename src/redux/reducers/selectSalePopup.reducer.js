import {
  SHOW_SELECT_SALE_POPUP,
  HIDE_SELECT_SALE_POPUP,
  UPDATE_SELECT_SALE,
} from "../constants";

const initalState = {
  isShow: false,
  title: "",
  list: [],
  seleted: JSON.parse(sessionStorage.getItem("sale")),
  action: () => {},
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SHOW_SELECT_SALE_POPUP:
      return { ...state, ...payload, isShow: true };

    case HIDE_SELECT_SALE_POPUP:
      return initalState;

    case UPDATE_SELECT_SALE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default reducer;
