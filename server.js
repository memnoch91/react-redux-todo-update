const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const todoPosts = require("./routes/api/todosPosts");

const app = express();

//body-parser middleware;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//USE ROUTES
app.use("/api/todos", todoPosts);

//error handling middleware

//DB CONFIG;
const db = require("./config/keys.js").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
