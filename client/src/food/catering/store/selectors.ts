import { RootState } from "../../../store/store";
import { Catering } from "./reducer";

export const selectCaterings = (state: RootState): Catering[] => {
  return state.caterings.allIds.map(catering => state.caterings.byId[catering]);
}

export const selectCatering = (state: RootState, id: string): Catering => {
  return state.caterings.byId[id];
}