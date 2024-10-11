import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express() // used to create web server

// middlewares
app.use(cors())
app.use(express.json()) // allows json to be accepted in the body of a request

app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => 
  res.status(404).json({error: "path not found"})) // if people go to an url that is not included in the route file

export default app