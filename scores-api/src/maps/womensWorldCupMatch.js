import { getTeamScore, getTvBroadcast } from './scoreHelpers';

const mapMatchToInternalModel = event => {
  return {
    id: event.header.id,
    shortName: getShortName(event.header),
    date: event.header.competitions[0].date,
    completed: event.header.competitions[0].status.type.completed,
    period: event.header.competitions[0].status.period,
    clock: event.header.competitions[0].status.clock,
    status: event.header.competitions[0].status.type.shortDetail,
    statusType: event.header.competitions[0].status.type.name,
    note: event.header.season.name,
    tvBroadcast: getTvBroadcast(event.header.competitions[0].broadcasts),
    homeScore: mapScore(getTeamScore(event.header, 'home')),
    awayScore: mapScore(getTeamScore(event.header, 'away')),
    homeStats: mapTeamStats(getTeamStats(event.boxscore.teams, event.header, 'home')),
    awayStats: mapTeamStats(getTeamStats(event.boxscore.teams, event.header, 'away')),
    goals: getGoals(event.header.competitions[0].details)
  };
};

function getShortName(header) {
  const homeTeam = getTeam(header, 'home');
  const awayTeam = getTeam(header, 'away');
  return `${awayTeam.team.abbreviation} @ ${homeTeam.team.abbreviation}`;
}

function mapTeamStats(stats) {
  return {
    team: stats.team.displayName,
    logo: stats.team.logo,
    stats: stats.statistics
  }
}

function getTeam(header, homeAway) {
  return header.competitions[0].competitors.find(
    team => team.homeAway === homeAway
  );
}

function getTeamStats(boxScores, header, homeAway) {
  const team = getTeam(header, homeAway);
  return boxScores.find(p => p.team.id === team.id);
}

function mapScore(scoreItem) {
  return {
    homeAway: scoreItem.homeAway,
    score: scoreItem.score,
    winner: scoreItem.winner,
    teamAbbreviation: scoreItem.team.abbreviation,
    team: scoreItem.team.displayName,
    logo: scoreItem.team.logos[0].href,
    lineScores: scoreItem.linescores
  };
}

function getGoals(details) {
  if (!!details) {
    return details.map(goal => ({
      clock: goal.clock.displayValue,
      team: goal.team.displayName,
      ownGoal: goal.ownGoal,
      player: goal.participants[0].athlete.displayName,
      penaltyKick: goal.penaltyKick
    }));
  }
  return null;
}

export default mapMatchToInternalModel;
