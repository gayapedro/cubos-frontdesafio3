import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import useStyles from './style';
import useAuth from '../../hooks/useAuth';

function CardProduto(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { token } = useAuth();
  const history = useHistory();

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://apides3.gayapedro.dev.br/produtos/${props.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        props.setErrorMessage('Erro ao excluir o produto.');
        props.setError(true);
        handleClose();
        return;
      }
      props.setToggle((prevValue) => !prevValue);
    } catch (error) {
      props.setErrorMessage('Erro ao excluir o produto.');
      props.setError(true);
    }
    handleClose();
  };

  const handleEditar = (e) => {
    e.stopPropagation();
    history.push(`/produtos/${props.id}/editar`);
  };

  return (
    <Card onClick={handleEditar} className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.imagem}
        title={props.nome}
      />
      <img
        onClick={handleClickOpen}
        className={classes.delete}
        src={process.env.PUBLIC_URL + '/delete.svg'}
        alt=''
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {props.nome}
        </Typography>
        <Typography
          className={classes.filhos}
          variant='body2'
          color='textSecondary'
          component='p'
        >
          {props.desc}
        </Typography>
        <div className={classes.cardFooter}>
          <Typography>{props.qtd} UN.</Typography>
          <Typography>R$ {(props.valor / 100).toFixed(2)}</Typography>
        </div>
      </CardContent>
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Remover produto do catálogo?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='contained'>
            manter produto
          </Button>
          <Button onClick={handleDelete} color='secondary' variant='contained'>
            remover
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default CardProduto;
