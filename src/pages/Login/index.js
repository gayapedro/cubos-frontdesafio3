import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Input from '@material-ui/core/Input';
import { useForm } from 'react-hook-form';
import useStyles from './style';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const { logar } = useAuth();
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

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(false);
    setErrorMessage('');
    try {
      const response = await fetch(
        'https://cubosdesafio3.herokuapp.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        setErrorMessage('E-mail ou senha incorretos.');
        setError(true);
        setLoading(false);
        return;
      }
      const dados = await response.json();
      setLoading(false);
      logar(dados.token, () => history.push('/produtos'));
    } catch (error) {
      setErrorMessage('Erro na conexão.');
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className={classes.login}>
      <Card>
        <CardContent className={classes.card}>
          <Typography className={classes.titulo} variant='h4' component='h4'>
            Login
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id='standard-basic'
              label='E-mail'
              type='email'
              {...register('email')}
            />
            <FormControl>
              <InputLabel htmlFor='standard-adornment-password'>
                Senha
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
            <Snackbar open={error} autoHideDuration={1000}>
              <MuiAlert elevation={6} variant='filled' severity='error'>
                {errorMessage}
              </MuiAlert>
            </Snackbar>
            <Button
              className={classes.botao}
              variant='contained'
              color='primary'
              type='submit'
            >
              Entrar
            </Button>
          </form>
          <div className={classes.signupmessage}>
            <Typography variant='body2'>Primeira vez aqui?</Typography>
            <Link className={classes.link} to='/cadastro'>
              CRIE UMA CONTA
            </Link>
          </div>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color='primary' />
          </Backdrop>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
