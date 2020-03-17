import { FETCH_USERS_START } from "../constants/action-types";

export function getUsers() {
  return { type: FETCH_USERS_START };
}