import { createStore } from "redux";
import reducers from "./reducers";
// syntax เดิม ใช้ครั้งเดียว
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;
