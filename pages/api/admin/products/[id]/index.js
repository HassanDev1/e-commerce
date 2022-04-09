import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import { connectToDatabase } from '../../../../../utils/db';
import { ObjectId } from 'mongodb';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const { db } = await connectToDatabase();
  const product = await db
    .collection('Products')
    .findOne({ _id: ObjectId(req.query.id) });
  res.send(product);
});

handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const product = await db
    .collection('Products')
    .findOne({ _id: ObjectId(req.query.id) });

  if (product) {
    await db.collection('Products').updateOne(
      { _id: ObjectId(req.query.id) },
      {
        $set: {
          name: req.body.name,
          slug: req.body.slug,
          price: req.body.price,
          category: req.body.category,
          image: req.body.image,
          brand: req.body.brand,
          countInStock: req.body.countInStock,
          description: req.body.description,
        },
      }
    );
    res.send({ message: 'Product updated succesfully!' });
  } else {
    res.statusCode(404).send({ message: 'Product not found' });
  }
});

export default handler;
