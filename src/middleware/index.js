import { FETCH_USERS_SUCCESS } from "../store/constants/action-types";

export function extractUserData({ dispatch }) {
  return function (next) {
    return function (action) {
      let result = action;
      if (action.type === FETCH_USERS_SUCCESS) {
        console.log('payload', action);
        const payload = action.payload.map(user =>
          (({ id, avatar_url, html_url, login }) => ({ id, avatar_url, html_url, login }))(user)
        );
        result = { ...action, payload };
      }
      return next(result);
    };
  };
}