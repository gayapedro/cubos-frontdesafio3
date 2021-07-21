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

function Cadastro() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
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

  const handleClickShowPassword1 = () => {
    setShowPassword1((prevValue) => !prevValue);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2((prevValue) => !prevValue);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(false);
    setErrorMessage('');

    if (data.senha !== data.senhaconfirm) {
      setLoading(false);
      setError(true);
      setErrorMessage('As senhas não conferem.');
      return;
    }
    const regEx = /\S+@\S+\.\S+/;
    if (!regEx.test(data.email)) {
      setLoading(false);
      setError(true);
      setErrorMessage('E-mail inválido.');
      return;
    }
    try {
      const response = await fetch(
        'http://cubosdesafio3.herokuapp.com/cadastro',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        setErrorMessage('Todos os campos são necessários.');
        setError(true);
        setLoading(false);
        return;
      }
      history.push('/');
    } catch (error) {
      setErrorMessage('Erro na conexão.');
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className={classes.cadastro}>
      <Card>
        <CardContent className={classes.card}>
          <Typography className={classes.titulo} variant='h4' component='h4'>
            Cadastro
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id='standard-basic'
              label='Nome'
              type='text'
              {...register('nome')}
            />
            <TextField
              id='standard-basic'
              label='Nome da loja'
              type='text'
              {...register('nome_loja')}
            />
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
                type={showPassword1 ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword1 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='standard-adornment-password'>
                Repita a senha
              </InputLabel>
              <Input
                id='standard-adornment-password'
                {...register('senhaconfirm')}
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
              Criar conta
            </Button>
          </form>
          <div className={classes.signinmessage}>
            <Typography variant='body2'>Já possui uma conta?</Typography>
            <Link className={classes.link} to='/'>
              ACESSE
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

export default Cadastro;
