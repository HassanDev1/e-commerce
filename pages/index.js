import { Grid } from '@material-ui/core';
import Layout from '../components/Layout';
import { connectToDatabase } from '../utils/db';
import { Store } from '../utils/Store';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import ProductItem from '../components/ProductItem';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, we have no more stock of this item');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item md={4} sm={6} key={product.name} sx={{ height: '100%' }}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase();

  const properties = await db.collection('Products').find({}).toArray();
  const products = JSON.parse(JSON.stringify(properties));

  return {
    props: { products },
  };
};
