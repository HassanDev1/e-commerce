import nc from "next-connect";
import { connectToDatabase } from "../../../../utils/db";
import { isAuth } from "../../../../utils/auth";
import { ObjectId } from "mongodb";

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const order = await db
    .collection("Orders")
    .findOne({ _id: ObjectId(req.query.id) });
  res.json(order);

  return order;
});

export default handler;
