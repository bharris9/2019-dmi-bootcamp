const mapToInternalModel = data => {
    const leagues = data.leagues;

    return leagues.map(league => ({
        id: league.id,
        name: league.name,
        abbreviation: league.abbreviation,
        apiKey: league.midsizeName,
        logos: league.logos
    }));
};

export default mapToInternalModel;
