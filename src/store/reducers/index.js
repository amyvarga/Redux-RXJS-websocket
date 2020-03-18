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
    inbound:  {},
    outbound: {}
  }
};

const handlers = {
  [FETCH_USERS_START]: (state) => {
    return Object.assign({}, state, {
      loadingUsers: true
    });
  },
  [FETCH_USERS_SUCCESS]: (state, action) => {
    const userIds = state.users.map(user => user.id);
    const newUsers = Object.keys(action.payload).map(key => action.payload[key]);
    const deDupedUsers = newUsers.filter(user => !userIds.includes(user.id));
    return {
      ...state, users: [...state.users, ...deDupedUsers], loadingUsers: false
    };
  },
  [FETCH_USERS_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      errorMessage: action.payload,
      loadingUsers: false
    });
  }, 
  [FETCH_BUSES_START]: (state) => {
    return Object.assign({}, state, {
      loadingBuses: true
    });
  },
  [FETCH_BUSES_SUCCESS]: (state, action) => {
    const compareBusTimes = (a, b) => {
      const timeA = new Date(a.expectedArrival);
      const timeB = new Date(b.expectedArrival);
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    };
    const sortByDate = action.payload.sort(compareBusTimes);
    const formatTime = sortByDate.map(bus => {
      const arrivalTime = bus.expectedArrival.substring(11, 16);
      const arrivalInMins = Math.round(bus.timeToStation / 60);
      return {...bus, expectedArrival: arrivalTime, timeToStation: arrivalInMins};
    });
    const inbound = formatTime.filter(bus => bus.direction === "inbound");
    const vehicleIds = new Set([...inbound.map(bus => bus.vehicleId)]);
    const inboundBuses = [...vehicleIds].reduce((groupedVehicles, vehicleId) => {
      return {...groupedVehicles, [vehicleId]: inbound.filter(bus => bus.vehicleId === vehicleId)};
    }, {});
    
    const outboundBuses = formatTime.filter(bus => bus.direction === "outbound");
    return  {
     ...state, 
     buses: {
   
      inbound: inboundBuses
     },
     loadingBuses: false
    };
  },
  [FETCH_BUSES_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      errorMessage: action.payload,
      loadingBuses: false
    });
  }
};

const rootReducer = (state=initialState, action) => handlers[action.type] ? handlers[action.type](state, action) : {...state};

export default rootReducer;