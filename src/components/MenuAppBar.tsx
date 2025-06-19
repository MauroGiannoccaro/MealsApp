import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, AccountCircle, Switch, FormControlLabel, FormGroup, MenuItem, Menu, Link, useNavigate, useContext, AuthContext, DefaultSidebar } from './menuAppBarImport';

export default function MenuAppBar() {

  const navigate = useNavigate();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  const { state, dispatch } = context;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (state.isLoggedin){
    setAuth(event.target.checked);
    dispatch({ type: 'LOGOUT' });
    }
    else{
      navigate('/');
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" sx={{ backgroundColor: '#CC7722' }}>
        <Toolbar>
          <DefaultSidebar />
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Meals App
            </Link>
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                  color="secondary"
                />
              }
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
