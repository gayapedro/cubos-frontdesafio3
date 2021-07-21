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
import { useHistory, useParams } from 'react-router-dom';

function EditarProduto() {
  const classes = useStyles();
  const [nomeLoja, setNomeLoja] = useState('');
  const [produto, setProduto] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { token, deslogar } = useAuth();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const id = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [error]);

  const fetchProductInfo = async () => {
    //não era necessário carregar as infos
    //mas eu achei mais bonitinho, a api
    //aceita mudar apenas 1 informação
    setLoading(true);
    setErrorMessage('');
    setError(false);
    try {
      const response = await fetch(
        `http://apides3.gayapedro.dev.br/produtos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        setLoading(false);
        setErrorMessage('Erro ao buscar informações sobre o produto.');
        setError(true);
        return;
      }

      const dados = await response.json();
      dados.preco = (dados.preco / 100).toFixed(2);
      setProduto(dados);
    } catch (error) {
      setErrorMessage('Erro ao buscar informações sobre o produto.');
      setError(true);
    }
    setLoading(false);
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    setErrorMessage('');
    setError(false);
    try {
      const response = await fetch('http://apides3.gayapedro.dev.br/perfil', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        `http://apides3.gayapedro.dev.br/produtos/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(objetoProduto),
        }
      );
      if (!response.ok) {
        setError(true);
        setErrorMessage('Erro ao editar produto.');
        setLoading(false);
        return;
      }
      history.push('/produtos');
    } catch (error) {
      setErrorMessage('Erro ao editar produto.');
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

  useEffect(() => {
    fetchProductInfo();
  }, []);

  return (
    <React.Fragment>
      <AppBar className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <img
            onClick={() => history.push('/produtos')}
            className={classes.iconeHome}
            src={process.env.PUBLIC_URL + '/store-selected.svg'}
            alt='Produtos'
          />
          <img
            onClick={() => history.push('/perfil')}
            className={classes.icone}
            src={process.env.PUBLIC_URL + '/user.svg'}
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
          <Typography variant='h3'>{nomeLoja}</Typography>
          <Typography variant='h4'>Editar produto</Typography>
        </div>
        {produto && (
          <div className={classes.bodyEdit}>
            <form
              className={classes.form}
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                {...register('nome')}
                value={produto.nome}
                defaultValue='nome'
                onChange={(e) =>
                  setProduto({ ...produto, nome: e.target.value })
                }
                fullWidth
                id='standard-basic'
                label='Nome do produto'
              />
              <div className={classes.precoEstoque}>
                <TextField
                  {...register('preco')}
                  value={produto.preco}
                  defaultValue='preco'
                  onChange={(e) =>
                    setProduto({ ...produto, preco: e.target.value })
                  }
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
                  value={produto.estoque}
                  defaultValue='estoque'
                  onChange={(e) =>
                    setProduto({ ...produto, estoque: e.target.value })
                  }
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
                value={produto.descricao}
                defaultValue='descricao'
                onChange={(e) =>
                  setProduto({ ...produto, descricao: e.target.value })
                }
                fullWidth
                id='standard-basic'
                label='Descrição do produto'
              />
              <TextField
                {...register('imagem')}
                value={produto.imagem}
                defaultValue='imagem'
                onChange={(e) =>
                  setProduto({ ...produto, imagem: e.target.value })
                }
                fullWidth
                id='standard-basic'
                label='Imagem'
              />
              <div className={classes.buttons}>
                <Link to='/produtos'>CANCELAR</Link>
                <Button type='submit' variant='contained' color='primary'>
                  salvar alterações
                </Button>
              </div>
            </form>
            <div
              style={{
                backgroundImage: `url(${produto.imagem})`,
              }}
              className={classes.imagemEdit}
            ></div>
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

export default EditarProduto;
