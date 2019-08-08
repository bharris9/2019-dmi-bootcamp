const mapToInternalCalendarModel = data => {
  const leagues = data.leagues;

  if (!Array.isArray(leagues)) return [];

  return leagues.map(league => ({
    id: league.id,
    name: league.name,
    abbreviation: league.abbreviation,
    apiKey: league.midsizeName,
    logos: league.logos,
    calendarStartDate: league.calendarStartDate,
    calendarEndDate: league.calendarEndDate,
    calendar: getCalendar(league.calendar)
  }));
};

function getCalendar(calendar) {
  return calendar.map(type => ({
    label: type.label,
    startDate: type.startDate,
    endDate: type.endDate,
    entries: type.entries.map(entry => ({
      label: entry.label,
      detail: entry.detail,
      startDate: entry.startDate,
      endDate: entry.endDate
    }))
  }));
}

export default mapToInternalCalendarModel;
