import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';
//import Rating from '@material-ui/lab/Rating';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            height={340}
            component="img"
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
          {product.countInStock > 0 ? (
            <Button
              size="small"
              color="primary"
              onClick={() => addToCartHandler(product)}
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              disabled="true"
              size="small"
              color="primary"
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
