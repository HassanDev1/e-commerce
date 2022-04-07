import nc from 'next-connect';
//import Order from '../../../models/Order';
//import Product from '../../../models/Product';
//import User from '../../../models/User';
import { isAuth, isAdmin } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import { connectToDatabase } from '../../../utils/db';
import { OrderedBulkOperation } from 'mongodb';

//This
const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  //const orders = await Order.find({ user: req.user_id });
  //const orders = await Order.find({}).populate('user', 'name');
  const orders = await db
    .collection("Orders")
    .find({ })
    .toArray();
  res.send(orders);
});

export default handler;
