import {
  FETCH_USERS_START,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_BUSES_START,
  FETCH_BUSES_FAILURE,
  FETCH_BUSES_SUCCESS
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

export const fetchUsersEpic = action$ => {
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

export const fetchBusesEpic = action$ => {
  return action$.pipe(
    ofType(FETCH_BUSES_START),
    mergeMap(() => {
      return from(api('https://api.tfl.gov.uk/line/295/arrivals'))
        .pipe(
          map(payload => {
            const optimisedPayload = payload.map(bus => (({
              expectedArrival, id, vehicleId, stationName, direction, timestamp, timeToStation, towards
              }) => ({
                expectedArrival, id, vehicleId, stationName, direction, timestamp, timeToStation, towards
            }))(bus));
            return ({
              type: FETCH_BUSES_SUCCESS,
              payload: optimisedPayload
            });
          }),
          catchError(e => {
            return of({
              type: FETCH_BUSES_FAILURE,
              payload: e
            });
          })
        );
    }));
};