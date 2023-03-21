import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard";
import { EntryStatus } from "@/interfaces/entry";
import { useContext, useMemo } from 'react';
import { EntriesContext } from '../entries/EntriesContext';

interface Props {
    status : EntryStatus
}


export const EntryList = ({status} : Props) => {

    const { entries } = useContext(EntriesContext);

    const filterStatus = useMemo( () =>  entries.filter( e => e.status === status) ,[entries] )
    
    



  return (
    <div >
        <Paper sx={{ height: "calc(100vh - 250px)" , overflow:"scroll", backgroundColor:"transparent"}}>
            <List sx={{opacity: 1 }}>
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
