import {
  takeEvery,
  call,
  put
} from "redux-saga/effects";
import {
  FETCH_USERS_START,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS
} from "../store/constants/action-types";

export default function* watcherSaga() {
  yield takeEvery(FETCH_USERS_START, workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(fetchUsers);
    yield put({
      type: FETCH_USERS_SUCCESS,
      payload
    });
  } catch (e) {
    yield put({
      type: FETCH_USERS_FAILURE,
      payload: e
    });
  }
}

function fetchUsers() {
  const randomNumber = Math.floor(Math.random() * 500);
  return fetch(`https://api.github.com/users?since=${randomNumber}`)
    .then(response => response.json());
}