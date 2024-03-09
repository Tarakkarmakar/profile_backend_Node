const express = require("express");

const { connection } = require("./Config/db");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { userRoute} = require("./Router/userRoute");

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Private API ");
  });
  app.use("/user",userRoute)

const port= process.env.port || 8080

  app.listen(port, async () => {
    try {
      await connection;
  
      console.log("connected to Db");
    } catch (err) {
      console.log(err, "unable to connect");
    }
    console.log("server is running");
  });
  