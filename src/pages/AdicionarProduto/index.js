import useAuth from '../../hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import store from '../../assets/store-selected.svg';
import profile from '../../assets/user.svg';
import close from '../../assets/close.svg';

function AdicionarProduto() {
  const classes = useStyles();
  const [nomeLoja, setNomeLoja] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  const fetchUserInfo = async () => {
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
      setNomeLoja(dados.nome_loja);
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
    const precoFormat = Number(data.preco).toFixed(2) * 100;
    const quantidadeFormat = Number(data.estoque);
    const objetoProduto = {
      nome: data.nome,
      estoque: quantidadeFormat,
      preco: precoFormat,
      descricao: data.descricao,
      imagem: data.imagem,
    };
    try {
      const response = await fetch(
        'https://cubosdesafio3.herokuapp.com/produtos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(objetoProduto),
        }
      );
      const dados = await response.json();
      console.log(dados);
      if (!response.ok) {
        setLoading(false);
        setErrorMessage('Erro ao adicionar produto.');
        setError(true);
        return;
      }
      history.push('/produtos');
    } catch (error) {
      setErrorMessage('Erro ao adicionar produto.');
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
            className={classes.iconeHome}
            src={store}
            alt='Produtos'
          />
          <img
            onClick={() => history.push('/perfil')}
            className={classes.icone}
            src={profile}
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
      <main className={classes.main}>
        <div className={classes.text}>
          <Typography variant='h3'>{nomeLoja}</Typography>
          <Typography variant='h4'>Adicionar produto</Typography>
        </div>
        <form
          className={classes.form}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register('nome')}
            fullWidth
            id='standard-basic'
            label='Nome do produto'
          />
          <div className={classes.precoEstoque}>
            <TextField
              {...register('preco')}
              fullWidth
              label='Preço'
              id='standard-start-adornment'
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>R$</InputAdornment>
                ),
              }}
            />
            <TextField
              {...register('estoque')}
              fullWidth
              label='Estoque'
              id='standard-start-adornment'
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>Un</InputAdornment>
                ),
              }}
            />
          </div>
          <TextField
            {...register('descricao')}
            fullWidth
            id='standard-basic'
            label='Descrição do produto'
          />
          <TextField
            {...register('imagem')}
            fullWidth
            id='standard-basic'
            label='Imagem'
          />
          <div className={classes.buttons}>
            <Link to='/produtos'>CANCELAR</Link>
            <Button type='submit' variant='contained' color='primary'>
              adicionar produto
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

export default AdicionarProduto;
