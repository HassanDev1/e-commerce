import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,

} from "@material-ui/core";
import React from "react";
import NextLink from "next/link";
import Carts from "./icons/svg/cart";
import useStyles from "../utils/styles";

} from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';

export default function ProductItem({ product, addToCartHandler }) {
  const classes = useStyles();
  return (
    <Card style={{ height: "100%" }}>
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
          <Rating value={product.rating} readOnly></Rating>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>
          {product.onSale ? (
            <Typography style={{ color: 'red' }}>
              {' '}
              ${product.price} Limited Time Offer!
              <Whatshot />
            </Typography>
          ) : (
            <Typography>${product.price}</Typography>
          )}

          {product.countInStock > 0 ? (
            <IconButton
              size='small'
              color='primary'
              onClick={() => addToCartHandler(product)}
            >
              <Carts width={100} height={60} className={classes.cart} />
            </IconButton>
          ) : (
            <Button
              disabled={true}
              size='small'
              color='primary'
              onClick={() => addToCartHandler(product)}
            >
              Out of stock
            </Button>
          )}
        </Typography>
      </CardActions>
    </Card>
  );
}
