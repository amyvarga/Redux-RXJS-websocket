import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "../constants/action-types";

const initialState = {
  loadingUsers: false,
  errorMessage: null,
  users: []
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
      console.log(action.payload);
      return Object.assign({}, state, {
        errorMessage: action.payload,
        loadingUsers: false
      });
    default:
      return state;
  }
}

export default rootReducer;