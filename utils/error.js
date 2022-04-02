//import db from './db';
//import { connectToDatabase } from './db';
const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

const onError = async (err, req, res, next) => {
  //const { db } = await connectToDatabase();
  //res.status(500).send({ message: err.toString() });
};
export { getError, onError };
