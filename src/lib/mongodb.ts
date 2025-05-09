import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const { MONGODB_URI } = process.env;
const client = new MongoClient(MONGODB_URI as string);
const clientPromise = client.connect();
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export default connectDB;
export { clientPromise };