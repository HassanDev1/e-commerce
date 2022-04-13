import nc from "next-connect";
import { connectToDatabase } from "../../../../utils/db";
import onError from "../../../../utils/error";
//import Order from '../../../../models/Order';
import { isAuth } from "../../../../utils/auth";

//???
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
  await db
    .collection("Orders")
    .updateOne(
      { _id: ObjectId(req.query.id) },
      { $set: { isDelivered: true, deliveredAt: Date.now() } }
    );
  if (order) {
    res.send({ message: "order delivered", order: order });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "order not found" });
  }

  return order;
});

export default handler;
