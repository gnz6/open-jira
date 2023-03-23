import React, { useReducer } from 'react';
import { entriesReducer } from "./entriesReducer";
import { EntriesContext } from "./EntriesContext";
import { Entry } from '@/interfaces/entry';
import {v4 as uuidv4} from "uuid"


export interface entriesState{
    entries : Entry[]
}

interface Props {
    children? : React.ReactNode
}

const entriesInitialState : entriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: "asdasd",
            status: "pending",
            createdAt : Date.now()
        },
        {
            _id: uuidv4(),
            description: "qweqweqwe",
            status: "completed",
            createdAt : Date.now()-100000
        },
        {
            _id: uuidv4(),
            description: "zxczxc",
            status: "in-progress",
            createdAt : Date.now() -100000000
        }
    ]
}

export const EntriesProvider = ({children} : Props  ) => {
    
    const [state, dispatch] = useReducer (entriesReducer , entriesInitialState)

    const addNewEntry = (description : string) => {
        const newEntry : Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status:"pending"
        }
        dispatch({type:"[Entry] Add-Entry", payload: newEntry})
    }


    const updateEntry = (entry : Entry) => {
        dispatch({type:"[Entry] Update-Entry", payload : entry})
    }

    return (
        <EntriesContext.Provider value={{...state, addEntry : addNewEntry , updateEntry}}> 
            {children}
        </EntriesContext.Provider>
    )
}