import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  navbar: {
    height: "100%",
    width: 138,
    left: 0,
    borderBottomRightRadius: 32,
    backgroundColor: "#434343",
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 113,
    gap: 45,
  },
  main: {
    height: "100%",
    paddingLeft: 212,
    marginTop: "5vh",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: "5vh",
    marginBottom: "5vh",
  },
  produtos: {
    paddingBottom: 20,
    borderBottom: "1px solid #BFBFBF",
    display: "flex",
    gap: 15,
    overflowX: "scroll",
    width: "95%",
    paddingRight: 20,
  },
  botao: {
    position: "absolute",
    bottom: 31,
  },
  iconeHome: {
    width: 73,
    height: 73,
    cursor: "pointer",
  },
  icone: {
    width: 32,
    height: 32,
    cursor: "pointer",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  containerFiltros: {
    display: "flex",
    gap: 10,
  },
  filtros: {
    width: "50vw",
  },
  input: {
    width: 150,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default useStyles;
