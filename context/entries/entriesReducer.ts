import { entriesState } from "./EntriesProvider";
import { Entry } from '../../interfaces/entry';


type EntriesType = 
  | { type : "[Entry] Add-Entry", payload: Entry}
  



export const entriesReducer = ( state : entriesState , action : EntriesType) : entriesState => {

    switch (action.type ) {
        case "[Entry] Add-Entry":
          return{
            ...state,
            entries : [...state.entries, action.payload]
          }

        default:
            return state;
    }

}