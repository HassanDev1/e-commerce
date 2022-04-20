import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import { connectToDatabase } from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const code = await db
    .collection('discountCodes')
    .findOne({ name: req.query.name });
  res.send(code);
});
export default handler;
