import { FETCH_BUSES_START, FETCH_BUSES_FAILURE, FETCH_BUSES_SUCCESS } from "../store/constants/action-types";
import { mergeMap, map, catchError, takeUntil } from "rxjs/operators";
import { ofType } from "redux-observable";
import { of } from "rxjs";
import { webSocket } from "rxjs/webSocket";

const socket = webSocket('ws://127.0.0.1:8000');

export const fetchBusesEpic = action$ => {
  return action$.pipe(
    ofType(FETCH_BUSES_START),
    mergeMap((action) =>
      socket
      .multiplex(
        () => ({ type: "subscribe", busId: action.payload.busId }),
        () => ({ type: "unsubscribe", busId: action.payload.busId }),
        msg => msg.type === action.payload.busId
      )
        .pipe(
          map(payload => {
            const {data} = payload;
            const optimisedPayload = data.map(bus => (({
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
          }),
          takeUntil(action$.pipe(ofType(FETCH_BUSES_FAILURE)))
        )
    )
  );
};