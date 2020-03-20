
import WebSocket from 'ws';
import { catchEpicError, ofNamespace } from '@redux-observable-backend/redux-utils';
import  { map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import{ ofType } from 'redux-observable';
import { webSocket } from 'rxjs/webSocket';
import { configurations } from '@redux-observable-backend/node';
import {
  ADD_SERVER,
  CONNECT_TO_SERVER,
  DISCONNECT_FROM_SERVER,
  RECONNECT_TO_SERVER,
} from "../store/constants/action-types";
const addServer = ({
	connection,
	namespace,
}) => ({
	connection,
	namespace,
	type: ADD_SERVER,
});

const connectToServerEpic = (
  action$,
  state$,
) => (
  action$
  .pipe(
    ofType(CONNECT_TO_SERVER),
    mergeMap(({
      namespace: serverName,
    }) => (
      of(
        state$
        .value
      )
      .pipe(
        map(
          configurations
          .selectors
          .selectConfigurationSet({
            namespace: 'externalConnections',
          })
        ),
        map(externalConnections => (
          externalConnections[serverName]
        )),
        switchMap(({
          hostname,
          port,
          protocol,
          protocolVersion,
        }) => (
          action$
          .pipe(
            ofType(RECONNECT_TO_SERVER),
            ofNamespace(serverName),
            takeUntil(
              action$
              .pipe(
                ofType(
                  RECONNECT_TO_SERVER,
                  DISCONNECT_FROM_SERVER,
                ),
                ofNamespace(serverName),
              )
            ),
            startWith(null),
            map(() => (
              webSocket({
                protocol: protocolVersion,
                url: (
                  protocol
                  .concat('://')
                  .concat(hostname)
                  .concat(':')
                  .concat(port)
                ),
                WebSocketCtor: WebSocket,
              })
            )),
            map(webSocketServer => (
              addServer({
                connection: webSocketServer,
                namespace: serverName,
              })
            )),
          )
        )),
      )
    )),
    catchEpicError(),
  )
);

module.exports = connectToServerEpic;