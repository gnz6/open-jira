import { useContext } from "react";
import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UIContext } from "@/context/ui";
import NextLink from "next/link";

export const Navbar = () => {
  const { sideMenuOpen, openSideBar, closeSideBar } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={() => openSideBar()}>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href={"/"} passHref>
          <Link underline="none" color={"white"}>
            <Typography variant="h5">Open Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
