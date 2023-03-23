import { entriesState } from "./EntriesProvider";
import { Entry } from "../../interfaces/entry";

type EntriesType =
  | { type: "[Entry] Add-Entry"; payload: Entry }
  | { type: "[Entry] Update-Entry"; payload: Entry };

export const entriesReducer = (
  state: entriesState,
  action: EntriesType
): entriesState => {
  switch (action.type) {
    case "[Entry] Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entry] Update-Entry":
      return {
        ...state,
        entries: state.entries.map((e) => {
          if (e._id == action.payload._id) {
            e.status = action.payload.status;
            e.description = action.payload.description;
          }
          return e;
        }),
      };

    default:
      return state;
  }
};
