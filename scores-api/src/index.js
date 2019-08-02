import express from "express";
import cors from "cors";
import mlbScoresRouter from "./routes/mlbScores";
import soccerRouter from "./routes/soccer";
import leaguesRouter from "./routes/leagues";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use("/scores/mlb", mlbScoresRouter);
app.use("/scores/mlb/:id", mlbScoresRouter);
app.use("/scores/soccer/", soccerRouter);
app.use("/scores/soccer/", soccerRouter);
app.use("/leagues/", leaguesRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
