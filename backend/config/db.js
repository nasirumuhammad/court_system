import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  console.info(`MongoDB connected: ${connection.connection.host}`);
  return connection;
};

export default connectDB;
