import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  CardContent,
  CardActions,
  createTheme,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  Link,
  MenuItem,
} from "@material-ui/core";
import { getError } from "../../utils/error";
import { Store } from "../../utils/Store";
import useStyles from "../../utils/styles";
import Logo from "../../components/icons/svg/logo";
import { Menu } from "@mui/material";
import Cookies from "js-cookie";
import { Bar } from "react-chartjs-2";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
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
      // type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
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
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box display='flex' alignItems='center'>
              <NextLink href='/' passHref>
                <Link className={classes.logo}>
                  <Logo width={100} height={100} />
                </Link>
              </NextLink>
            </Box>
            <Box
              display='flex'
              alignItems='center'
              className={classes.navbarButton}
            >
              <Typography variant='h2'>Admin Dashboard</Typography>
            </Box>

            <div>
              {userInfo ? (
                <>
                  <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                    size='medium'
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
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <NextLink href='/admin/dashboard' passHref>
                  <ListItem selected button component='a'>
                    <ListItemText primary='Admin Dashboard'></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href='/admin/orders' passHref>
                  <ListItem button component='a'>
                    <ListItemText primary='Orders'></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href='/admin/products' passHref>
                  <ListItem button component='a'>
                    <ListItemText primary='Products'></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href='/admin/users' passHref>
                  <ListItem button component='a'>
                    <ListItemText primary='Users'></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href='/admin/discounts' passHref>
                  <ListItem button component='a'>
                    <ListItemText primary='Discount Codes'></ListItemText>
                  </ListItem>
                </NextLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography className={classes.error}>{error}</Typography>
                  ) : (
                    <Grid container spacing={5}>
                      <Grid item md={3}>
                        <Card raised>
                          <CardContent>
                            <Typography variant='h4'>
                              ${summary.ordersPrice.toFixed(2)}
                            </Typography>
                            <Typography>Sales</Typography>
                          </CardContent>
                          <CardActions>
                            <NextLink
                              href='/admin/orders'
                              color='primary'
                              passHref
                            >
                              <Button size='small' color='primary'>
                                View sales
                              </Button>
                            </NextLink>
                          </CardActions>
                        </Card>
                      </Grid>
                      <Grid item md={3}>
                        <Card raised>
                          <CardContent>
                            <Typography variant='h4'>
                              {summary.ordersCount}
                            </Typography>
                            <Typography>Orders</Typography>
                          </CardContent>
                          <CardActions>
                            <NextLink
                              href='/admin/orders'
                              color='primary'
                              passHref
                            >
                              <Button size='small' color='primary'>
                                View orders
                              </Button>
                            </NextLink>
                          </CardActions>
                        </Card>
                      </Grid>
                      <Grid item md={3}>
                        <Card raised>
                          <CardContent>
                            <Typography variant='h4'>
                              {summary.productsCount}
                            </Typography>
                            <Typography>Products</Typography>
                          </CardContent>
                          <CardActions>
                            <NextLink
                              href='/admin/products'
                              color='primary'
                              passHref
                            >
                              <Button size='small' color='primary'>
                                View products
                              </Button>
                            </NextLink>
                          </CardActions>
                        </Card>
                      </Grid>
                      <Grid item md={3}>
                        <Card raised>
                          <CardContent>
                            <Typography variant='h4'>
                              {summary.usersCount}
                            </Typography>
                            <Typography>Users</Typography>
                          </CardContent>
                          <CardActions>
                            <NextLink
                              href='/admin/users'
                              color='primary'
                              passHref
                            >
                              <Button size='small' color='primary'>
                                View users
                              </Button>
                            </NextLink>
                          </CardActions>
                        </Card>
                      </Grid>
                    </Grid>
                  )}
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
