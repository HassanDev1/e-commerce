import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { onError } from "../../../utils/error";
import { connectToDatabase } from "../../../utils/db";

const handler = nc({
onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
const { db } = await connectToDatabase();
//const orders = await Order.find({ user: req.user_id });
const ordersCount = await db.collection("Orders").countDocuments();
const productsCount = await db.collection("Products").countDocuments();
const usersCount = await db.collection("Users").countDocuments();
const ordersPriceGroup = await db.collection("Orders").aggregate([
{
$group: {
_id: null,
sales: { $sum: "$totalPrice" },
},
},
]);
const ordersPrice =
ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
res.send({ ordersCount, productsCount, usersCount, ordersPrice });
});

export default handler;