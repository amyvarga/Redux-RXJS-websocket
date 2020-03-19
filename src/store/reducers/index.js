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
const sortBusesByDate = ((array) => {
  return array.sort(compareBusTimes);
});
const formatBusTimes = ((array) => {
  const formatted = array.map(item => {
    const arrivalTime = item.expectedArrival.substring(11, 16);
 
    return {...item, expectedArrival: arrivalTime};
  });
  return formatted;
});
const formatBusMinutes = ((array) => {
  const formatted = array.map(item => {
    const arrivalInMins = Math.round(item.timeToStation / 60);
    return {...item, timeToStation: arrivalInMins};
  });
  return formatted;
});
const filterAndGroupBuses = ((direction, array) => {
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
    const busesSortedByDate = sortBusesByDate(action.payload);
    const formattedBusesTime= formatBusTimes(busesSortedByDate);
    const formattedBusesMinutes = formatBusMinutes(formattedBusesTime);
    const inboundBuses = filterAndGroupBuses("inbound",formattedBusesMinutes);
    const outboundBuses = filterAndGroupBuses("outbound", formattedBusesMinutes);
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

const rootReducer = (state=initialState, action) => handlers[action.type] ? handlers[action.type](state, action) : {...state};

export default rootReducer;