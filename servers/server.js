const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
const db = require("./config/db");

const app = express();
const port = process.env.port || 3001;
const apiKey = "RGAPI-43689ed5-86f6-4e41-9576-21a48c27bcfe";

app.use(cors());
app.use(bodyParser.json());

app.use("/database", (req, res) => {
  db.query("SELECT * FROM summoners", (e, d) => {
    if (!e) {
      res.send(d);
    } else {
      res.send(e);
    }
  });
});

app.use("/riot-api/summoner/info", (req, res) => {
  db.query(
    "SELECT * FROM summoners WHERE name=?",
    [req.query.name],
    (err, rows) => {
      if (rows.length) {
        res.json({
          id: rows[0].id,
          accountId: rows[0].account_id,
          puuid: rows[0].puuid,
          name: rows[0].name,
          profileIconId: rows[0].profile_icon_id,
          revisionDate: rows[0].revision_date,
          summonerLevel: rows[0].summoner_level,
        });
      } else {
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
            db.query(
              "INSERT INTO summoners VALUES (?, ?, ?, ?, ?, ?, ?)",
              Object.values(JSON.parse(r.body))
            );
            res.json(JSON.parse(r.body));
          }
        });
      }
    }
  );
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
  db.query(
    "SELECT * FROM matches WHERE match_id=?",
    [req.query.gameId],
    (err, rows) => {
      if (rows.length) {
        res.json(JSON.parse(rows[0].data));
      } else {
        const options = {
          url: `https://asia.api.riotgames.com/lol/match/v5/matches/${req.query.gameId}`,
          qs: {
            api_key: apiKey,
          },
        };

        request(options, (e, r) => {
          const result = JSON.parse(r.body);

          db.query("INSERT INTO matches VALUES (?, ?, ?)", [
            result.metadata.dataVersion,
            result.metadata.matchId,
            JSON.stringify(result),
          ]);
          res.json(result);
        });
      }
    }
  );
});

app.listen(port);
