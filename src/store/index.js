import {fetchUsersEpic, fetchBusesEpic} from "../epics/api-observables";
import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import rootReducer from "./reducers/index";
import {
  createEpicMiddleware,
  combineEpics
} from "redux-observable";

const observableMiddleware = createEpicMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(observableMiddleware))
);

export const rootEpic = combineEpics(
  fetchBusesEpic,
  fetchUsersEpic
);

observableMiddleware.run(rootEpic);
export default store;