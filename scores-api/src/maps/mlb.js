import { getTeamScore, getOdds, getTvBroadcast } from './scoreHelpers';

const mapToInternalModel = data => {
  const events = data.events;

  return events.map(event => ({
    id: event.id,
    date: event.date,
    name: event.name,
    shortName: event.shortName,
    completed: event.competitions[0].status.type.completed,
    inning: event.competitions[0].status.period,
    status: event.competitions[0].status.type.shortDetail,
    statusType: event.status.type.name,
    tvBroadcast: getTvBroadcast(event.competitions[0].geoBroadcasts),
    homeScore: mapScore(getTeamScore(event, 'home')),
    awayScore: mapScore(getTeamScore(event, 'away')),
    odds: getOdds(event.competitions[0].odds),
    lastPlay: getLastPlay(event.competitions[0].situation),
    atBat: getAtBat(event.competitions[0].situation),
    currentSituation: getCurrentSituation(event.competitions[0].situation)
  }));
};

function getAtBat(situation) {
  if(!!situation && !!situation.batter && !!situation.pitcher) {
    const pitcher = situation.pitcher.athlete.shortName;
    const batter = `${situation.batter.athlete.shortDetail} (${situation.batter.athlete.summary})`;
    return `${pitcher} pitching to ${batter}`
  }
  return null;
}

function getLastPlay(situation) {
  if (!!situation) {
    return event.competitions[0].lastPlay.text;
  }
  return null;
}

function getCurrentSituation(situation) {
  if (!!situation) {
    return {
      balls: event.situation.balls,
      strikes: event.situation.strikes,
      outs: event.situation.outs,
      onFirst: !!event.situation.onFirst,
      onSecond: !!event.situation.onSecond,
      onThird: !!event.situation.onThird
    }
  }
  return null;
}

function mapScore(scoreItem) {
  return {
    homeAway: scoreItem.homeAway,
    score: scoreItem.score,
    hits: scoreItem.hits,
    errors: scoreItem.errors,
    winner: scoreItem.winner,
    teamAbbreviation: scoreItem.team.abbreviation,
    team: scoreItem.team.displayName,
    logo: scoreItem.team.logo,
    record: scoreItem.records.find(r => r.type === 'Total').summary
  };
}

export default mapToInternalModel;
