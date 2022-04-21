import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import { connectToDatabase } from '../../../../../utils/db';
import { ObjectId } from 'mongodb';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const code = await db
    .collection('discountCodes')
    .findOne({ _id: ObjectId(req.query.id) });
  res.send(code);
});

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const code = await db
    .collection('discountCodes')
    .findOne({ _id: ObjectId(req.query.id) });

  if (code) {
    await db.collection('discountCodes').updateOne(
      { _id: ObjectId(req.query.id) },
      {
        $set: {
          name: req.body.name,
          slug: req.body.slug,
          amount: req.body.amount,
        },
      }
    );
    res.send({ message: 'Code updated succesfully!' });
  } else {
    res.statusCode(404).send({ message: 'Code not found' });
  }
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();
  const code = await db
    .collection('discountCodes')
    .findOne({ _id: ObjectId(req.query.id) });
  if (code) {
    await db.collection('discountCodes').deleteOne(
      { _id: ObjectId(req.query.id) },
      {
        justOne: true,
      }
    );
    res.send({ message: 'Code Deleted' });
  } else {
    res.status(404).send({ message: 'Code Not Found' });
  }
});
export default handler;
