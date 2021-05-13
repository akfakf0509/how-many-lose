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
    url: "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/kata%2095D",
    qs: {
      api_key: "RGAPI-9f8916aa-ab26-4e6f-83fc-50759b797fdf",
    },
  };

  request(options, (e, r) => {
    res.json(JSON.parse(r.body));
  });
});

app.listen(port);
