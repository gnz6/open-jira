import React, { useReducer } from 'react';
import { entriesReducer } from "./entriesReducer";
import { EntriesContext } from "./EntriesContext";
import { Entry } from '@/interfaces/entry';
import {v4 as uuidv4} from "uuid"
import { useEffect } from 'react';
import entriesApi from '../../apis/entriesApi';


export interface entriesState{
    entries : Entry[]
}

interface Props {
    children? : React.ReactNode
}

const entriesInitialState : entriesState = {
    entries: [
        
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

    const refreshEntries =async() => {
        const {data} = await entriesApi.get<Entry[]>("/entries")
        dispatch({type:"[Entry] Initial-Entries", payload:data})
    }

    useEffect(()=>{
        refreshEntries();
    },[])


    return (
        <EntriesContext.Provider value={{...state, addEntry : addNewEntry , updateEntry}}> 
            {children}
        </EntriesContext.Provider>
    )
}