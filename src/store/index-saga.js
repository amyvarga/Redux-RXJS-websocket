import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import { extractUserData } from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";

const initialiseSageMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(extractUserData, initialiseSageMiddleware))
);

initialiseSageMiddleware.run(apiSaga);
export default store;