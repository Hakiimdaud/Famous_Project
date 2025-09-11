const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const famousRouter = require("./Routers/famousRouter")


const app = express()
const PORT = process.env.port || 9000

app.use(express.json())
app.use(cors())

app.use(famousRouter)


mongoose.connect(process.env.db_url)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err))

app.use("/allImages", express.static("document"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
