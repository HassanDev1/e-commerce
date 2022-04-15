import nc from 'next-connect';
import { connectToDatabase } from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();

  const categories = await db.collection('Products').distinct('category');

  res.send(categories);
});

export default handler;
