import useAuth from '../../hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './style';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function EditarPerfil() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { token, deslogar } = useAuth();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  useEffect(() => {
    const id = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [error]);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2((prevValue) => !prevValue);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const fetchUserInfo = async () => {
    //não era necessário carregar as infos
    //mas eu achei mais bonitinho, a api
    //aceita mudar apenas 1 informação
    setLoading(true);
    setErrorMessage('');
    setError(false);
    try {
      const response = await fetch(
        'https://cubosdesafio3.herokuapp.com/perfil',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        setLoading(false);
        setErrorMessage('Erro ao buscar informações do usuário.');
        setError(true);
        return;
      }
      const dados = await response.json();
      setUser(dados);
    } catch (error) {
      setErrorMessage('Erro ao buscar informações do usuário.');
      setError(true);
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    setError(false);
    try {
      const response = await fetch(
        'https://cubosdesafio3.herokuapp.com/perfil',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        setLoading(false);
        setErrorMessage('Erro ao editar perfil.');
        setError(true);
        return;
      }
      history.push('/perfil');
    } catch (error) {
      setErrorMessage('Erro ao editar perfil.');
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
            src={process.env.PUBLIC_URL + '/store.svg'}
            alt='Produtos'
          />
          <img
            onClick={() => history.push('/perfil')}
            className={classes.iconeHome}
            src={process.env.PUBLIC_URL + '/user-selected.svg'}
            alt='Perfil'
          />
          <img
            onClick={handleLogout}
            className={classes.icone}
            src={process.env.PUBLIC_URL + '/close.svg'}
            alt='Logout'
          />
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <div className={classes.text}>
          <Typography variant='h3'>{user.nome_loja}</Typography>
          <Typography variant='h4'>Editar Perfil</Typography>
        </div>
        <form
          className={classes.form}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register('nome')}
            defaultValue='nome'
            value={user.nome}
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
            fullWidth
            id='standard-basic'
            label='Seu nome'
          />
          <TextField
            {...register('nome_loja')}
            defaultValue='nome_loja'
            value={user.nome_loja}
            onChange={(e) => setUser({ ...user, nome_loja: e.target.value })}
            fullWidth
            id='standard-basic'
            label='Nome da loja'
          />
          <TextField
            {...register('email')}
            defaultValue='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            fullWidth
            id='standard-basic'
            label='E-mail'
            type='email'
          />
          <FormControl>
            <InputLabel htmlFor='standard-adornment-password'>
              Nova senha
            </InputLabel>
            <Input
              id='standard-adornment-password'
              {...register('senha')}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='standard-adornment-password'>
              Repita a nova senha
            </InputLabel>
            <Input
              id='standard-adornment-password'
              {...register('confirmsenha')}
              type={showPassword2 ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.buttons}>
            <Link to='/perfil'>CANCELAR</Link>
            <Button type='submit' variant='contained' color='primary'>
              editar perfil
            </Button>
          </div>
        </form>
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

export default EditarPerfil;
