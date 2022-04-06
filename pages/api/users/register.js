import nc from "next-connect";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../utils/db";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  };

  const insertId = await db.collection("Users").insertOne(newUser);

  const token = signToken(newUser);
  res.send({
    token,
    _id: insertId.insertedId,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
});

export default handler;
