import { useContext } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '@/context/ui';
import { UIContextProps } from '../../context/ui/UIContext';



export const Navbar = () => {
  const { sideMenuOpen, openSideBar, closeSideBar } = useContext(UIContext)
  

  return (

   <AppBar position="sticky" >
        <Toolbar>
            <IconButton size="large" edge="start" onClick={()=> openSideBar()}>
                <MenuOutlinedIcon/>
            </IconButton>
            <Typography variant='h5'>Open Jira</Typography>
        </Toolbar>

   </AppBar>
   
  )
}
