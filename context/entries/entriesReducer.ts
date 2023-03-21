import { entriesState } from "./EntriesProvider";


type EntriesType = 
  | { type : "Entries - Open Sidebar"}
  



export const entriesReducer = ( state : entriesState , action : EntriesType) : entriesState => {

    switch (action.type ) {
        
        default:
            return state;
    }

}