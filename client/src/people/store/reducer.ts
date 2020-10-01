import { UserType } from "../../auth/store";
import { PersonsActions, PersonsActionTypes } from "../../employee/store/actions";
import { NormalizedObjects } from "../../store/normalized-objects";
import { PeopleActions, PeopleActionTypes } from "./actions";
import { User, UserStatus } from "./user-state";

export interface PeopleState extends NormalizedObjects<User> {
  page: number,
  limit: number,
  selectedTab: UserStatus,
  errorMessage: string,
  success: boolean
}

const initialState: PeopleState = {
  allIds: [],
  byId: {},
  page: 1,
  limit: 10,
  selectedTab: 0,
  errorMessage: "",
  success: false
};

function reducer(state = initialState, action: PeopleActions | PersonsActions): PeopleState {
  switch (action.type) {
    case PeopleActionTypes.ADD_USERS_SUCCESS: {
      return {
        ...state,
        allIds: Array.from(new Set([...state.allIds, ...action.users.allIds])) as string[],
        byId: {
          ...state.byId,
          ...action.users.byId
        }
      };
    }
    case PeopleActionTypes.ADD_USER_SUCCESS: {
      return {
        ...state,
        allIds: Array.from(new Set([...state.allIds, action.user])) as string[],
        byId: {
          ...state.byId,
          [action.user.id]: action.user
        }
      }
    }
    case PeopleActionTypes.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        allIds: action.users.allIds,
        byId: action.users.byId,
        page: 1
      }
    }
    case PeopleActionTypes.LOAD_USERS_BY_NAME_SUCCESS: {
      return {
        ...state,
        allIds: action.users.allIds,
        byId: action.users.byId,
        page: 1
      }
    }
    case PeopleActionTypes.DELETE_USERS_SUCCESS: {
      let users = { ...state.byId };
      action.ids.forEach(id => delete users[id]);
      return {
        ...state,
        byId: users,
        allIds: state.allIds.filter(element => !action.ids.includes(element))
      };
    }
    case PeopleActionTypes.ARCHIVE_USERS_SUCCESS: {
      let newState = { ...state };

      action.ids.forEach(id => {
        newState = {
          ...newState,
          byId: {
            ...newState.byId,
            [id]: {
              ...newState.byId[id],
              status: UserStatus.ARCHIVED
            }
          }
        }
      });
      return newState;
    }
    case PeopleActionTypes.INCREMENT_PAGE: {
      return { ...state, page: state.page + 1 }
    }
    case PeopleActionTypes.RESET_PAGE: {
      return { ...state, page: 1 }
    }
    case PeopleActionTypes.CLEAR: {
      return initialState;
    }
    case PeopleActionTypes.SET_SELECTED_TAB: {
      return {
        ...state, selectedTab: action.selectedTab
      }
    }
    case PeopleActionTypes.ADD_NEW_PERSON_SUCCESS: {
      console.log(action.person);
      return {
        ...state,
        errorMessage: "",
        success: true,
        allIds: [...state.allIds, action.person.id],
        byId: {
          ...state.byId,
          [action.person.id]: {
            fullName: action.person.fullName,
            id: action.person.id,
            imageSrc: action.person.imageSrc,
            position: action.person.position,
            status: action.person.status,
            type: (UserType.EMPLOYEE)
          }
        }
      }
    }

    case PersonsActionTypes.UPDATE_PERSON_SUCCESS: {
      return { ...state, ...action.person, success: true }
    }

    case PeopleActionTypes.ADD_NEW_PERSON_FAILURE: {
      return { ...state, errorMessage: action.errorMessage, success: false };
    }

    case PeopleActionTypes.GET_HIRED_USERS_SUCCESS: {
      state = initialState;
      return {
        ...state,
        allIds: Array.from(new Set([...state.allIds, ...action.users.allIds])) as string[],
        byId: {
          ...state.byId,
          ...action.users.byId
        }
      };
    }

    default: return state;
  }
}

export { reducer as PeopleReducer };

