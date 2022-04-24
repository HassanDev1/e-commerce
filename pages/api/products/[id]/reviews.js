// /api/products/:id/reviews
import nextConnect from "next-connect";
import { onError } from "../../../../utils/error";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../utils/db";
import { isAuth } from "../../../../utils/auth";
//import axios from 'axios';

const handler = nextConnect({
  onError,
});

handler.use(isAuth);

//works
handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const product = await db
    .collection("Products")
    .findOne({ _id: ObjectId(req.query.id) });
  if (product) {
    res.send(product.reviews);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

//Only works if its a new review, cant get it to update
handler.post(async (req, res) => {
  const { db } = await connectToDatabase();

  //checks if item exists
  const product = await db
    .collection("Products")
    .findOne({ _id: ObjectId(req.query.id) });

  if (product) {
    //checks if current user has already reviewed this product
    const existReview = product.reviews.find((x) => x.user == req.user._id);

    if (existReview) {
      await db.collection("Products").updateOne(
        {
          _id: ObjectId(req.query.id),
          "reviews.user": existReview.user,
        },
        {
          $set: {
            "reviews.$.comment": req.body.comment,
            "reviews.$.rating": Number(req.body.rating),
          },
        }
      );

      //Pulling the updated product from the db
      const uProduct = await db
        .collection("Products")
        .findOne({ _id: ObjectId(req.query.id) });

      //Setting the new numReview and rating after the updated rating. This is working
      await db.collection("Products").updateOne(
        { _id: product._id },
        {
          $set: {
            numReview: uProduct.reviews.length,
            rating:
              uProduct.reviews.reduce((a, c) => c.rating + a, 0) /
              uProduct.reviews.length,
          },
        }
      );

      return res.send({ message: "Review updated" });
    } else {
      //THIS WORKS SOMEHOW
      const review = {
        user: ObjectId(req.user._id),
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };

      await db.collection("Products").updateOne(
        { _id: product._id },
        {
          $push: {
            reviews: review,
          },
        }
      );

      const uProduct = await db
        .collection("Products")
        .findOne({ _id: ObjectId(req.query.id) });

      await db.collection("Products").updateOne(
        { _id: uProduct._id },
        {
          $set: {
            numReview: uProduct.reviews.length,
            rating:
              uProduct.reviews.reduce((a, c) => c.rating + a, 0) /
              uProduct.reviews.length,
          },
        }
      );

      res.status(201).send({
        message: "Review submitted",
      });
    }
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default handler;
