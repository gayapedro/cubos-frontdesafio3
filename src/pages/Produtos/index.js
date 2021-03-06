import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import useStyles from './style';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CardProduto from '../../components/CardProduto';
import NavBar from '../../components/NavBar';

function Produtos() {
  const classes = useStyles();
  const [nomeLoja, setNomeLoja] = useState('');
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const { token } = useAuth();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage('');
    try {
      const response = await fetch(
        'https://cubosdesafio3.herokuapp.com/produtos',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        setLoading(false);
        setErrorMessage('Erro ao buscar produtos.');
        setError(true);
        return;
      }
      const dados = await response.json();
      setProdutos(dados);
    } catch (error) {
      setErrorMessage('Erro ao buscar produtos.');
      setError(true);
    }
    setLoading(false);
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage('');
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
        setErrorMessage('Erro ao buscar informa????es do usu??rio.');
        setError(true);
        return;
      }
      const dados = await response.json();
      setNomeLoja(dados.nome_loja);
    } catch (error) {
      setErrorMessage('Erro ao buscar informa????es do usu??rio.');
      setError(true);
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (!data.inicial && !data.final) return;
    setLoading(true);
    setError(false);
    setErrorMessage('');
    let endereco = 'https://cubosdesafio3.herokuapp.com/produtos?';
    if (data.inicial) {
      endereco += `min=${data.inicial * 100}&`;
    }
    if (data.final) {
      endereco += `max=${data.final * 100}`;
    }
    try {
      const response = await fetch(endereco, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setLoading(false);
        setErrorMessage('Erro ao aplicar filtro.');
        setError(true);
        return;
      }
      const dados = await response.json();
      setProdutos(dados);
    } catch (error) {
      setErrorMessage('Erro ao aplicar filtro.');
      setError(true);
    }
    setLoading(false);
  };

  const handleCleanFilter = () => {
    setToggle(!toggle);
    setOpenFilter(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [toggle]);

  useEffect(() => {
    const id = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [error]);

  return (
    <React.Fragment>
      <NavBar />
      <main className={classes.main}>
        <div className={classes.text}>
          <div className={classes.container}>
            <Typography variant='h3'>{nomeLoja}</Typography>
            <div className={classes.filtros}>
              <Button
                onClick={() => setOpenFilter(!openFilter)}
                color='primary'
              >
                Filtros
              </Button>
              {openFilter && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={classes.containerFiltros}
                  noValidate
                  autoComplete='off'
                >
                  <TextField
                    className={classes.input}
                    id='standard-basic'
                    type='number'
                    label='Pre??o inicial'
                    size='small'
                    variant='outlined'
                    {...register('inicial')}
                  />
                  <TextField
                    className={classes.input}
                    id='standard-basic'
                    type='number'
                    min='0'
                    label='Pre??o final'
                    size='small'
                    variant='outlined'
                    {...register('final')}
                  />
                  <Button type='submit' color='primary'>
                    Aplicar
                  </Button>
                  <Button
                    type='reset'
                    onClick={handleCleanFilter}
                    color='primary'
                  >
                    Limpar
                  </Button>
                </form>
              )}
            </div>
          </div>
          <Typography variant='h4'>Seus produtos</Typography>
        </div>
        <div className={classes.produtos}>
          {produtos.map((item) => {
            return (
              <CardProduto
                key={item.id}
                id={item.id}
                nome={item.nome}
                desc={item.descricao}
                imagem={item.imagem}
                qtd={item.estoque}
                valor={item.preco}
                setToggle={setToggle}
                setError={setError}
                setErrorMessage={setErrorMessage}
              />
            );
          })}
        </div>
        <Button
          onClick={() => history.push('/produtos/novo')}
          className={classes.botao}
          variant='contained'
          color='primary'
        >
          adicionar produto
        </Button>
        <Snackbar open={error} autoHideDuration={1000}>
          <MuiAlert elevation={6} variant='filled' severity='error'>
            {errorMessage}
          </MuiAlert>
        </Snackbar>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color='primary' />
        </Backdrop>
      </main>
    </React.Fragment>
  );
}

export default Produtos;
