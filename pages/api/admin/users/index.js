import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import { connectToDatabase } from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const users = await db.collection('Users').find({}).toArray();
  res.send(users);
});

export default handler;
