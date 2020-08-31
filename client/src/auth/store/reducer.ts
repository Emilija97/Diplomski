import { getItemFromLocalStorage, USER_DATA_KEY } from "../../services/local-storage.service";
import { UserMenuActions, UserMenuActionTypes } from "../../user-menu/store";
import { AuthActions, AuthActionTypes } from "./actions";
import { AuthState, UserType } from "./auth-state";
import { UserCredentials } from "./effects";

const initialState: AuthState = {
  loggedUserId: "",
  loggedUserType: UserType.GUEST,
  error: false,
  loggedUserName: ""
}

function reducer(state = initialState, action: AuthActions | UserMenuActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedUserId: action.id,
        loggedUserType: action.userType,
        loggedUserName: action.fullName,
        error: false
      }
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return { ...state, error: true }
    }
    case UserMenuActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        loggedUserId: "",
        loggedUserType: UserType.GUEST,
        loggedUserName: "",
        error: false
      }
    }
    default: {
      const userCredentials = getItemFromLocalStorage<UserCredentials>(USER_DATA_KEY);
      if (userCredentials != null) {
        return {
          ...state,
          loggedUserId: userCredentials.id,
          loggedUserType: userCredentials.type,
          loggedUserName: userCredentials.fullName,
        }
      }
      else return state;
    };
  }
}

export { reducer as AuthReducer };

