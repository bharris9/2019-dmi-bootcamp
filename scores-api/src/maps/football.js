import { getTeamScore, getOdds, getTvBroadcast, getEventNotes } from './scoreHelpers';

const mapToInternalModel = data => {
  const events = data.events;

  return events.map(event => ({
    id: event.id,
    date: event.date,
    name: event.name,
    shortName: event.shortName,
    completed: event.competitions[0].status.type.completed,
    quarter: event.competitions[0].status.period,
    clock: event.competitions[0].status.displayClock,
    status: event.competitions[0].status.type.shortDetail,
    statusType: event.status.type.name,
    tvBroadcast: getTvBroadcast(event.competitions[0].geoBroadcasts),
    homeScore: mapScore(getTeamScore(event, 'home')),
    awayScore: mapScore(getTeamScore(event, 'away')),
    odds: getOdds(event.competitions[0].odds),
    conferenceGame: event.competitions[0].conferenceCompetition,
    notes: getEventNotes(event.competitions[0].notes)
  }));
};

function mapScore(scoreItem) {
  return {
    homeAway: scoreItem.homeAway,
    score: scoreItem.score,
    winner: scoreItem.winner,
    teamAbbreviation: scoreItem.team.abbreviation,
    team: scoreItem.team.displayName,
    logo: scoreItem.team.logo,
    record: getRecords(scoreItem.records, 'total'),
    conferenceRecord: getRecords(scoreItem.records, 'vsconf'),
    rank: getRanking(scoreItem),
    possession: scoreItem.possession
  };
}

function getRanking(scoreItem) {
  if (!!scoreItem.curatedRank) {
    return scoreItem.curatedRank.current < 99
      ? scoreItem.curatedRank.current
      : null;
  } else {
    return null;
  }
}

function getRecords(records, recordType) {
  if (!!records) {
    let record = records.find(r => r.type === recordType);
    return !!record ? record.summary : null;
  } else {
    return null;
  }
}

export default mapToInternalModel;
