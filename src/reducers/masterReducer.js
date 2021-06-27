import { combineReducers } from "redux";
import Logged from "./isLogged";

const masterReducer = combineReducers({
  isLogged: Logged,
});

export default masterReducer;
