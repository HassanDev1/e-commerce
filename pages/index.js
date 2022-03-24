import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Layout from "../components/Layout";
import NextLink from "next/link";
import { connectToDatabase } from "../utils/db";

export default function Home(props) {
  const { products } = props;
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      height={340}
                      component='img'
                      image={product.image}
                      title={product.image}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>
                    ${product.price}
                    <Button size='small' color='primary'>
                      Add to Cart
                    </Button>
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase();

  const properties = await db.collection("Products").find({}).toArray();
  const products = JSON.parse(JSON.stringify(properties));

  return {
    props: { products },
  };
};
