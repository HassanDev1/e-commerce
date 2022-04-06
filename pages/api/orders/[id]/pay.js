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
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.payer.email_address,
    };
    //paymentResult Schema
    //paymentResult: {id: String, status: String, email_address: String}
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'order paid', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'order not found' });
  }

  res.json(order);

  return order;
});

export default handler;
