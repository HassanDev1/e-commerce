import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
} from "@material-ui/core";
import Head from "next/head";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { useContext } from "react";
import { Store } from "../utils/store";
import Cookies from "js-cookie";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    Typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - UShop` : "UShop"}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' className={classes.navbar}>
          <Toolbar>
            <NextLink href='/' passHref>
              <Link>
                <Typography className={classes.brand}> Ushop</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href='/cart' passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href='/login' passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>
            © {new Date().getFullYear()} UShop. All rights{" "}
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
