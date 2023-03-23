import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { DragEvent, useContext } from "react";
import { UIContext } from '@/context/ui';
import styles from "./EntryList.module.css"

interface Props{
    entry: Entry
}


export const EntryCard = ({entry}: Props) => {

  const { startDragging, endDragging, isDragging } = useContext(UIContext);

  const onDragStart = (event : DragEvent) => {
    event.dataTransfer?.setData("text", entry._id)
    startDragging()
  }

  const onDragEnd = () => {
    endDragging()
  }


  return (
    <Card
    sx={{marginBottom: 1}}
    draggable
    onDragStart={ onDragStart }
    onDragEnd={ onDragEnd }
    className={ isDragging ? styles.dragging : "" }
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
