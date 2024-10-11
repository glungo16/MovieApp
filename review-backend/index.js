import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"
import { error } from "console"

import dotenv from "dotenv"
dotenv.config();

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@testcluster.elvi6.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`

const port = 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50, // how many users allowed
    wtimeoutMS: 2500, // timeout time
    //useNewUrlParser: true
  }
)
.catch(err => {
  console.error(err.stack);
  process.exit(1)
})
.then(async client => {
  await ReviewsDAO.injectDB(client) 
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
    
  })
})