import express from "express";
import axios from "axios";
import mapToInternalModel from "../maps/leagues";

const baseUri = "http://site.api.espn.com/apis/site/v2/leagues/dropdown?lang=en&region=us&calendartype=whitelist&limit=100&sport=";
const router = express.Router();

router.get("/:sport", async (req, res) => {
  try {
    const leagueUri = baseUri + req.params.sport;
    console.log(leagueUri);
    const response = await axios.get(leagueUri);
    const data = response.data;
    const mapped = mapToInternalModel(data);

    res.send(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
