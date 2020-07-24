import { getTeamScore, getOdds, getTvBroadcast } from './scoreHelpers';

const mapGameToInternalModel = event => {
  return {
    id: event.header.id,
    shortName: getShortName(event.header),
    completed: event.header.competitions[0].status.type.completed,
    inning: event.header.competitions[0].status.period,
    inningPrefix: event.header.competitions[0].status.periodPrefix,
    status: event.header.competitions[0].status.type.shortDetail,
    statusType: event.header.competitions[0].status.type.name,
    tvBroadcast: getTvBroadcast(event.header.competitions[0].broadcasts),
    homeScore: mapScore(getTeamScore(event.header, 'home')),
    awayScore: mapScore(getTeamScore(event.header, 'away')),
    lastPlay: getLastPlayText(event),
    currentSituation: getCurrentSituation(event),
    homeBoxScore: mapBoxScore(
      getBoxScore(event.boxscore.players, event.header, 'home')
    ),
    awayBoxScore: mapBoxScore(
      getBoxScore(event.boxscore.players, event.header, 'away')
    ),
    odds: getOdds(event.pickcenter)
  };
};

function getLastPlayText(event) {
  const lastPlay = getLastPlay(event);
  return !!lastPlay ? lastPlay.text : null;
}

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

function getBoxScore(boxScores, header, homeAway) {
  const team = getTeam(header, homeAway);
  return boxScores.find(p => p.team.id === team.id);
}

function mapBoxScore(teamBox) {
  return {
    team: teamBox.team.displayName,
    statistics: teamBox.statistics.map(stats => ({
      type: stats.type,
      labels: stats.labels,
      descriptions: stats.descriptions,
      totals: stats.totals,
      players: stats.athletes.map(playerStats => ({
        id: playerStats.athlete.id,
        active: playerStats.active,
        battingOrder: playerStats.batOrder,
        starter: playerStats.starter,
        name: playerStats.athlete.displayName,
        number: playerStats.athlete.jersey,
        position: playerStats.position.abbreviation,
        stats: playerStats.stats,
        notes: !!playerStats.notes ? playerStats.notes[0].text : ''
      }))
    }))
  };
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
    logo: scoreItem.team.logos[0].href,
    lineScores: scoreItem.linescores,
    record: scoreItem.record.find(r => r.type === 'total').summary
  };
}

function getCurrentSituation(event) {
  if (!!event.situation) {
    const lastPlay = getLastPlay(event);

    return {
      balls: event.situation.balls,
      strikes: event.situation.strikes,
      outs: event.situation.outs,
      onFirst: !!event.situation.onFirst,
      onSecond: !!event.situation.onSecond,
      onThird: !!event.situation.onThird,
      currentBattingOrder: lastPlay ? lastPlay.batOrder : null,
      batterId:
        lastPlay && lastPlay.participants
          ? lastPlay.participants.find(p => p.type === 'batter').athlete.id
          : null,
      pitcherId:
        lastPlay && lastPlay.participants
          ? lastPlay.participants.find(p => p.type === 'pitcher').athlete.id
          : null
    };
  }
  return null;
}

function getLastPlay(event) {
  if (!!event.situation) {
    return event.plays.find(p => p.id === event.situation.lastPlay.id);
  }
  return null;
}

export default mapGameToInternalModel;
