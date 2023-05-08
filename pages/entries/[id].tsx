import { Layout } from '@/components/layouts/Layout';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize } from '@mui/material';
import React ,{ useMemo, useState }from 'react'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Entry, EntryStatus } from '@/interfaces/entry';
import { ChangeEvent, useContext } from 'react';
import {getFormatToNow} from "../../utils/dateFunctions"

const validStatus: EntryStatus[] = ["pending", "in-progress", "completed"];

interface Props{
 entry : Entry
}

export const EntryPage = (props: Props) => {

    const { updateEntry } = useContext(EntriesContext);

    const [inputValue, setInputValue] = useState(props.entry.description);
    const [status, setStatus] = useState<EntryStatus>(props.entry.status);
    const [touched, setTouched] = useState(false);
    const isNotValid = useMemo(()=> inputValue.length<=0 && touched, [inputValue, touched])

const onInputChange = (event: ChangeEvent<HTMLInputElement>)=>{
    setInputValue( event.target.value);
}

const onStatusChange =(event :  ChangeEvent<HTMLInputElement>)=> {
setStatus(event.target.value as EntryStatus)
}

const onSave=()=> {
    if( inputValue.trim().length == 0) return
    const updatedEntry: Entry = {
        ...props.entry,
        status, description: inputValue
    }
    updateEntry(updatedEntry, true);
}

  return (
    <Layout title={inputValue.substring(0,12)+ "..." }>
        <Grid container
        justifyContent={"center"}
        sx={{marginTop:2}}
        >
            <Grid
            item xs={12} sm={8} md={6}
            >
                <Card>
                    <CardHeader
                    title={`Entry: ${inputValue}`}
                    subheader={`Created at: ${getFormatToNow(props.entry.createdAt)}`}
                    />
                    <CardContent>
                        <TextField
                        sx={{marginTop:2, marginBottom:1}}
                        fullWidth
                        placeholder='New entry'
                        autoFocus
                        multiline
                        label="New entry"
                        value={inputValue}
                        onChange={onInputChange}
                        helperText={ isNotValid && "Insert a value"}
                        onBlur={()=>setTouched(true)}
                        error={ isNotValid }
                        />
                        {/* RADIO */}
                        <FormControl>
                            <FormLabel>
                                Status
                            </FormLabel>
                        <RadioGroup
                        row
                        value={status}
                        onChange={onStatusChange}
                        >
                            {
                                validStatus.map(option => (
                                    <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio/>}
                                    label={capitalize(option)}
                                    >
                                        
                                    </FormControlLabel>
                                ))
                            }
                        </RadioGroup>



                        </FormControl>
                    
                    
                    </CardContent>
                <CardActions>
                    <Button
                    startIcon={<SaveAsOutlinedIcon/>}
                    variant='contained'
                    fullWidth
                    onClick={onSave}
                    disabled={ inputValue.length <=0  }

                    >
                        Save
                    </Button>
                </CardActions>

                </Card>

            </Grid>
        </Grid>

        <IconButton
        sx={{
            position:"fixed",
            bottom:30,
            right:30,
            backgroundColor:"error.dark"
        }}
        >
            <DeleteForeverOutlinedIcon/>
        </IconButton>

    </Layout>
  )
}


import { GetServerSideProps } from 'next'
import mongoose from 'mongoose';
import {getEntryById} from "../../database/dbEntries"
import { EntriesContext } from '@/context/entries/EntriesContext';

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { id }= ctx.params as {id: string};
    const entry = await getEntryById( id );
    

    if( !entry ){
        return {
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }


    return {
        props: {
            entry        
        }
    }
}




export default EntryPage;