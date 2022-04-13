import nc from "next-connect";
import { isAuth, isAdmin } from "../../../utils/auth";
import { onError } from "../../../utils/error";
import { connectToDatabase } from "../../../utils/db";

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const orders = await db.collection("Orders").find({}).toArray();
  res.send(orders);
});

export default handler;
