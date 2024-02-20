import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const SERVER_PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL!;

const access_token = process.env.ACCESS_TOKEN;
const refresh_token = process.env.REFRESH_TOKEN;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("databse connected");
  } catch (e) {
    console.log(e);
  }
};
export const config = {
  port: SERVER_PORT,
  db: connectDb,
  access_token,
  refresh_token,
};
