import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "#203040",

    "& a": {
      color: "#fffffff",
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: 10,
    textAlign: "center",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  },
  navbarButton: {
    color: "#f0c000",
    textTransform: "initial",

    fontWeight: "bold",
    fontSize: "18px",
  },
  transparentBackground: {
    backgroundColor: "transparent",
  },
  error: {
    color: "#f04040",
  },
  fullWidth: {
    width: "100%",
  },
  reviewForm: {
    maxWidth: 800,
    width: "100%",
  },
  reviewItem: {
    marginRight: "1rem",
    borderRight: "1px #808080 solid",
    paddingRight: "1rem",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  mt1: { marginTop: "1rem" },
  menuButton: { padding: 0 },
  searchSection: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  discountCodeForm: {
    backgroundColor: "white",
    borderRadius: 5,
    align: "center",
  },
  codeInput: {
    textAlign: "center",
    color: "#000000",
    "& ::placeholder": {
      color: "#606060",
    },
  },
  logo: {
    top: "50%",
    left: "50%",
    transform: { translateX: "-50%", translateY: "-50%" },
  },
  logo: {
    "&:hover": {
      width: "100%",
      transition: { width: ".3s" },
    },
  },

  searchForm: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  searchInput: {
    paddingLeft: 20,
    color: "#000000",
    "& ::placeholder": {
      color: "#606060",
    },
  },
  iconButton: {
    padding: 5,
    borderRadius: "0 5px 5px 0",
    "& span": {
      color: "#000000",
    },
  },
  cart: {
    paddingTop: 5,
  },

  sort: {
    marginRight: 5,
  },
}));
export default useStyles;
