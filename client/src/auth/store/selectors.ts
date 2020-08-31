import { RootState } from "../../store/store";

export function selectLoggedUserName(state: RootState) {
  return state.auth.loggedUserName.split(" ")[0];
}