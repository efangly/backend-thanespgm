const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require('./config/database')

require("dotenv").config()
const Route = require('./routes/mainRoute')
const authRoute = require('./routes/authRoute')

const app = express()

const whitelist = ["https://fanglycons.com"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

//connectDB
connectDB()

//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(morgan("dev"))

//route
app.use('/api',Route)
app.use('/api',authRoute)

const port = process.env.PORT
app.listen(port,()=>console.log('Start server in port '+port))