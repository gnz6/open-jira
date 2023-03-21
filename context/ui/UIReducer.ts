import { UiState } from "./UIProvider";


type UIType = 
  | { type : "UI - Open Sidebar"}
  | { type : "UI - Close Sidebar"}



export const uiReducer = ( state : UiState , action : UIType) : UiState => {

    switch (action.type ) {
        case "UI - Close Sidebar":
            return{
                ...state, sideMenuOpen: false
            }  
        case "UI - Open Sidebar":
            return{
                ...state, sideMenuOpen: true
            }
        default:
            return state;
    }

}