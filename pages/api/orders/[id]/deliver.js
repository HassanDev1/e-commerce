import nc from "next-connect";
import { connectToDatabase } from "../../../../utils/db";
import onError from "../../../../utils/error";
import { isAuth } from "../../../../utils/auth";
import { ObjectId } from "mongodb";
import moment from "moment-timezone";

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
    order.deliveredAt = moment().format("MMMM Do YYYY, h:mm:ss a");
  }
  await db.collection("Orders").updateOne(
    { _id: ObjectId(req.query.id) },
    {
      $set: {
        isDelivered: true,
        deliveredAt: moment()
          .tz("America/Chicago")
          .format("MMMM Do YYYY, h:mm:ss a"),
      },
    }
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
