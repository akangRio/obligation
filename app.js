if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`This app listening on port http://localhost:${port}/`);
});

module.exports = app;
