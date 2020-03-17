import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_BUSES_START,
  FETCH_BUSES_SUCCESS,
  FETCH_BUSES_FAILURE
} from "../constants/action-types";

const initialState = {
  loadingUsers: false,
  errorMessage: null,
  users: [],
  loadingBuses: false,
  buses: {
    inbound:[],
    outbound: []
  }
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_START:
      return Object.assign({}, state, {
        loadingUsers: true
      });
    case FETCH_USERS_SUCCESS:
      const userIds = state.users.map(user => user.id);
      const newUsers = Object.keys(action.payload).map(key => action.payload[key]);
      const deDupedUsers = newUsers.filter(user => !userIds.includes(user.id));
      return {
        ...state, users: [...state.users, ...deDupedUsers], loadingUsers: false
      };
    case FETCH_USERS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.payload,
        loadingUsers: false
      });
    case FETCH_BUSES_START:
      return Object.assign({}, state, {
        loadingBuses: true
      });
    case FETCH_BUSES_SUCCESS:
      const payload = action.payload.map(bus => {
        return {...bus, expectedArrival: bus.expectedArrival.substring(11, 16)}
      });
      console.log(payload);
      const inboundBuses = payload.filter(bus => bus.direction === "inbound");
      const outboundBuses = payload.filter(bus => bus.direction === "outbound");
      return  {
       ...state, 
       buses: {
        outbound: [...state.buses.outbound,  ...outboundBuses],
        inbound: [...state.buses.inbound,  ...inboundBuses],
       },
       loadingBuses: false
      };
    case FETCH_BUSES_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.payload,
        loadingBuses: false
      });
    default:
      return state;
  }
}

export default rootReducer;