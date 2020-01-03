import { getTeamScore, getOdds, getTvBroadcast } from './scoreHelpers';

const mapGameToInternalModel = event => {
  return {
    id: event.header.id,
    shortName: getShortName(event.header),
    completed: event.header.competitions[0].status.type.completed,
    quarter: event.header.competitions[0].status.period,
    clock: event.header.competitions[0].status.displayClock,
    status: event.header.competitions[0].status.type.shortDetail,
    statusType: event.header.competitions[0].status.type.name,
    conferenceGame: event.header.competitions[0].conferenceCompetition,
    conferenceDetails: getConferenceDetails(event.header.competitions[0]),
    tvBroadcast: getTvBroadcast(event.header.competitions[0].broadcasts),
    homeScore: mapScore(getTeamScore(event.header, 'home')),
    awayScore: mapScore(getTeamScore(event.header, 'away')),
    lastPlay: getLastPlay(event),
    downDistance: getDownDistance(event),
    venue: getVenue(event),
    weather: event.weather,
    homeTeamStats: mapTeamStats(
      getBoxScore(event.boxscore.teams, event.header, 'home')
    ),
    homePlayerStats: mapPlayerStats(
      getBoxScore(event.boxscore.players, event.header, 'home')
    ),
    awayTeamStats: mapTeamStats(
      getBoxScore(event.boxscore.teams, event.header, 'away')
    ),
    awayPlayerStats: mapPlayerStats(
      getBoxScore(event.boxscore.players, event.header, 'away')
    ),
    odds: getOdds(event.pickcenter),
    notes: event.header.gameNote,
    attendance: event.gameInfo.attendance
  };
};

function getVenue(event) {
  if (!!event.gameInfo.venue) {
    const venue = event.gameInfo.venue;
    return (
      venue.fullName +
      ' (' +
      venue.address.city +
      ', ' +
      venue.address.state +
      ')'
    );
  }
  return null;
}

function getConferenceDetails(competition) {
  if (!!competition.conferenceCompetition) {
    return competition.groups.shortName;
  } else {
    return null;
  }
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

function getDownDistance(event) {
  if (!!event.drives && !!event.drives.current) {
    const currentDrive = event.drives.current;
    if (!!currentDrive.plays) {
      const lastPlay = currentDrive.plays.slice(-1)[0];
      return lastPlay.start.downDistanceText;
    }
    return null;
  }
  return null;
}

function getLastPlay(event) {
  if (!!event.drives && !!event.drives.current) {
    const currentDrive = event.drives.current;
    if (!!currentDrive.plays) {
      const lastPlay = currentDrive.plays.slice(-1)[0];
      return currentDrive.team.abbreviation + ' - ' + lastPlay.text;
    }
    return null;
  }
  return null;
}

function getRanking(scoreItem) {
  if (!!scoreItem.rank) {
    return scoreItem.rank < 99 ? scoreItem.rank : null;
  } else {
    return null;
  }
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
    possession: scoreItem.possession,
    lineScores: scoreItem.linescores,
    ranking: getRanking(scoreItem)
  };
}

function mapTeamStats(teamBox) {
  return {
    teamAbbreviation: teamBox.team.teamAbbreviation,
    team: teamBox.team.displayName,
    shortDisplayName: teamBox.team.shortDisplayName,
    logo: teamBox.team.logo,
    stats: teamBox.statistics
  };
}

function mapPlayerStats(teamBox) {
  if (!!teamBox) {
    return {
      team: teamBox.team.displayName,
      statistics: teamBox.statistics.map(stats => ({
        type: stats.name,
        labels: stats.labels,
        descriptions: stats.descriptions,
        totals: stats.totals,
        players: stats.athletes.map(playerStats => ({
          name: playerStats.athlete.displayName,
          stats: playerStats.stats,
          notes: !!playerStats.notes ? playerStats.notes[0].text : ''
        }))
      }))
    };
  } else {
    return null;
  }
}

function getBoxScore(boxScores, header, homeAway) {
  const team = getTeam(header, homeAway);
  if (!!boxScores) {
    return boxScores.find(p => p.team.id === team.id);
  } else {
    return null;
  }
}

export default mapGameToInternalModel;
