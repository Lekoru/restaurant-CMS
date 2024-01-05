import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()

import userRoute from "./src/routes/userRoute.js"

export const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoute)

const PORT = 3001

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))