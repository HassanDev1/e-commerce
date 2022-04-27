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
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  InputBase,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import Head from "next/head";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { getError } from "../utils/error";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import axios from "axios";
import Logo from "../components/icons/svg/logo";
import Carts from "./icons/svg/cart";

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
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

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };

  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const [query, setQuery] = useState("");

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const menuCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");

    router.push("/");
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
          <Toolbar className={classes.toolbar}>
            <Box display='flex' alignItems='center'>
              <IconButton
                edge='start'
                aria-label='open drawer'
                onClick={sidebarOpenHandler}
                className={classes.menuButton}
              >
                <MenuIcon className={classes.navbarButton} />
              </IconButton>
              <NextLink href='/' passHref>
                <Link className={classes.logo}>
                  <Logo width={100} height={100} />
                  {/* <Typography className={classes.brand}> Ushop</Typography> */}
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor='left'
              width='240'
              open={sidebarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Typography>Shopping by Category</Typography>
                    <IconButton
                      aria-label='close'
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component='a'
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            <div className={classes.searchSection}>
              <form onSubmit={submitHandler} className={classes.searchForm}>
                <InputBase
                  name='query'
                  className={classes.searchInput}
                  placeholder='Search products'
                  onChange={queryChangeHandler}
                />
                <IconButton
                  type='submit'
                  className={classes.iconButton}
                  aria-label='search'
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href='/cart' passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color='secondary'
                      badgeContent={cart.cartItems.length}
                    >
                      <Carts width={66} height={36} />
                    </Badge>
                  ) : (
                    <IconButton>
                      <Carts width={66} height={36} className={classes.cart} />
                    </IconButton>
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={menuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      Order History
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/dashboard")
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href='/login' passHref>
                  <Link>
                    <Typography component='span'>Login</Typography>
                  </Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>
            © {new Date().getFullYear()} UShop. All rights.
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
