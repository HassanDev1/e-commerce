import nc from "next-connect";
import { connectToDatabase } from "../../utils/db";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  // const { db } = await connectToDatabase();
  // await db.collection('Products').deleteMany();
  // await db.collection('Products').insertMany(data.products);
  // await db.collection('Users').deleteMany();
  // await db.collection('Users').insertMany(data.users);

  res.send({ message: "seeded sucessfully" });
});

export default handler;
