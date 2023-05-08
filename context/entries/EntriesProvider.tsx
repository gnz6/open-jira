import React, { useReducer } from 'react';
import { entriesReducer } from "./entriesReducer";
import { EntriesContext } from "./EntriesContext";
import { Entry } from '@/interfaces/entry';
import { useEffect } from 'react';
import entriesApi from '../../apis/entriesApi';
import { EntryStatus } from '../../interfaces/entry';
import {useSnackbar} from "notistack"

export interface entriesState{
    entries : Entry[]
}

interface Props {
    children? : React.ReactNode
}

const entriesInitialState : entriesState = {
    entries: []
}

export const EntriesProvider = ({children} : Props  ) => {
    
    const [state, dispatch] = useReducer (entriesReducer , entriesInitialState)
    const {enqueueSnackbar} = useSnackbar();

    const addNewEntry = async(description : string , status : EntryStatus = "pending") => {

            const {data} = await entriesApi.post<Entry>("/entries", {description}); 
            console.log(data);
            
            dispatch({type:"[Entry] Add-Entry", payload: data})

    }


    const getEntry = async({_id} : Entry) => {  
        try {
            const {data} = await entriesApi.get<Entry>(`/entries/${_id}`)   
            dispatch({type:"[Entry] Update-Entry", payload : data})
            
        } catch (error) {
            console.log(error)
        }
    }


    const updateEntry = async(entry : Entry, showSnackbar = false) => {  
        try {
            const {_id, description, status} = entry
            const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status})   
            dispatch({type:"[Entry] Update-Entry", payload : data})

            // SnackBar
            if(showSnackbar){
                enqueueSnackbar( " Entry-Updated",{
                    variant:"success",
                    autoHideDuration: 1500,
                    anchorOrigin:{
                        vertical:"top",
                        horizontal:"right"
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
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