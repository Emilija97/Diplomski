import { NormalizedObjects } from '../../../store/normalized-objects';
import { ActivityActions, ActivityActionTypes } from './actions';
import { Activity } from './activities-state';

export interface ActivitiesState extends NormalizedObjects<Activity> {
}

const initialState: ActivitiesState = {
  allIds: [],
  byId: {}
};

function reducer(state = initialState, action: ActivityActions): ActivitiesState {
  switch (action.type) {
    case ActivityActionTypes.LOAD_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        allIds: Array.from(new Set([...state.allIds, ...action.activities.allIds])) as string[],
        byId: {
          ...state.byId,
          ...action.activities.byId
        }
      };
    }
    case ActivityActionTypes.ADD_ACTIVITY_SUCCESS: {
      return {
        ...state,
        allIds: [...state.allIds, action.activity.id],
        byId: {
          ...state.byId,
          [action.activity.id]: action.activity
        }
      }
    }
    case ActivityActionTypes.UPDATE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.activity.id]: action.activity
        }
      }
    }
    case ActivityActionTypes.DELETE_ACTIVITY_SUCCESS: {
      let activities = { ...state.byId };
      delete activities[action.id];
      return {
        ...state,
        byId: activities,
        allIds: state.allIds.filter(activity => !action.id.includes(activity))
      };
    }
    case ActivityActionTypes.CLEAR: {
      return initialState;
    }
    default: return state;
  }
}

export { reducer as ActivityReducer };

