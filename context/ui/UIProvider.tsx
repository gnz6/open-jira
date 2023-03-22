import { useReducer } from "react"
import { UIContext } from "./UIContext"
import { uiReducer } from "./UIReducer"
import React from 'react';


export interface UiState{
    sideMenuOpen : boolean,
    isAddingEntry : boolean
}

interface Props {
    children? : React.ReactNode
}


const UiInitialState : UiState = {
    sideMenuOpen : false,
    isAddingEntry : false

}

export const UiProvider = ({children} : Props  ) => {


    const [state, dispatch] = useReducer (uiReducer , UiInitialState)



    const openSideBar = () => {
        dispatch({type: "UI - Open Sidebar"})
    }

    
    const closeSideBar = () => {
        dispatch({type: "UI - Close Sidebar"})
    }

    const setIsAddingEntry = (isAdding : boolean) => {
      dispatch({type : "UI - Is Adding", payload: isAdding})
        
    }


    return (
        <UIContext.Provider value={{...state , openSideBar , closeSideBar, setIsAddingEntry}}> 
            {children}
        </UIContext.Provider>
    )
}