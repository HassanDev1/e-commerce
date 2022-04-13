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
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.payer.email_address,
    };
  }
  await db
    .collection("Orders")
    .updateOne(
      { _id: ObjectId(req.query.id) },
      { $set: { isPaid: true, paidAt: Date.now() } }
    );

  if (order) {
    res.send({ message: "order paid", order: paidOrder });
  } else {
    res.status(404).send({ message: "order not found" });
  }

  return order;
});

export default handler;
