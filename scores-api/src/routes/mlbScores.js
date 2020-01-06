import express from 'express';
import axios from 'axios';
import mapToInternalModel from '../maps/mlb';
import mapGameToInternalModel from '../maps/mlbGame';
import '@babel/polyfill';
import { getTimeSinceEpoch } from '../shared/shared';

const mlbScoresUri =
  'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';
const mlbGameSummaryUri =
  'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event=';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const date = req.query.date;
    const getAllScoresUri = !!date
      ? `${mlbScoresUri}?dates=${date}&${getTimeSinceEpoch()}`
      : mlbScoresUri + '&' + getTimeSinceEpoch();
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

router.get('/:id', async (req, res) => {
  try {
    const gameUri =
      mlbGameSummaryUri + req.params.id + '&' + getTimeSinceEpoch();
    console.log(gameUri);
    const response = await axios.get(gameUri);
    const data = response.data;
    const mapped = mapGameToInternalModel(data);

    res.send(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
