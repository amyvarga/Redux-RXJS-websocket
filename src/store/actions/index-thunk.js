import { FETCH_USERS_START, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "../constants/action-types";

export function getUsers() {
  return function (dispatch) {
    dispatch({
      type: FETCH_USERS_START,
      payload: true
    });
    const randomNumber = Math.floor(Math.random() * 500);
    return fetch(`https://api.github.com/users?since=${randomNumber}`)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: json
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_USERS_FAILURE,
          payload: error.message
        });
      });
  };
}