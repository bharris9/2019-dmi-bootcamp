import express from "express";
import cors from "cors";
import mlbScoresRouter from "./routes/mlbScores";
import womensWorldCupRouter from "./routes/womensWorldCup";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use("/scores/mlb", mlbScoresRouter);
app.use("/scores/mlb/:id", mlbScoresRouter);
app.use("/scores/wwc", womensWorldCupRouter);
app.use("/scores/wwc/:id", womensWorldCupRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
