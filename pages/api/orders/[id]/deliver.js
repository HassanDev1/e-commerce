import nc from 'next-connect';
import { connectToDatabase } from '../../../../utils/db';
import onError from '../../../../utils/error';
//import Order from '../../../../models/Order';
import { isAuth } from '../../../../utils/auth';

//???
const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(async (req, res) => {
  const { db } = await connectToDatabase();
  const order = await db.collection('Orders').find({});
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    //paymentResult Schema
    //paymentResult: {id: String, status: String, email_address: String}
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'order delivered', order: deliveredOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'order not found' });
  }

  res.json(order);

  return order;
});

export default handler;
