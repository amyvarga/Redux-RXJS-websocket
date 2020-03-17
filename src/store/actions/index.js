import { FETCH_USERS_START, FETCH_BUSES_START } from "../constants/action-types";

export function getUsers() {
  return { type: FETCH_USERS_START };
}

export function getBuses() {
  return { type: FETCH_BUSES_START };
}