const mapToStandingsModel = data => {
  return {
    name: data.name,
    abbreviation: data.abbreviation,
    shortName: data.shortName,
    divisions: getDivisions(data)
  };
};

function getDivisions(data) {
  const divisions = data.children.length > 0 ? data.children : [data];
  return divisions.map(c => ({
    name: c.name,
    abbreviation: c.abbreviation,
    shortName: c.shortName,
    standings: mapStandings(c.standings)
  }));
}

function mapStandings(standings) {
  return standings.entries.map(e => ({
    shortName: e.team.location,
    abbreviation: e.team.abbreviation,
    displayName: e.team.displayName,
    isActive: e.team.isActive,
    logo: e.team.logos[0].href,
    rank: e.team.rank,
    playoffSeed: getStat(e.stats, 'playoffSeed'),
    wins: getStat(e.stats, 'wins'),
    gamesBehind: getStat(e.stats, 'gamesBehind'),
    pointsFor: getStat(e.stats, 'pointsFor'),
    pointsAgainst: getStat(e.stats, 'pointsAgainst'),
    streak: getStat(e.stats, 'streak'),
    leagueWinPercent: getStat(e.stats, 'leagueWinPercent'),
    divisionWins: getStat(e.stats, 'divisionWins'),
    divisionTies: getStat(e.stats, 'divisionTies'),
    divisionLosses: getStat(e.stats, 'divisionLosses'),
    overall: getStat(e.stats, 'overall'),
    vsConf: getStat(e.stats, 'vsConf')
  }));
}

function getStat(stats, statName) {
  const stat = stats.find(s => s.name === statName);
  return {
    name: stat.displayName,
    abbreviation: stat.abbreviation,
    value: stat.value
  };
}

export default mapToStandingsModel;
