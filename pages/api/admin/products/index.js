import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import { connectToDatabase } from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const products = await db.collection('Products').find({}).toArray();
  res.send(products);
});

handler.post(async (req, res) => {
  const { db } = await connectToDatabase();
  const product = {
    name: 'sample name',
    slug: 'sample-slug-',
    image: '/image/shirt1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReview: 0,
  };
  await db.collection('Products').insertOne(product);

  res.send({ message: 'Product Created', product });
});

export default handler;
