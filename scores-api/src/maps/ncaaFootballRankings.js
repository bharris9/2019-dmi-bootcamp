const mapToRankingsModel = data => {
  return {
    rankings: getRankings(data.rankings)
  };
};

function getRankings(rankings) {
  return rankings.map(r => ({
    name: r.name,
    shortName: r.shortName,
    occurrence: r.occurrence.displayValue,
    shortHeadline: r.shortHeadline,
    teams: getTeamRankings(r.ranks)
  }));
}

function getTeamRankings(ranks) {
  return ranks.map(r => ({
    teamName: r.team.nickname + r.team.name,
    nickname: r.team.nickname,
    logo: r.team.logo,
    abbreviation: r.team.abbreviation,
    current: r.current,
    previous: r.previous,
    trend: r.trend,
    record: r.recordSummary,
    points: r.points,
    firstPlaceVotes: r.firstPlaceVotes
  }));
}

export default mapToRankingsModel;
