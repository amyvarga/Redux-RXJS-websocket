import {
  FETCH_USERS_START,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS
} from "../store/constants/action-types";
import {
  mergeMap,
  map,
  catchError
} from "rxjs/operators";
import {
  ofType
} from "redux-observable";
import {
  of ,
  from
} from "rxjs";

const api = (url, options) => {
  return fetch(url, options)
    .then(data => {
      if (data.ok) {
        return data.json();
      } else {
        throw data.status;
      }
    });
};

const fetchUsersEpic = action$ => {
  return action$.pipe(
    ofType(FETCH_USERS_START),
    mergeMap(() => {
      const randomNumber = Math.floor(Math.random() * 500);
      return from(api(`https://api.github.com/users?since=${randomNumber}`))
        .pipe(
          map(payload => {
            const optimisedPayload = payload.map(user => (({
              id,
              avatar_url,
              html_url,
              login
            }) => ({
              id,
              avatar_url,
              html_url,
              login
            }))(user));
            return ({
              type: FETCH_USERS_SUCCESS,
              payload: optimisedPayload
            });
          }),
          catchError(e => {
            return of({
              type: FETCH_USERS_FAILURE,
              payload: e
            });
          })
        );
    }));
};

export default fetchUsersEpic;