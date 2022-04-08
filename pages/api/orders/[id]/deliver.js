import nc from "next-connect";
import { connectToDatabase } from "../../../../utils/db";
import onError from "../../../../utils/error";
import { isAuth } from "../../../../utils/auth";
import { ObjectId } from "mongodb";

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const order = await db
    .collection("Orders")
    .find({ _id: req.query.id })
    .toArray();
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }
  console.log(order);
  await db
    .collection("Orders")
    .updateOne(
      { _id: ObjectId(req.query.id) },
      { $set: { isDelivered: true, deliveredAt: Date.now() } }
    );

  if (order) {
    res.send({ message: "order paid", order: order });
  } else {
    res.status(404).send({ message: "order not found" });
  }

  // res.json(order);

  return order;
});

export default handler;
