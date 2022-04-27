import nc from "next-connect";
import { isAuth, isAdmin } from "../../../utils/auth";
import { onError } from "../../../utils/error";
import { connectToDatabase } from "../../../utils/db";
import moment from "moment";

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  //const orders = await Order.find({ user: req.user_id });
  const ordersCount = await db.collection("Orders").countDocuments();
  const productsCount = await db.collection("Products").countDocuments();
  const usersCount = await db.collection("Users").countDocuments();
  const sales = await db
    .collection("Orders")
    .find({ isPaid: true }, { totalPrice: 1, paidAt: 1 })
    .toArray();
  console.log(sales.paidAt);
  let ordersPrice = 0;
  let salesData = [0];
  for (let i = 0; i < sales.length; i++) {
    ordersPrice += sales[i].totalPrice;
    salesData.push(moment(sales[i].createdAt).format("MMM Do"));
    salesData.push(ordersPrice);
  }

  for (let i = 0; i < salesData.length; i++) {
    console.log(salesData[i]);
  }
  res.send({ ordersCount, productsCount, usersCount, ordersPrice, salesData });
});

export default handler;
