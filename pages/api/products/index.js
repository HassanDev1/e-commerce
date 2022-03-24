import nc from "next-connect";
import { connectToDatabase } from "../../../utils/db";

import data from "../../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  // await db.connect();
  // const products = await Product.find({});
  // await db.disconnect();
  // res.send(products);
  const { db } = await connectToDatabase();
  // await db.collection("Products").deleteMany();
  // await db.collection("Products").insertMany(data.products);

  // res.send({ message: "seeded sucessfully" });

  const product = await db.collection("Products").find({}).toArray();
  res.json(product);

  return product;
});

export default handler;
