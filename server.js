const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://SkaneDNikola:AAA@cluster0.s37z8ik.mongodb.net/videosLinks"
);

app.use("/", require("./routes/linkRoute"));

app.listen(3001, () => {
  console.log("Server is running at port 3001 ...");
});
