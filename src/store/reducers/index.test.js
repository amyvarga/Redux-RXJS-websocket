import rootReducer, {
  compareBusTimes,
  sortByDate,
  limitToTimeFrame,
  formatTimes,
  formatMinutes,
  filterAndGroup
} from "./index";
import { FindValueSubscriber } from "rxjs/internal/operators/find";

const item1 = {expectedArrival: "2020-03-24T16:35:36Z", timeToStation: 1739 };
const item2 = {expectedArrival: "2020-03-24T16:30:36Z", timeToStation: 1033 };
const item3 = { expectedArrival: "2020-03-24T16:29:36Z", timeToStation: 1559 };
const item4 = { expectedArrival: "2020-03-24T16:28:36Z", timeToStation: 175 };
const item5 = { direction: "inbound", vehicleId: "XXAA" };
const item6 = { direction: "inbound", vehicleId: "XXAA" };
const item7 = { direction: "inbound", vehicleId: "XXBB" };
const item8 = { direction: "inbound", vehicleId: "XXBB" };
const item9 = { direction: "outbound", vehicleId: "XXAA" };
const item10 = { direction: "outbound", vehicleId: "XXAA" };
const item11 = { direction: "outbound", vehicleId: "XXBB" };
const item12 = { direction: "outbound", vehicleId: "XXBB" };

const getState = ({
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

const bus1 = {
  expectedArrival: "2020-03-25T16:59:29Z",
  vehicleId: "LK65EBJ",
  direction: "outbound",
  timeToStation: 717
};

const formattedBus1 = {
  expectedArrival: "16:59",
  vehicleId: "LK65EBJ",
  direction: "outbound",
  timeToStation: 12
};

const bus2 = {
  expectedArrival: "2020-03-25T16:59:31Z",
  vehicleId: "LK65EAX",
  direction: "inbound",
  timeToStation: 719 
};

const formattedBus2 = {
  expectedArrival: "16:59",
  vehicleId: "LK65EAX",
  direction: "inbound",
  timeToStation: 12 
};

const bus3 = {
  expectedArrival: "2020-03-25T17:02:18Z",
  vehicleId: "LK65EAX",
  direction: "inbound",
  timeToStation: 886
};

const formattedBus3 = {
  expectedArrival: "17:02",
  vehicleId: "LK65EAX",
  direction: "inbound",
  timeToStation: 15
};

const bus4 = {
  expectedArrival: "2020-03-25T17:03:16Z",
  vehicleId: "LK65EBJ",
  direction: "outbound",
  timeToStation: 944
};

const formattedBus4 = {
  expectedArrival: "17:03",
  vehicleId: "LK65EBJ",
  direction: "outbound",
  timeToStation: 16
};

const bus5 = {
  expectedArrival: "2020-03-25T16:59:37Z",
  vehicleId: "LK65EBM",
  direction: "inbound",
  timeToStation: 725
};

const formattedBus5 = {
  expectedArrival: "16:59",
  vehicleId: "LK65EBM",
  direction: "inbound",
  timeToStation: 12
};

const bus6 = {
  expectedArrival: "2020-03-25T17:00:29Z",
  vehicleId: "LK65EBM",
  direction: "inbound",
  timeToStation: 777
};

const formattedBus6 = {
  expectedArrival: "17:00",
  vehicleId: "LK65EBM",
  direction: "inbound",
  timeToStation: 13
};

describe('compareBusTimes', () => {
  it('will return 1 when timeA is later than timeB', () => {
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    const timeA = {
      expectedArrival: "2020-03-24T16:45:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(1);
  });
  it('will return -1 when timeA is earlier than timeB', () => {
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    const timeA = {
      expectedArrival: "2020-03-24T16:15:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(-1);

  });
  it('will return 0 when timeA is equal to timeB', () => {
    const timeB = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    const timeA = {
      expectedArrival: "2020-03-24T16:30:36Z"
    };
    expect(compareBusTimes(timeA, timeB)).toEqual(0);
  });
});

describe('sortByDate', () => {
  it('will order an array of dates', () => {
    const times = [item1, item2, item3, item4];
    expect(sortByDate(times)).toEqual([item4, item3, item2, item1]);
  });
});

describe('limitToTimeFrame', () => {
  it('should only include times that are within the stated time frame', () => {
    const times = [item1, item2, item3, item4];
    expect(limitToTimeFrame(15)(times)).toEqual([item1, item2, item3, item4]);
  });
});

describe('formatTimes', () => {
  it('should format the arrival time to the format HH:MM', () => {
    const times = [item1, item2, item3, item4];
    const format1 = {expectedArrival: "16:35", timeToStation: 1739 };
    const format2 = {expectedArrival: "16:30", timeToStation: 1033 };
    const format3 = { expectedArrival: "16:29" , timeToStation: 1559 };
    const format4 = { expectedArrival: "16:28", timeToStation: 175 };
    expect(formatTimes(times)).toEqual([format1, format2, format3, format4]);
  });
});

describe('formatMinutes', () => {
  it('should format seconds to minutes rounding up', () => {
    const times = [item1, item2, item3, item4]; 
    const format1 = {expectedArrival: "2020-03-24T16:35:36Z", timeToStation: 29 };
    const format2 = {expectedArrival: "2020-03-24T16:30:36Z", timeToStation: 17 };
    const format3 = { expectedArrival: "2020-03-24T16:29:36Z", timeToStation: 26 };
    const format4 = { expectedArrival: "2020-03-24T16:28:36Z", timeToStation: 3 }
    expect(formatMinutes(times)).toEqual([format1, format2, format3, format4]);
  });
});

describe('filterAndGroup', () => {
  it('should filter by direction and group by vehicle license', () => {
    const buses = [item5, item6, item7, item8, item9, item10, item11, item12];
    const inboundBuses = {
      XXBB: [
        { direction: "inbound", vehicleId: "XXBB" },
        { direction: "inbound", vehicleId: "XXBB" }
      ],
      XXAA: [
        { direction: "inbound", vehicleId: "XXAA" },
        { direction: "inbound", vehicleId: "XXAA" }
      ]
    }
    const outboundBuses = {
      XXBB: [
        { direction: "outbound", vehicleId: "XXBB" },
        { direction: "outbound", vehicleId: "XXBB" }
      ],
      XXAA: [
        { direction: "outbound", vehicleId: "XXAA" },
        { direction: "outbound", vehicleId: "XXAA" }
      ]
    };
    expect(filterAndGroup("inbound", buses)).toEqual(inboundBuses);
    expect(filterAndGroup("outbound", buses)).toEqual(outboundBuses);
  });
});

describe('rootReducer', () => {
  describe('FETCH_USERS_START', () => {
    it('should set loadingUsers to true', () => {
      const state = getState();
      const expectedState = getState({loadingUsers:true});
      const action = getAction("FETCH_USERS_START");
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
  });
  describe('FETCH_USERS_SUCCESS', () => {
    it('should add users to the users array', () => {
      const state = getState();
      const expectedState = getState({users: [user1, user2, user3]});
      const action = getAction("FETCH_USERS_SUCCESS", [user1, user2, user3]); 
      expect(rootReducer(state, action)).toEqual(expectedState); 
    }); 
    it('should set loadingUsers to false', () => {
      const state = getState({users: [user1, user2, user3]});
      const expectedState = getState({users: [user1, user2, user3], loadingUsers: false});
      const action = getAction("FETCH_USERS_SUCCESS", [user1, user2, user3]); 
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
    it('should not remove users from the existing state', () => {
      const state = getState({users:  [user1, user2, user3] });
      const expectedState = getState({users: [user1, user2, user3, user4, user5], loadingUsers: false});
      const action = getAction("FETCH_USERS_SUCCESS", [user4, user5]);
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
    it('should only contain unique users', () => {
      const state = getState({users:  [user1, user2, user3] });
      const expectedState = getState({users: [user1, user2, user3, user4, user5], loadingUsers: false});
      const action = getAction("FETCH_USERS_SUCCESS",  [user1, user2, user3, user4, user5] );
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
  });
  describe('FETCH_USERS_START', () => {
    it('should set loadingUsers to false', () => {
      const state = getState();
      const expectedState = getState({loadingUsers:true});
      const action = getAction("FETCH_USERS_START");
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
  });
  describe('FETCH_USERS_FAILURE', () => {
    it('should set loadingUsers to false', () => {
      const state = getState();
      const expectedState = getState({loadingUsers: false, errorMessage: "Error message"});
      const action = getAction("FETCH_USERS_FAILURE", "Error message");
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
    it('should set errorMessage to error message', () => {
      const state = getState();
      const expectedState = getState({loadingUsers: false,errorMessage: "Error message"});
      const action = getAction("FETCH_USERS_FAILURE", "Error message");
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
  });
  describe('FETCH_BUSES_START', () => {
    it('should set loadingUsers to true', () => {
      const state = getState();
      const expectedState = getState({loadingBuses: true});
      const action = getAction("FETCH_BUSES_START");
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
  });
  describe('FETCH_BUSES_SUCCESS', () => {
    it('should sort the buses by date', () => { 
      const state = getState();
      const expectedState = getState({
        buses: {
          inbound: {
            "LK65EAX": [
              formattedBus2  
            ],
            "LK65EBM": [
              formattedBus5, formattedBus3
            ]
          }, 
          outbound: {
            "LK65EBJ": [
              formattedBus1, formattedBus4, formattedBus6
            ],
          }
        }
      });
      const action = getAction("FETCH_BUSES_SUCCESS", [bus1, bus2, bus3, bus4, bus5, bus6]);
      expect(rootReducer(state, action)).toEqual(expectedState); 
    });
    it('should limit the buses to a given time frame', () => { 
    });
    it('should format the time to HH:MM', () => { 
    });
    it('should format the minutes', () => { 
    });
    it('should add inbound buses to the buses array', () => { 
    });
    it('should add outbound buses to the buses array', () => { 
    });
    it('should group vehicle licenses together', () => { 
    });
  });
  describe('FETCH_BUSES_FAILURE', () => {
    it('should set loadingUsers to false', () => {
      const state = getState();
      const expectedState = getState({loadingBuses: false, errorMessage: "Error message"});
      const action = getAction("FETCH_BUSES_FAILURE", "Error message");
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
    it('should set errorMessage to error message', () => {
      const state = getState();
      const expectedState = getState({loadingBuses: false,errorMessage: "Error message"});
      const action = getAction("FETCH_BUSES_FAILURE", "Error message");
      expect(rootReducer(state, action)).toEqual(expectedState);
    });
  });
});