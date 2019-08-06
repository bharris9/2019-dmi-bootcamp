import { getTeamScore, getOdds, getTvBroadcast } from './scoreHelpers';

const mapGameToInternalModel = event => {
  return {
    id: event.header.id,
    shortName: getShortName(event.header),
    completed: event.header.competitions[0].status.type.completed,
    quarter: event.header.competitions[0].status.period,
    clock: event.header.competitions[0].status.displayClock,
    status: event.header.competitions[0].status.type.shortDetail,
    tvBroadcast: getTvBroadcast(event.header.competitions[0].broadcasts),
    homeScore: mapScore(getTeamScore(event.header, 'home')),
    awayScore: mapScore(getTeamScore(event.header, 'away')),
    lastPlay: getLastPlay(event),
    homeStats: mapStats(
      getBoxScore(event.boxscore.teams, event.header, 'home')
    ),
    awayStats: mapStats(
      getBoxScore(event.boxscore.teams, event.header, 'away')
    ),
    odds: getOdds(event.pickcenter)
  };
};

function getShortName(header) {
  const homeTeam = getTeam(header, 'home');
  const awayTeam = getTeam(header, 'away');
  return `${awayTeam.team.abbreviation} @ ${homeTeam.team.abbreviation}`;
}

function getTeam(header, homeAway) {
  return header.competitions[0].competitors.find(
    team => team.homeAway === homeAway
  );
}

function getLastPlay(event) {
  if (!!event.situation) {
    const lastPlay = event.plays.find(p => p.id === event.situation.lastPlay.id);
    return !!lastPlay ? lastPlay.text : null;
  }
  return null;
}

function mapScore(scoreItem) {
  return {
    homeAway: scoreItem.homeAway,
    score: scoreItem.score,
    winner: scoreItem.winner,
    teamAbbreviation: scoreItem.team.abbreviation,
    team: scoreItem.team.displayName,
    logo: scoreItem.team.logos[0].href,
    record: scoreItem.record.find(r => r.type === 'total').summary,
    conferenceRecord: scoreItem.record.find(r => r.type === 'vsconf').summary,
    possession: scoreItem.possession
  };
}

function mapStats(teamBox) {
  return null;
}

function getBoxScore(boxScores, header, homeAway) {
  const team = getTeam(header, homeAway);
  return boxScores.find(p => p.team.id === team.id);
}

export default mapGameToInternalModel;