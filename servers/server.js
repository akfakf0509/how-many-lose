const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.port || 3001;

app.use(cors());

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "test" }));

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
