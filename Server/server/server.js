require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
const db = process.env.DB_URL;

mongoose
  .connect(db)
  .then(() => console.log("Connection successfull"))
  .catch((e) => {
    console.log(e);
    console.log("Connection Failed");
  });

app.use("/user", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
