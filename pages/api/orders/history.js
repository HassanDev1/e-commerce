import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import { connectToDatabase } from '../../../utils/db';

//This
const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const orders = await Order.find({ user: req.user_id });
  res.send(orders);
});

export default handler;
