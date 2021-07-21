import useAuth from '../../hooks/useAuth';
import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import useStyles from './style';
import { useHistory, useLocation } from 'react-router-dom';
import store from '../../assets/store.svg';
import profile from '../../assets/user.svg';
import storeSelected from '../../assets/store-selected.svg';
import profileSelected from '../../assets/user-selected.svg';
import close from '../../assets/close.svg';

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
          className={classes.iconeHome}
          src={location.pathname.includes('produtos') ? storeSelected : store}
          alt='Produtos'
        />
        <img
          onClick={() => history.push('/perfil')}
          className={classes.icone}
          src={location.pathname.includes('perfil') ? profileSelected : profile}
          alt='Perfil'
        />
        <img
          onClick={handleLogout}
          className={classes.icone}
          src={close}
          alt='Logout'
        />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
