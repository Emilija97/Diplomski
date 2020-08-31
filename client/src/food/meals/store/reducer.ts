import { NormalizedObjects } from "../../../store/normalized-objects";
import { MealsActions, MealsActionTypes } from "./actions";
import { Meal } from "./meal-types";

const initialState: NormalizedObjects<Meal> = {
  byId: {},
  allIds: []
}

function reducer(state = initialState, action: MealsActions): NormalizedObjects<Meal> {
  switch (action.type) {
    case MealsActionTypes.LOAD_MEALS_SUCCESS: {
      return {
        ...state,
        allIds: Array.from(new Set([...state.allIds, ...action.meals.allIds])) as string[],
        byId: {
          ...state.byId,
          ...action.meals.byId
        }
      }
    }
    case MealsActionTypes.DELETE_MEALS_SUCCESS: {
      let meals = { ...state.byId };
      action.ids.forEach(id => delete meals[id]);
      return {
        ...state,
        byId: meals,
        allIds: state.allIds.filter(meal => !action.ids.includes(meal))
      };
    }
    case MealsActionTypes.LOAD_MEAL_SUCCESS: {
      return {
        ...state,
        allIds: Array.from(new Set([...state.allIds, action.meal.id])) as string[],
        byId: {
          ...state.byId,
          [action.meal.id]: action.meal
        }
      }
    }
    case MealsActionTypes.ADD_MEAL_SUCCESS: {
      return {
        ...state,
        allIds: [...state.allIds, action.meal.id],
        byId: {
          ...state.byId,
          [action.meal.id]: action.meal
        }
      }
    }
    case MealsActionTypes.UPDATE_MEAL_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.meal.id]: action.meal
        }
      }
    }
    default: return state;
  }
}

export { reducer as MealsReducer };

