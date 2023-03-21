import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useContext, useReducer } from 'react';
import { UIContext } from "@/context/ui";
import { uiReducer } from '../../context/ui/UIReducer';

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {


  const { sideMenuOpen, closeSideBar } =  useContext(UIContext)


  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={() => closeSideBar()}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon />
              {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon />
              {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
