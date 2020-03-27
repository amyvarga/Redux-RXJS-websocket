import rootReducer, {
  compareBusTimes,
  sortByDate,
  limitToTimeFrame,
  formatTimes,
  formatMinutes,
  filterAndGroup
} from "./index";

const bus1 = {expectedArrival: "2020-03-24T16:35:36Z", timeToStation: 1739, direction: "inbound", vehicleId: "XXAA"};
const bus2 = {expectedArrival: "2020-03-24T16:30:36Z", timeToStation: 1033, direction: "inbound", vehicleId: "XXAA"};
const bus3 = { expectedArrival: "2020-03-24T16:29:36Z", timeToStation: 1559, direction: "inbound", vehicleId: "XXBB" };
const bus4 = { expectedArrival: "2020-03-24T16:28:36Z", timeToStation: 175, direction: "inbound", vehicleId: "XXBB" };
const bus5 = { expectedArrival: "2020-03-24T16:35:36Z", timeToStation: 1739, direction: "outbound", vehicleId: "XXAA" };
const bus6 = { expectedArrival: "2020-03-24T16:25:36Z", timeToStation: 173, direction: "outbound", vehicleId: "XXAA" };
const bus7 = { expectedArrival: "2020-03-24T16:29:36Z", timeToStation: 1073, direction: "outbound", vehicleId: "XXBB" };
const bus8 = { expectedArrival: "2020-03-24T16:34:36Z", timeToStation: 573, direction: "outbound", vehicleId: "XXBB" };

const expectedFormat1 = ({expectedArrival = "16:35", timeToStation = 29, direction = "inbound", vehicleId = "XXAA" } = {}) => ({expectedArrival, timeToStation, direction, vehicleId});
const expectedFormat2 = ({expectedArrival = "16:30", timeToStation = 17, direction = "inbound", vehicleId = "XXAA"} = {}) => ({expectedArrival, timeToStation, direction, vehicleId});
const expectedFormat3 = ({expectedArrival = "16:29" , timeToStation = 26, direction = "inbound", vehicleId = "XXBB" } = {}) => ({expectedArrival, timeToStation, direction, vehicleId});
const expectedFormat4 = ({ expectedArrival= "16:28", timeToStation = 3, direction = "inbound", vehicleId = "XXBB" } = {}) => ({expectedArrival, timeToStation, direction, vehicleId});
const expectedFormat5 =({ expectedArrival = "16:35", timeToStation = 29, direction = "outbound", vehicleId = "XXAA" } = {}) => ({expectedArrival, timeToStation, direction, vehicleId});
const expectedFormat6 = ({expectedArrival = "16:25", timeToStation = 3, direction = "outbound", vehicleId = "XXAA" } = {}) => ({expectedArrival, timeToStation, direction, vehicleId});
const expectedFormat7 = ({expectedArrival = "16:29", timeToStation = 18, direction = "outbound", vehicleId = "XXBB" } = {}) => ({expectedArrival, timeToStation, direction, vehicleId});
const expectedFormat8 = ({expectedArrival = "16:34", timeToStation = 10, direction = "outbound", vehicleId = "XXBB" } = {}) => ({expectedArrival, timeToStation, direction, vehicleId});

const expectedFormatInboundBuses = {
  XXAA: [expectedFormat2(), expectedFormat1()],
  XXBB: [expectedFormat4(), expectedFormat3()]
};
const expectedFormatOutboundBuses = {
  XXAA: [expectedFormat6(), expectedFormat5()],
  XXBB: [expectedFormat7(), expectedFormat8()]
};

const getInitialState = ({
  loadingUsers = false,
  errorMessage = null,
  users = [],
  loadingBuses = false,
  buses = {
    inbound:  {},
    outbound: {}
  } 
} = {}) => ({
  loadingUsers,
  errorMessage,
  users,
  loadingBuses,
  buses
});

const user1 = {
    id: 130,
    avatar_url: "https://avatars2.githubusercontent.com/u/130?v=4",
    html_url: "https://github.com/nate",
    login: "nate",
};
const user2 = {
    id: 133,
    avatar_url: "https://avatars2.githubusercontent.com/u/133?v=4",
    html_url: "https://github.com/dkubb",
    login: "dkubb"
};
const user3 = {
    id: 134,
    avatar_url: "https://avatars2.githubusercontent.com/u/134?v=4",
    html_url: "https://github.com/jnicklas",
    login: "jnicklas"
};
const user4 = {
    id: 136,
    avatar_url: "https://avatars2.githubusercontent.com/u/136?v=4",
    html_url: "https://github.com/simonjefford",
    login: "simonjefford"
};
const user5 = {
    id: 137,
    avatar_url: "https://avatars2.githubusercontent.com/u/137?v=4",
    html_url: "https://github.com/josh",
    login: "josh"
};

const getAction = (actionType, payload) => ({
  type: actionType,
  payload: payload
});

describe('compareBusTimes', () => {
  it('will return 1 when timeA is later than timeB', () => {
    const timeA = {
      expectedArrival: "2020-03-24T16:45:36Z"
    };
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(1);
  });
  it('will return -1 when timeA is earlier than timeB', () => {
    const timeA = {
      expectedArrival: "2020-03-24T16:15:36Z"
    };
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(-1);
  });
  it('will return 0 when timeA is equal to timeB', () => {
    const timeA = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(0);
  });
});

describe('sortByDate', () => {
  it('will order an array of dates', () => {
    const times = [bus1, bus2, bus3, bus4];
    expect(sortByDate(times)).toEqual([bus4, bus3, bus2, bus1]);
  });
});

describe('limitToTimeFrame', () => {
  it('should only include times that are within the stated time frame', () => {
    const times = [bus1, bus2, bus3, bus4];
    const startTime = "2020-03-24T16:25:00Z";
    expect(limitToTimeFrame(startTime, 5)(times)).toEqual([bus3, bus4]);
  });
});

describe('formatTimes', () => {
  it('should format the arrival time to the format HH:MM', () => {
    const times = [bus1, bus2, bus3, bus4];
    expect(formatTimes(times)).toEqual([
      expectedFormat1({timeToStation: 1739}), 
      expectedFormat2({timeToStation: 1033}), 
      expectedFormat3({timeToStation: 1559}), 
      expectedFormat4({timeToStation: 175})
    ]); 
  });
});

describe('formatMinutes', () => {
  it('should format seconds to minutes rounding up', () => {
    const times = [bus1, bus2, bus3, bus4]; 
    expect(formatMinutes(times)).toEqual([
      expectedFormat1({expectedArrival:"2020-03-24T16:35:36Z"}), 
      expectedFormat2({expectedArrival:"2020-03-24T16:30:36Z"}), 
      expectedFormat3({expectedArrival:"2020-03-24T16:29:36Z"}), 
      expectedFormat4({expectedArrival:"2020-03-24T16:28:36Z"})
    ]);
  });
});

describe('filterAndGroup', () => {
  it('should filter by direction and group by vehicle license', () => {
    const buses = [expectedFormat2(), expectedFormat1(), expectedFormat4(), expectedFormat3(), expectedFormat6(), expectedFormat5(), expectedFormat7(), expectedFormat8()];
    expect(filterAndGroup("inbound", buses)).toEqual(expectedFormatInboundBuses);
    expect(filterAndGroup("outbound", buses)).toEqual(expectedFormatOutboundBuses);
  });
});

describe('rootReducer', () => {
  describe('FETCH_USERS_START', () => {
    it('should set loadingUsers to true', () => {
      const state = getInitialState();
      const action = getAction("FETCH_USERS_START");
      expect(rootReducer(state, action).loadingUsers).toBeTruthy();
    });
  });
  describe('FETCH_USERS_SUCCESS', () => {
    it('should add users to the users array', () => {
      const state = getInitialState();
      const expectedUsers = [user1, user2, user3];
      const action = getAction("FETCH_USERS_SUCCESS", expectedUsers); 
      expect(rootReducer(state, action)).toEqual(expect.objectContaining({users: expectedUsers})); 
    }); 
    it('should set loadingUsers to false', () => {
      const expectedUsers = [user1, user2, user3];
      const state = getInitialState({users: expectedUsers});
      const action = getAction("FETCH_USERS_SUCCESS", expectedUsers); 
      expect(rootReducer(state, action).loadingUsers).toBeFalsy();
    });
    it('should not remove users from the existing state', () => {
      const state = getInitialState({users:  [user1, user2, user3] });
      const action = getAction("FETCH_USERS_SUCCESS", [user4, user5]);
      expect(rootReducer(state, action)).toEqual(expect.objectContaining({users: [user1, user2, user3, user4, user5]}));
    });
    it('should only contain unique users', () => {
      const initialState = getInitialState({users:  [user1, user2, user3] });
      const expectedUsers = [user1, user2, user3, user4, user5];
      const action = getAction("FETCH_USERS_SUCCESS", expectedUsers);
      expect(rootReducer(initialState, action)).toEqual(expect.objectContaining({users: expectedUsers}));
    });
  });
  describe('FETCH_USERS_START', () => {
    it('should set loadingUsers to false', () => {
      const state = getInitialState();
      const action = getAction("FETCH_USERS_START");
      expect(rootReducer(state, action).loadingUsers).toBeTruthy();
    });
  });
  describe('FETCH_USERS_FAILURE', () => {
    it('should set loadingUsers to false', () => {
      const state = getInitialState();
      const action = getAction("FETCH_USERS_FAILURE", "Error message");
      expect(rootReducer(state, action).loadingUsers).toBeFalsy();
    });
    it('should set errorMessage to error message', () => {
      const state = getInitialState();
      const action = getAction("FETCH_USERS_FAILURE", "Error message");
      expect(rootReducer(state, action).errorMessage).toBeTruthy();
    });
  });
  describe('FETCH_BUSES_START', () => {
    it('should set loadingBuses to true', () => {
      const state = getInitialState();
      const action = getAction("FETCH_BUSES_START");
      expect(rootReducer(state, action).loadingBuses).toBeTruthy();
    });
  });
  describe('FETCH_BUSES_SUCCESS', () => {
    it('should sort the buses by date, limit the time frame, format the time to HH:MM, format the minutes and should group by vehicleId and direction', () => { 
      const state = getInitialState();
      const action = getAction("FETCH_BUSES_SUCCESS", [bus1, bus2, bus3, bus4, bus5, bus6, bus7, bus8]);
      const expectedState = getInitialState({
        buses: {
          inbound: expectedFormatInboundBuses,
          outbound: expectedFormatOutboundBuses
        }
      });
      expect(rootReducer(state, action)).toEqual(expectedState); 
    });
  });
  describe('FETCH_BUSES_FAILURE', () => {
    it('should set loadingBuses to false', () => {
      const state = getInitialState();
      const action = getAction("FETCH_BUSES_FAILURE", "Error message");
      expect(rootReducer(state, action).loadingBuses).toBeFalsy();
    });
    it('should set errorMessage to error message', () => {
      const state = getInitialState();
      const action = getAction("FETCH_BUSES_FAILURE", "Error message");
      expect(rootReducer(state, action).errorMessage).toBeTruthy();
    });
  });
});