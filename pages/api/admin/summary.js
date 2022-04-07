import nc from 'next-connect';
//import Order from '../../../models/Order';
//import Product from '../../../models/Product';
//import User from '../../../models/User';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import { connectToDatabase } from '../../../utils/db';

//This
const handler = nc({
  onError,
});
handler.use(isAuth);

//Need to implement models for (order, product, and user) to finish API
//imports are commented out

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  //const orders = await Order.find({ user: req.user_id });
  const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();
  const ordersPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales:{$sum: '$totalPrice'}
      }
    }
  ]);
  const ordersPrice = ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales: 0;
  res.send({ ordersCount, productsCount, usersCount, ordersPrice });
});

export default handler;