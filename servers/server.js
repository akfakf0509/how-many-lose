const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
const route = require("./routes/index");

const app = express();
const port = process.env.port || 3001;
const apiKey = "RGAPI-b863b6ee-e404-40a9-a213-f91c4640ac2f";

app.use(cors());

app.use(bodyParser.json());
app.use("/api", route);
app.use("/riot-api/summoner/info", (req, res) => {
  const options = {
    url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}`,
    qs: {
      api_key: apiKey,
    },
  };

  request(options, (e, r) => {
    res.json(JSON.parse(r.body));
  });
});

app.use("/riot-api/summoner/games", (req, res) => {
  const options = {
    url: `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.query.puuid}/ids?start=${req.query.start}&count=${req.query.count}`,
    qs: {
      api_key: apiKey,
    },
  };

  request(options, (e, r) => {
    res.json(JSON.parse(r.body));
  });
});

app.listen(port);
