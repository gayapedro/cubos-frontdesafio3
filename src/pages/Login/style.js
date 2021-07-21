import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  login: {
    minHeight: "100vh",
    display: "grid",
    placeContent: "center",
  },
  signupmessage: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    alignSelf: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  botao: {
    alignSelf: "center",
  },
  link: {
    fontSize: 12,
  },
  card: {
    padding: 70,
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  titulo: {
    alignSelf: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default useStyles;
