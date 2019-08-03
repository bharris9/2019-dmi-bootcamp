export const getTeamScore = (event, homeAway) => {
  return event.competitions[0].competitors.find(
    team => team.homeAway === homeAway
  );
};

export const getOdds = odds => {
  if (!!odds && odds.length > 0) {
    return {
      details: odds[0].details,
      overUnder: odds[0].overUnder
    };
  }
};

export const getTvBroadcast = broadcasts => {
  const tvBroadcast = broadcasts.find(
    b => b.type.shortName === 'TV' || b.type.shortName === 'Web'
  );
  return !!tvBroadcast ? tvBroadcast.media.shortName : '';
};
