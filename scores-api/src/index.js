import express from "express";
import cors from "cors";
import mlbScoresRouter from "./routes/mlbScores";
import soccerRouter from "./routes/soccer";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use("/scores/mlb", mlbScoresRouter);
app.use("/scores/mlb/:id", mlbScoresRouter);
app.use("/scores/soccer/", soccerRouter);
app.use("/scores/soccer/", soccerRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
