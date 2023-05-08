import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard";
import { Entry, EntryStatus } from "@/interfaces/entry";
import { useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { DragEvent } from "react";
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    status : EntryStatus
}


export const EntryList = ({status} : Props) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const filterStatus = useMemo( () =>  entries.filter( e => e.status === status) ,[entries, status] )
    
    
    const onDropEntry =(event : DragEvent) => {
        const id = event.dataTransfer.getData("text")
        const entry : Entry = entries.find( e => e._id === id)!;
        
        entry.status = status;
        console.log(entry.status, "entry-status");
        updateEntry(entry)
        endDragging();
    }

    const allowDrop = (event : DragEvent)=> {
        event.preventDefault();

    }


  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} >
        <Paper sx={{ height: "calc(100vh - 250px)" , overflow:"scroll", backgroundColor:"transparent"}}>
            <List sx={{opacity: isDragging? 1.6 : 1 , transition:"all .2s"}}>
                {
                    filterStatus.map( entry => (
                        <EntryCard key={entry._id} entry= {entry}/>

                    ))
                }
            </List>
        </Paper>
    </div>
  )
}
