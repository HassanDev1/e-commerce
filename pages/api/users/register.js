import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../utils/db';
import { signToken } from '../../../utils/auth';
import data from '../../../utils/data';

const handler = nc();

handler.post(async (req, res) => {
  const { db } = connectToDatabase();
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  };
  data.users.concat(newUser);
  const user = await db.collection('Users').insertOne(newUser);

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;
