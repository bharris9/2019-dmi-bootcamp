import { getTeamScore, getTvBroadcast, getEventNotes } from './scoreHelpers';

const mapToInternalModel = data => {
  const events = data.events;

  return events.map(event => ({
    id: event.id,
    name: event.name,
    date: event.date,
    shortName: event.shortName,
    completed: event.competitions[0].status.type.completed,
    clock: event.competitions[0].status.displayClock,
    period: event.competitions[0].status.period,
    status: event.competitions[0].status.type.shortDetail,
    statusType: event.status.type.name,
    tvBroadcast: getTvBroadcast(event.competitions[0].geoBroadcasts),
    homeScore: mapScore(getTeamScore(event, 'home')),
    awayScore: mapScore(getTeamScore(event, 'away')),
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
    logo: scoreItem.team.logo
  }
}

export default mapToInternalModel;
