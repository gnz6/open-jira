import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';

export interface ContextProps{
    entries: Entry[]
    addEntry : (description : string) => void;
    updateEntry : (entry : Entry, showSnackBar: boolean) => void;
}


export const EntriesContext = createContext({} as ContextProps)