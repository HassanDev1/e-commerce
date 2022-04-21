import nc from 'next-connect';
import { isAuth } from '../../../../utils/auth';
import { connectToDatabase } from '../../../../utils/db';

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  //console.log(req);
  const code = await db
    .collection('discountCodes')
    .findOne({ name: req.query.name });
  res.send(code);
});
export default handler;
