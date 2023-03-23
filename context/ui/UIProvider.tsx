import { useReducer } from "react"
import { UIContext } from "./UIContext"
import { uiReducer } from "./UIReducer"
import React from 'react';


export interface UiState{
    sideMenuOpen : boolean,
    isAddingEntry : boolean,
    isDragging: boolean
}

interface Props {
    children? : React.ReactNode
}


const UiInitialState : UiState = {
    sideMenuOpen : false,
    isAddingEntry : false,
    isDragging : false

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

      const startDragging = () => {
        dispatch({type :  "UI - Start Dragging"})
          
      }

      const endDragging = () => {
        dispatch({type : "UI - End Dragging"})
          
      }


    return (
        <UIContext.Provider value={{...state , openSideBar , closeSideBar, setIsAddingEntry , startDragging, endDragging}}> 
            {children}
        </UIContext.Provider>
    )
}