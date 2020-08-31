import { ActivityActions, ActivityActionTypes } from '../activities/store/actions';
import { PersonsActions, PersonsActionTypes } from './actions';
import { Person } from './person-state';

export interface PersonState extends Person {
  isDialogOpen: boolean
}

const initialState: PersonState = {
  id: "",
  fullName: "",
  position: "",
  status: 0,
  imageSrc: "",
  birthDate: "",
  homeAddress: "",
  enrolmentDate: "",
  email: "",
  phone: "",
  salary: 0,
  isDialogOpen: false
};

function reducer(state = initialState, action: PersonsActions | ActivityActions): PersonState {
  switch (action.type) {
    case PersonsActionTypes.GET_PERSON_SUCCESS: {
      return { ...state, ...action.person }
    }
    case PersonsActionTypes.UPDATE_PERSON_SUCCESS: {
      return { ...state, ...action.person }
    }
    case ActivityActionTypes.ADD_ACTIVITY_SUCCESS: {
      return { ...state, ...action.person }
    }
    case ActivityActionTypes.UPDATE_ACTIVITY_SUCCESS: {
      return { ...state, ...action.person }
    }
    case PersonsActionTypes.CHANGE_DIALOG_STATE: {
      return { ...state, isDialogOpen: !state.isDialogOpen }
    }
    default: return state;
  }
}

export { reducer as PersonsReducer };

