import { HIDE_SNACKBAR, SHOW_SNACKBAR } from "../constants";

const initalState = {
  open: false,
  severity : "",
  message: "",
  action: () => {},
};

const reducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SHOW_SNACKBAR:
      return { ...state, ...payload, open: true };

    case HIDE_SNACKBAR:
      return initalState;

    default:
      return state;
  }
};

export default reducer;
