import {pipe} from "ramda";
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

export const compareBusTimes = (a, b) => {
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
export const sortByDate = ((array) => {
  return array.sort(compareBusTimes);
});
export const limitToTimeFrame = (startTime, minutes) => ((array) => {
  const endTime = new Date(startTime).getTime() + (minutes * 60000);
  const limited = array.filter(item => new Date(item.expectedArrival) < endTime);
  return limited;
});

export const formatTimes = ((array) => {
  const formatted = array.map(item => {
    const arrivalTime = item.expectedArrival.substring(11, 16);
    return {...item, expectedArrival: arrivalTime};
  });
  return formatted;
});
export const formatMinutes = ((array) => {
  const formatted = array.map(item => {
    const arrivalInMins = Math.round(item.timeToStation / 60);
    return {...item, timeToStation: arrivalInMins};
  });
  return formatted;
});
export const filterAndGroup = ((direction, array) => {
  const filterByDirection = array.filter(item => item.direction === direction);
  const uniqueVehicleIds = [...new Set(filterByDirection.map(item => item.vehicleId))];
  const groupedByVehicleId = uniqueVehicleIds.reduce((groupedVehicles, vehicleId) => {
    return {...groupedVehicles, [vehicleId]: filterByDirection.filter(item => item.vehicleId === vehicleId)};
  }, {});
  return groupedByVehicleId;
}); 

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
    const startTime = new Date();
    const buses = pipe(
      sortByDate,
      limitToTimeFrame(startTime, 15),
      formatTimes,
      formatMinutes
    )(action.payload);
    const inboundBuses = filterAndGroup("inbound", buses);
    const outboundBuses = filterAndGroup("outbound", buses); 
    return  {
     ...state, 
     buses: {
      outbound: outboundBuses,
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

export const rootReducer = (state=initialState, action) => handlers[action.type] ? handlers[action.type](state, action) : {...state};

export default rootReducer;