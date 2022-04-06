import nc from "next-connect";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../utils/db";
import { isAuth, signToken } from "../../../utils/auth";
import { ObjectId } from "mongodb";

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password ? bcrypt.hashSync(req.body.password) : password,
  };

  await db.collection("Users").updateOne(
    { _id: ObjectId(req.user._id) },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
          ? bcrypt.hashSync(req.body.password)
          : password,
      },
    }
  );

  const token = signToken(user);
  res.send({
    token,
    _id: ObjectId(req.user._id),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password ? bcrypt.hashSync(req.body.password) : password,
  });
});

export default handler;
