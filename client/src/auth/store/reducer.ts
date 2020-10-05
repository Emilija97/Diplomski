import { User } from "../../people/store";
import { getItemFromLocalStorage, removeItemFromLocalStorage, USER_DATA_KEY } from "../../services/local-storage.service";
import { UserMenuActions, UserMenuActionTypes } from "../../user-menu/store";
import { AuthActions, AuthActionTypes } from "./actions";
import { AuthState, UserType } from "./auth-state";

const initialState: AuthState = {
  loggedUserId: "",
  loggedUserType: UserType.GUEST,
  error: false,
  loggedUserName: "",
  message: ""
}

function reducer(state = initialState, action: AuthActions | UserMenuActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedUserId: action.id,
        loggedUserType: action.userType,
        loggedUserName: action.fullName,
        error: false,
        message: action.userType === UserType.GUEST ? "You need to wait for user access confirmation." : ""
      }
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return { ...state, error: true, message: "" }
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
    case AuthActionTypes.SIGN_UP_SUCCESS: {
      console.log(action.message)
      return {
        ...state,
        message: action.message,
        error: false
      }
    }
    case AuthActionTypes.SIGN_UP_FAILURE: {
      return { ...state, error: true }
    }
    default: {
      const userCredentials = getItemFromLocalStorage<User>(USER_DATA_KEY);
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

