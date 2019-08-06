import express from 'express';
import axios from 'axios';
import mapToInternalModel from '../maps/ncaaFootball';
import mapGameToInternalModel from '../maps/ncaaFootballGame';

const baseUri =
  'http://site.api.espn.com/apis/site/v2/sports/football/college-football';
const scoreboardUri = '/scoreboard';
const gameSummaryUri = '/summary?event=';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allScoresUri = baseUri + scoreboardUri;
    const group = req.query.group;
    const date = req.query.date;
    const week = req.query.week;
    const queryParams = getAllScoresQueryParams(group, date, week);
    const getAllScoresUri = `${allScoresUri}?${queryParams}`;
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
      baseUri + gameSummaryUri + req.params.id;
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

function getAllScoresQueryParams(group, date, week) {
  const searchParams = new URLSearchParams();
  searchParams.append('limit', 900);

  if(!!group)
    searchParams.append('groups', group);

  if(!!date)
    searchParams.append('dates', date);
  
  if(!!week)
    searchParams.append('week', week);

  return searchParams.toString();
}

export default router;