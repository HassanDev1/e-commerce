import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import { connectToDatabase } from '../../../../../utils/db';
import { ObjectId } from 'mongodb';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const user = await db
    .collection('Users')
    .findOne({ _id: ObjectId(req.query.id) });
  res.send(user);
});

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const user = await db
    .collection('Users')
    .findOne({ _id: ObjectId(req.query.id) });

  if (user) {
    await db.collection('Users').updateOne(
      { _id: ObjectId(req.query.id) },
      {
        $set: {
          name: req.body.name,
          isAdmin: Boolean(req.body.isAdmin)
        },
      }
    );
    res.send({ message: 'User updated succesfully!' });
  } else {
    res.statusCode(404).send({ message: 'User not found' });
  }
});

handler.delete(async (req, res) => {
  const { db } = await connectToDatabase();
  const user = await db
    .collection('Users')
    .findOne({ _id: ObjectId(req.query.id) });
  if (user) {
    await db.collection('Users').deleteOne(
      { _id: ObjectId(req.query.id) },
      {
        justOne: true,
      }
    );
    res.send({ message: 'User Deleted' });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});
export default handler;
