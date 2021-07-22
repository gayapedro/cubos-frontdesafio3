import useAuth from '../../hooks/useAuth';
import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import useStyles from './style';
import { useHistory, useLocation } from 'react-router-dom';

function NavBar() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const { deslogar } = useAuth();

  const handleLogout = () => {
    deslogar();
  };

  return (
    <AppBar className={classes.navbar}>
      <Toolbar className={classes.toolbar}>
        <img
          onClick={() => history.push('/produtos')}
          className={
            location.pathname.includes('produtos')
              ? classes.iconeHome
              : classes.icone
          }
          src={
            location.pathname.includes('produtos')
              ? `${process.env.PUBLIC_URL}/assets/storeselected.svg`
              : `${process.env.PUBLIC_URL}/assets/store.svg`
          }
          alt='Produtos'
        />
        <img
          onClick={() => history.push('/perfil')}
          className={
            location.pathname.includes('perfil')
              ? classes.iconeHome
              : classes.icone
          }
          src={
            location.pathname.includes('perfil')
              ? `${process.env.PUBLIC_URL}/assets/userselected.svg`
              : `${process.env.PUBLIC_URL}/assets/user.svg`
          }
          alt='Perfil'
        />
        <img
          onClick={handleLogout}
          className={classes.icone}
          src={`${process.env.PUBLIC_URL}/assets/close.svg`}
          alt='Logout'
        />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
