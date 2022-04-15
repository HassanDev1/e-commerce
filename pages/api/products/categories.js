import nc from "next-connect";
import { connectToDatabase } from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  
  const { db } = await connectToDatabase();
 
  const categories = await db.collection.distinct('category').toArray();
  //res.json(product);

  return categories;
});

export default handler;