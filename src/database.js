import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const mongodbConnection = mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB is conected"))
    .catch((error) => console.log(error))

export {mongodbConnection}