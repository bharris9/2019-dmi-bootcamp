import express from "express";
import axios from "axios";
import mapToInternalModel from "../maps/womensWorldCup";
import mapMatchToInternalModel from "../maps/womensWorldCupMatch"

const baseUri = "http://site.api.espn.com/apis/site/v2/sports/soccer/";
const scoreboardUri = "/scoreboard";
const gameSummaryUri = 
  "/summary?event=";
const router = express.Router();

router.get("/:league", async (req, res) => {
  try {
    const leagueUri = baseUri + req.params.league + scoreboardUri;
    const date = req.query.date;
    const getAllScoresUri = !!date ? `${leagueUri}?dates=${date}` : leagueUri;
    const response = await axios.get(getAllScoresUri);
    const data = response.data;
    const mapped = mapToInternalModel(data);

    res.send(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/:league/:id", async (req, res) => {
  try {
    const gameUri = gameSummaryUri + req.params.id;
    console.log(gameUri);
    const response = await axios.get(gameUri);
    const data = response.data;
    const mapped = mapMatchToInternalModel(data);

    res.send(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
