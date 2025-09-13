const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const famousRouter = require("./Routers/famousRouter")
const ComplaintsRouter = require("./Routers/ComplaintsRouter")
const contactRouter = require("./Routers/ContactRouter")

const app = express()
const PORT = process.env.port || 9000

app.use(express.json())
app.use(cors())



mongoose.connect(process.env.db_url)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err))


app.use(famousRouter)
app.use(ComplaintsRouter)
app.use(contactRouter)

app.use("/allImages", express.static("document"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
