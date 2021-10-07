import { SHOW_SELECT_SALE_POPUP, HIDE_SELECT_SALE_POPUP ,UPDATE_SELECT_SALE} from "../constants";

export const showSelectSalePopup = (payload) => ({
  type: SHOW_SELECT_SALE_POPUP,
  payload,
});

export const hideSelectSalePopup = () => ({
  type: HIDE_SELECT_SALE_POPUP,
});

export const updateSelectSale = (payload) => ({
  type: UPDATE_SELECT_SALE,
  payload,
});

