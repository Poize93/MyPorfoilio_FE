import { hostName } from "../../dummyData";
import { put, all, call, takeLatest } from "redux-saga/effects";
import { RegistrationActionTypes, LogInTypes } from "../action";
import axios from "axios";

function* registrationRequest(payload) {
  const res = yield call(axios.post, `${hostName}/registration`, {
    ...payload,
  });
  return res;
}

function* registration({ payload }) {
  console.log(payload, "payloadpayloadpayload");
  try {
    yield put({
      type: RegistrationActionTypes.REGISTRATION_REQUEST,
      payload,
    });
    const response = yield call(registrationRequest, payload);

    yield put({
      type: RegistrationActionTypes.REGISTRATION_RESPONSE,
      payload: response?.data,
    });
  } catch (e) {
    yield put({ type: RegistrationActionTypes.REGISTRATION_ERROR });
  }
}

//

function* loginRequest(payload) {
  const res = yield call(axios.post, `${hostName}/login`, {
    ...payload,
  });
  return res;
}

function* logIn({ payload }) {
  console.log(payload, "payloadpayloadpayload");
  try {
    yield put({
      type: LogInTypes.LOGIN_REQUEST,
      payload,
    });
    const response = yield call(loginRequest, payload);

    yield put({
      type: LogInTypes.LOGIN_RESPONSE,
      payload: response?.data,
    });
  } catch (e) {
    yield put({ type: LogInTypes.LOGIN_ERROR });
  }
}

function* RegistrationSaga() {
  yield all([takeLatest(RegistrationActionTypes.REGISTRATION, registration)]);
  yield all([takeLatest(LogInTypes.LOGIN, logIn)]);
}

export default RegistrationSaga;
