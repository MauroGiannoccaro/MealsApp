import { IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const DefaultSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  const { state} = context;
  console.log("state sidebar", state);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Meals List', path: '/Meals' },
    state.isLoggedin ? { text: 'Add Meals', path: '/addMeals' } : {text: 'Add Meals*'},
    { text: 'About', path: '/about' },
  ];

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              onClick={toggleDrawer(false)}
              component={Link}
              to={item.path || '/'}
            >
              <ListItemText secondary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default DefaultSidebar;
