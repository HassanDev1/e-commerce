import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import { connectToDatabase } from '../../../utils/db';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const orders = await await db
    .collection('Orders')
    .find({ user: req.user._id })
    .toArray();
  res.send(orders);
});

export default handler;
