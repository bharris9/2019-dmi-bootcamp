import cors from 'cors';
import express from 'express';
import leaguesRouter from './routes/leagues';
import mlbScoresRouter from './routes/mlbScores';
import ncaaFootballRouter from './routes/ncaaFootball';
import nflRouter from './routes/nfl';
import soccerRouter from './routes/soccer';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use('/scores/mlb', mlbScoresRouter);
app.use('/scores/mlb/:id', mlbScoresRouter);
app.use('/scores/soccer/', soccerRouter);
app.use('/scores/ncaa-football/', ncaaFootballRouter);
app.use('/scores/nfl/', nflRouter);
app.use('/leagues/', leaguesRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
