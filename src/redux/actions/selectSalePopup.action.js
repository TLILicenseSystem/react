import { SHOW_SELECT_SALE_POPUP, HIDE_SELECT_SALE_POPUP } from "../constants";

export const showSelectSalePopup = (payload) => ({
  type: SHOW_SELECT_SALE_POPUP,
  payload,
});

export const hideSelectSalePopup = () => ({
  type: HIDE_SELECT_SALE_POPUP,
});
