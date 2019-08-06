const mapToInternalModel = data => {
    const leagues = data.leagues;

    if (!Array.isArray(leagues))
      return [];

    return leagues.map(league => ({
        id: league.id,
        name: league.name,
        abbreviation: league.abbreviation,
        apiKey: league.midsizeName,
        logos: league.logos
    }));
};

export default mapToInternalModel;
