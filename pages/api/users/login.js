import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();
  const user = await db.collection('Users').findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Login failed, try again' });
  }
});

export default handler;
