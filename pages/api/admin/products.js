import nc from 'next-connect';
import { isAuth, isAdmin } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import { connectToDatabase } from '../../../utils/db';
//import products from '../../admin/products';
//import { OrderedBulkOperation } from 'mongodb';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const products = await db.collection('Products').find({}).toArray();
  res.send(products);
});

export default handler;
