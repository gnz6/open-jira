
import { createContext } from 'react';

export interface UIContextProps{
    sideMenuOpen : boolean,    
    openSideBar:() => void,
    closeSideBar:() => void,
    isAddingEntry : boolean,
    setIsAddingEntry : (isAdding : boolean) => void
}


export const UIContext = createContext({} as UIContextProps)

