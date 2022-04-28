import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { onError } from "../../../utils/error";
import { connectToDatabase } from "../../../utils/db";
import moment from "moment-timezone";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();
  const newOrder = {
    ...req.body,
    user: req.user._id,
    createdAt: moment().tz("America/Chicago").format("MMMM Do YYYY, h:mm:ss a"),
  };

  const order = await db.collection("Orders").insert(newOrder);

  res.status(201).send(order);
});

export default handler;
