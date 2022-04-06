import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import { connectToDatabase } from '../../../utils/db';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();
  const newOrder = {
    ...req.body,
    user: req.user._id,
  };

  const order = await db.collection('Orders').insert(newOrder);

  res.status(201).send(order);
});

export default handler;
