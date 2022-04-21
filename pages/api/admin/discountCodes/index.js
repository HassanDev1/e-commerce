import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import { connectToDatabase } from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const codes = await db.collection('discountCodes').find({}).toArray();
  res.send(codes);
});

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();
  const code = {
    name: 'sample name',
    slug: 'sample-slug-',
    amount: 0,
  };
  await db.collection('discountCodes').insertOne(code);

  res.send({ message: 'Code Created', code });
});

export default handler;
