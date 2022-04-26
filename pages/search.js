import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import { Store } from '../utils/Store';
import { connectToDatabase } from '../utils/db';
import useStyles from '../utils/styles';
import axios from 'axios';
import { Rating } from '@mui/material';
import { Pagination } from '@material-ui/lab';

const PAGE_SIZE = 6;

const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    rating = 'all',
    sort = '',
  } = router.query;
  const products = props.productDocs;
  const countProducts = props.countProducts;
  const categories = props.categories;
  const brands = props.brands;
  const pages = props.pages;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    searchQuery,
    //price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    //if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, this product is out of stock at the moment.');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout title="Search">
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Brands</Typography>
                <Select value={brand} onChange={brandHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {brands &&
                    brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Ratings</Typography>
                <Select value={rating} onChange={ratingHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {ratings.map((rating) => (
                    <MenuItem dispaly="flex" key={rating} value={rating}>
                      <Rating value={rating} readOnly />
                      <Typography component="span">&amp; Up</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {products.length === 0 ? 'No' : countProducts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {brand !== 'all' && ' : ' + brand}
              {rating !== 'all' && ' : Rating ' + rating + ' & up'}
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              brand !== 'all' ||
              rating !== 'all' ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              <Typography component="span" className={classes.sort}>
                Sort by
              </Typography>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value="lowest">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
                <MenuItem value="available">In Stock</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid className={classes.mt1} container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <ProductItem
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            className={classes.mt1}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { db } = await connectToDatabase();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const order =
    sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'available'
      ? { countInStock: -1 }
      : { _id: -1 };
  if (sort === 'available') {
    console.log('Here');
  }

  const categories = await db.collection('Products').distinct('category');

  const brands = await db.collection('Products').distinct('brand');

  let productDocs = await db
    .collection('Products')
    .find({
      ...queryFilter,
      ...categoryFilter,
      ...brandFilter,
      ...ratingFilter,
    })
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .toArray();

  const countProducts = await db.collection('Products').countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...brandFilter,
    ...ratingFilter,
  });

  productDocs = await JSON.parse(JSON.stringify(productDocs));

  return {
    props: {
      productDocs,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
