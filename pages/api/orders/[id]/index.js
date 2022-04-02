import nc from 'next-connect';
import { connectToDatabase } from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';

//???
//Also, create a model for order, check section 8 vid 4 @6:55 ???
const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const order = await db.collection('Orders').find({});
  res.json(order);

  return order;
});

export default handler;
