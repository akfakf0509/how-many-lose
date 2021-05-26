const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
const route = require("./routes/index");

const app = express();
const port = process.env.port || 3001;

app.use(cors());

app.use(bodyParser.json());
app.use("/api", route);
app.use("/riot-api", (req, res) => {
  const options = {
    url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}`,
    qs: {
      api_key: "RGAPI-57ae7555-7b7d-4954-84ac-a1a7b11789ad",
    },
  };

  request(options, (e, r) => {
    res.json(JSON.parse(r.body));
  });
});

app.listen(port);
