import axios from 'axios';
import express from 'express';
import mapToInternalModel from '../maps/ncaaFootball';

const baseUri =
  'http://site.api.espn.com/apis/site/v2/sports/football/nfl';
const secondaryBaseUri = 'http://site.api.espn.com/apis/v2/sports/football/nfl';
const scoreboardUri = '/scoreboard';
const gameSummaryUri = '/summary?event=';
const standingsUri = '/standings?group=';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allScoresUri = baseUri + scoreboardUri;
    const group = req.query.group;
    const date = req.query.date;
    const week = req.query.week;
    const queryParams = getAllScoresQueryParams(group, date, week, 900);
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

function getAllScoresQueryParams(group, date, week, limit) {
  const URLSearchParams = require('url').URLSearchParams;
  const searchParams = new URLSearchParams();
  searchParams.append('limit', limit);

  if (!!group) searchParams.append('groups', group);

  if (!!date) searchParams.append('dates', date);

  if (!!week) searchParams.append('week', week);

  return searchParams.toString();
}

export default router;
