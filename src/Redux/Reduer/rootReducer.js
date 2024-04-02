import { combineReducers } from "redux";
import { RegistrationReducer, LogInReducers } from "../action";

export default combineReducers({
  Registrations: RegistrationReducer,
  LogInDetails: LogInReducers,
});
