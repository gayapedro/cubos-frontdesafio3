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
    width: "100%",
    paddingRight: 20,
  },
  icone: {
    width: 32,
    height: 32,
    cursor: "pointer",
  },
  iconeHome: {
    width: 73,
    height: 73,
    cursor: "pointer",
  },
  precoEstoque: {
    display: "flex",
    justifyContent: "space-between",
    gap: 30,
  },
  form: {
    width: "35vw",
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  line: {
    width: "75%",
    position: "absolute",
    bottom: 90,
    borderBottom: "1px solid #BFBFBF",
  },
  buttons: {
    display: "flex",
    gap: 24,
    alignItems: "center",
    position: "absolute",
    bottom: 31,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  bodyEdit: {
    display: "flex",
    gap: 50,
  },
  imagemEdit: {
    height: "50vh",
    width: "25vw",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundColor: "white",
    borderRadius: 16,
  },
}));

export default useStyles;
