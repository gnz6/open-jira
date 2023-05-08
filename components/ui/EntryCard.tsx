import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { DragEvent, useContext } from "react";
import { UIContext } from '@/context/ui';
import styles from "./EntryList.module.css"
import { useRouter } from 'next/router';
import {getFormatToNow} from "../../utils/dateFunctions"

interface Props{
    entry: Entry
}


export const EntryCard = ({entry}: Props) => {

  const { startDragging, endDragging, isDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event : DragEvent) => {
    event.dataTransfer?.setData("text", entry._id)
    console.log(entry)
    startDragging()
  }

  const onDragEnd = () => {
    endDragging()
  }

  const onCLick=()=> {
    router.push(`/entrues/${entry._id}`)
  }


  return (
    <Card
    onClick={onCLick}
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
            <Typography variant='body2' > {getFormatToNow(entry.createdAt)}</Typography>

            </CardActions>
        </CardActionArea>
    </Card>
  )
}
