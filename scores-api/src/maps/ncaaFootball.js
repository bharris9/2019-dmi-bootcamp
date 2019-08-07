import { getTeamScore, getOdds, getTvBroadcast } from './scoreHelpers';

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
    odds: getOdds(event.competitions[0].odds)
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
    possession: scoreItem.possession
  };
}

function getRecords(records, recordType) {
  return !!records ? records.find(r => r.type === recordType).summary : null;
} 

export default mapToInternalModel;