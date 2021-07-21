import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: '100%',
    width: 138,
    left: 0,
    borderBottomRightRadius: 32,
    backgroundColor: '#434343',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 113,
    gap: 45,
  },
  icone: {
    width: 32,
    height: 32,
    cursor: 'pointer',
  },
  iconeHome: {
    width: 73,
    height: 73,
    cursor: 'pointer',
  },
}));

export default useStyles;
