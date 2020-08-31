import { UserMenuActions, UserMenuActionTypes } from "./actions";

export interface UserMenuState {
  imageSrc: string,
  fullName: string,
  position: string
}

const initialState: UserMenuState = {
  fullName: "",
  imageSrc: "",
  position: ""
}

function reducer(state = initialState, action: UserMenuActions): UserMenuState {
  switch (action.type) {
    case UserMenuActionTypes.LOAD_USER_SUCCESS: {
      return { ...action.user }
    }

    default: return state;
  }
}

export { reducer as UserMenuReducer };

