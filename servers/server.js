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
    url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.name}`,
    qs: {
      api_key: "RGAPI-6bc3d1be-9486-4507-96c9-66d2bc41da06",
    },
  };

  request(options, (e, r) => {
    res.json(JSON.parse(r.body));
  });
});

app.listen(port);
