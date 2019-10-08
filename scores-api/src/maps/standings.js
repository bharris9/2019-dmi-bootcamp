import { stat } from "fs";

const mapToStandingsModel = data => {
  return {
    name: data.name,
    abbreviation: data.abbreviation,
    shortName: data.shortName,
    divisions: getDivisions(data.children)
  };
};

function getDivisions(children) {
  return children.map(c => ({
    name: c.name,
    abbreviation: c.abbreviation,
    shortName: c.shortName,
    standings: mapStandings(c.standings),

  }));
}

function mapStandings(standings) {
  return standings.entries.map(e => ({
    shortName: e.location,
    abbreviation: e.abbreviation,
    displayName: e.displayName,
    isActive: e.isActive,
    logo: e.logos[0].href,
    playoffSeed: getStat(e.stats, 'playoffSeed'),
    playoffSeed: getStat(e.stats, 'wins'),
    playoffSeed: getStat(e.stats, 'gamesBehind'),
    playoffSeed: getStat(e.stats, 'pointsFor'),
    playoffSeed: getStat(e.stats, 'pointsAgainst'),
    playoffSeed: getStat(e.stats, 'streak'),
    playoffSeed: getStat(e.stats, 'leagueWinPercent'),
    playoffSeed: getStat(e.stats, 'divisionWins'),
    playoffSeed: getStat(e.stats, 'divisionTies'),
    playoffSeed: getStat(e.stats, 'divisionTies'),
    playoffSeed: getStat(e.stats, 'divisionLosses'),
    playoffSeed: getStat(e.stats, 'overall')
  }));
}

function getStat(stats, statName) {
  const stat = stats.find(s => stat.name === statName);
  return {
    name: stat.displayName,
    abbreviation: stat.abbreviation,
    value: stat.value
  }
}

export default mapToStandingsModel;
