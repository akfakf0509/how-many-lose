const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");

const app = express();
const port = process.env.port || 3001;
const apiKey = "RGAPI-94bea414-9cdc-4093-88c0-c3f7b3e7db8d";

app.use(cors());

app.use(bodyParser.json());
app.use("/riot-api/summoner/info", (req, res) => {
  const options = {
    url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
      req.query.name
    )}`,
    qs: {
      api_key: apiKey,
    },
  };

  request(options, (e, r) => {
    if (r) {
      res.json(JSON.parse(r.body));
    }
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

app.use("/riot-api/game", (req, res) => {
  const options = {
    url: `https://asia.api.riotgames.com/lol/match/v5/matches/${req.query.gameId}`,
    qs: {
      api_key: apiKey,
    },
  };

  request(options, (e, r) => {
    res.json(JSON.parse(r.body));
  });
});

app.listen(port);
