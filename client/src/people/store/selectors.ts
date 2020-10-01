import { RootState } from '../../store/store';
import { UserStatus } from "./user-state";

export const selectUserByStatus = (state: RootState, status: UserStatus) => {
  if (status === 0)
    return state.people.allIds.map(id => state.people.byId[id]);

  return state.people.allIds
    .filter(userId => state.people.byId[userId].status === status)
    .map(id => state.people.byId[id]);
}

export const selectUsers = (state: RootState) => {
  return state.people.allIds.map(id => state.people.byId[id]);
}

export const selectUser = (state: RootState, userId: string) => {
  return state.people.byId[userId];
}