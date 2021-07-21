import useAuth from '../../hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Store from '../../assets/store.svg';
import User from '../../assets/user-selected.svg';
import Close from '../../assets/close.svg';
import useStyles from './style';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Perfil() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { token, deslogar } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const id = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [error]);

  const fetchUserInfo = async () => {
    setLoading(true);
    setErrorMessage('');
    setError(false);
    try {
      const response = await fetch(
        'http://cubosdesafio3.herokuapp.com/perfil',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        setLoading(false);
        setErrorMessage('Erro ao buscar informações sobre o usuário.');
        setError(true);
        return;
      }
      const dados = await response.json();
      setUser(dados);
    } catch (error) {
      setErrorMessage('Erro ao buscar informações sobre o usuário.');
      setError(true);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    deslogar();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <React.Fragment>
      <AppBar className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <img
            onClick={() => history.push('/produtos')}
            className={classes.icone}
            src={Store}
            alt='Produtos'
          />
          <img
            onClick={() => history.push('/perfil')}
            className={classes.iconeHome}
            src={User}
            alt='Perfil'
          />
          <img
            onClick={handleLogout}
            className={classes.icone}
            src={Close}
            alt='Logout'
          />
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <div className={classes.text}>
          <Typography variant='h3'>{user.nome_loja}</Typography>
          <Typography variant='h4'>Perfil</Typography>
        </div>
        {user && (
          <div className={classes.bodyEdit}>
            <form className={classes.form} noValidate autoComplete='off'>
              <TextField
                value={user.nome}
                defaultValue='nome'
                fullWidth
                id='standard-basic'
                label='Seu nome'
              />
              <TextField
                value={user.nome_loja}
                defaultValue='nome_loja'
                fullWidth
                id='standard-basic'
                label='Nome da loja'
              />
              <TextField
                value={user.email}
                defaultValue='email'
                fullWidth
                id='standard-basic'
                label='E-mail'
              />
            </form>
            <div className={classes.buttons}>
              <Button
                onClick={() => history.push('/perfil/editar')}
                variant='contained'
                color='primary'
              >
                editar perfil
              </Button>
            </div>
          </div>
        )}

        <div className={classes.line}></div>
      </main>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Snackbar open={error} autoHideDuration={1000}>
        <MuiAlert elevation={6} variant='filled' severity='error'>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Perfil;
