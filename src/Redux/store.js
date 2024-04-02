// import { CreateStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import combineReducers from "./Reduer/rootReducer";
import RegistrationSaga from "./Saga/registerSaga";
import createSagaMiddleware from "redux-saga";
// const store = CreateStore(rootReducer);

const SagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(SagaMiddleWare);
  },
});

SagaMiddleWare.run(RegistrationSaga);

export default store;
