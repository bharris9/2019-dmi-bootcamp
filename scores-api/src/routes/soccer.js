import express from 'express';
import axios from 'axios';
import mapToInternalModel from '../maps/womensWorldCup';
import mapMatchToInternalModel from '../maps/womensWorldCupMatch';
import { getTimeSinceEpoch } from '../shared/shared';

const baseUri = 'http://site.api.espn.com/apis/site/v2/sports/soccer/';
const scoreboardUri = '/scoreboard';
const gameSummaryUri = '/summary?event=';
const router = express.Router();

router.get('/:league', async (req, res) => {
  try {
    const leagueUri = baseUri + req.params.league + scoreboardUri;
    const date = req.query.date;
    const getAllScoresUri = !!date
      ? `${leagueUri}?dates=${date}&${getTimeSinceEpoch()}`
      : leagueUri + '&' + getTimeSinceEpoch();
    console.log(getAllScoresUri);
    const response = await axios.get(getAllScoresUri);
    const data = response.data;
    const mapped = mapToInternalModel(data);

    res.send(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

router.get('/:league/:id', async (req, res) => {
  try {
    const gameUri =
      baseUri +
      req.params.league +
      gameSummaryUri +
      req.params.id +
      '&' +
      getTimeSinceEpoch();
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
