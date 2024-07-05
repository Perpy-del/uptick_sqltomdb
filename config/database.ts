import mongoose from 'mongoose';

async function connectToDb() {
  try {
    const connection = await mongoose.connect(process.env.DEV_MONGODB_CONNECT_URL as string)
    console.log("Database connected successfully")
    return connection;
  } catch (error: any) {
    console.log(error);
  }
}

export default connectToDb;
