import { NormalizedObjects } from "../../../store/normalized-objects";
import { MealsActions, MealsActionTypes } from "../../meals/store/actions";
import { CateringActions, CateringActionsType } from "./actions";

export interface Catering {
  id: string,
  name: string,
  phoneNumber: string,
  description: string,
  meals: string[]
}

interface CateringState extends NormalizedObjects<Catering> { }

const initialState: CateringState = {
  byId: {},
  allIds: []
}

function reducer(state = initialState, action: CateringActions | MealsActions): CateringState {
  switch (action.type) {
    case CateringActionsType.LOAD_CATERINGS_SUCCESS: {
      return { ...state, ...action.caterings }
    }
    case CateringActionsType.LOAD_CATERING_SUCCESS: {
      return {
        ...state,
        allIds: state.allIds.includes(action.catering.id) ?
          state.allIds : [...state.allIds, action.catering.id],
        byId: {
          ...state.byId,
          [action.catering.id]: action.catering
        }
      }
    }
    case CateringActionsType.ADD_CATERING_SUCCESS: {
      return {
        ...state,
        allIds: [...state.allIds, action.catering.id],
        byId: {
          ...state.byId,
          [action.catering.id]: action.catering
        }
      }
    }
    case MealsActionTypes.ADD_MEAL_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.meal.catering]: {
            ...state.byId[action.meal.catering],
            meals: [...state.byId[action.meal.catering].meals, action.meal.id]
          }
        }
      }
    }
    default: return state;
  }
}

export { reducer as CateringReducer };

