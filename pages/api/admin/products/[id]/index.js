import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import { connectToDatabase } from '../../../../../utils/db';
import { ObjectId } from 'mongodb';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const product = await db
    .collection('Products')
    .findOne({ _id: ObjectId(req.query.id) });
  res.send(product);
});

export default handler;
