
import { createContext } from 'react';

export interface UIContextProps{
    sideMenuOpen : boolean,    
    openSideBar:() => void,
    closeSideBar:() => void
}


export const UIContext = createContext({} as UIContextProps)

