import { createStore } from "redux";
import { rootReducer } from "../reducers/reducer_root";

export const store = createStore(rootReducer);
