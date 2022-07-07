import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = () => {
  mongoose.connect(process.env.DATABASE_URI).then((value) => console.log('database connected')).catch((e) => console.log(e));
};

export default database;
