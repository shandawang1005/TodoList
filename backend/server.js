import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import todoRoutes from "./routes/todo.js"

const app = express()
const PORT = 5001

app.use(cors())
app.use(bodyParser.json())

app.use("/api/todos", todoRoutes)

mongoose.connect("mongodb+srv://brucewang147862:abc123abc@cluster0.s94rk.mongodb.net/")
    .then(() => {
        console.log("Connected To MongoDB")
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => console.error("MongoDB connection error", error))
