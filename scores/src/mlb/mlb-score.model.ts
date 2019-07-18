export interface MlbScore {
  id: string;
  name: string;
  date: Date;
  statusType: 'STATUS_SCHEDULED' | 'STATUS_IN_PROGRESS' | 'STATUS_FINAL';
  status: string;
  shortName: string;
  completed: boolean;
  inning: number;
  homeScore: MlbScoreItem;
  awayScore: MlbScoreItem;
}

export interface MlbScoreItem {
  homeAway: 'home' | 'away';
  score: string;
  winner: boolean;
  teamAbbreviation: string;
  team: string;
}

export interface MlbBoxScore {
  id: string;
  shortName: string;
  status: string;
  completed: boolean;
  inning: number;
  lastPlay: string;
  tvBroadcast: string;
  homeScore: BoxScoreItem;
  awayScore: BoxScoreItem;
  currentSituation: BoxScoreSituation;
}

export interface BoxScoreSituation {
  balls: number;
  strikes: number;
  outs: number;
  onFirst: boolean;
  onSecond: boolean;
  onThird: boolean;
}

export interface BoxScoreItem {
  homeAway: 'home' | 'away';
  score: string;
  hits: number;
  errors: number;
  winner: boolean;
  teamAbbreviation: string;
  team: string;
  lineScores: LineScore[];
  logo: string;
}

export interface LineScore {
  displayValue: number;
}
