import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);
const mongoURI = process.env.MONGO_URL;

export const connectedToMongo = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then("Connected to MongoDB successfully!")
    .catch((err) => {
      console.log(err);
    });
};
