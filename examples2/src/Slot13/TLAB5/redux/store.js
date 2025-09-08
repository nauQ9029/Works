import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./userSlice";

const rootReducer = combineReducers({ user: userReducer });
export const store = createStore(rootReducer, applyMiddleware(thunk));
