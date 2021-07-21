import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "unset",
    position: "relative",
    borderRadius: 24,
    width: 220,
  },
  media: {
    height: "26vh",
    width: 220,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  filhos: {
    width: "100%",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },
  delete: {
    position: "absolute",
    top: 15,
    left: 15,
    cursor: "pointer",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default useStyles;
