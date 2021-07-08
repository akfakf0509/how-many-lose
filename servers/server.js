const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");

const app = express();
const port = process.env.port || 3001;
const apiKey = "RGAPI-ea6d34b3-eaa7-4622-a28b-942d22a925ff";

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
