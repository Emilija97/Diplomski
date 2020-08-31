import { RootState } from "../../../store/store";
import { Activity } from "./activities-state";


export const selectActivities = (state: RootState) => {
  return state.activities.allIds.map(id => state.activities.byId[id]);
}

export const selectActivityById = (activities: Activity[], id: string): Activity | undefined => {
  return activities.find(activity => activity.id === id);
}