import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import Head from "next/head";
import useStyles from "../utils/styles";

export default function Layout({ title, description, children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <Typography>Ushop</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>© {new Date().getFullYear()} UShop. All rights </Typography>
      </footer>
    </div>
  );
}
