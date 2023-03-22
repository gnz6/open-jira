import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { DragEvent } from "react";

interface Props{
    entry: Entry
}


export const EntryCard = ({entry}: Props) => {


  const onDragStart = (event : DragEvent) => {
    event.dataTransfer?.setData("text", entry._id)
  }

  const onDragEnd = () => {
    
  }


  return (
    <Card
    sx={{marginBottom: 1}}
    draggable
    onDragStart={ onDragStart }
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace:"pre-line", padding:"2px 5px"}}> {entry.description}</Typography>
            </CardContent>

            <CardActions sx={{display:"flex", justifyContent:"end", paddingRight:2}}>
            <Typography variant='body2' > {entry.createdAt}</Typography>

            </CardActions>
        </CardActionArea>
    </Card>
  )
}
