import express from 'express';
import axios from 'axios';
import mapToInternalModel from '../maps/leagues';

const baseUri =
  'http://site.api.espn.com/apis/site/v2/leagues/dropdown?lang=en&region=us&calendartype=whitelist&limit=100&sport=';
const router = express.Router();

router.get('/:sport', async (req, res) => {
  try {
    var sport = req.params.sport;

    if (!sport) {
      res.status(500).json({ error: 'Must supply a sport' });
    }

    if (sport == 'ncaa-football') {
      const data = getCollegeFootballLeagues();
      const mapped = mapToInternalModel(data);
      res.send(mapped);
    } else {
      const leagueUri = baseUri + sport;
      console.log(leagueUri);
      const response = await axios.get(leagueUri);
      const data = response.data;
      const mapped = mapToInternalModel(data);
      res.send(mapped);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

function getCollegeFootballLeagues() {
  return {
    leagues: [
      {
        id: 80,
        name: 'FBS (1-A)',
        abbreviation: 'FBS',
        midsizeName: '80',
        logos: [
          {
            href:
              'https://www.seekpng.com/ipng/u2q8i1u2o0o0t4a9_ncaa-college-football-ncaa-football-logo/'
          }
        ]
      },
      {
        id: 1,
        name: 'Atlantic Coast Conference',
        abbreviation: 'ACC',
        midsizeName: '1',
        logos: [{ href: 'http://theacc.com/images/main_logo.png' }]
      },
      {
        id: 151,
        name: 'American Conference',
        abbreviation: 'AAC',
        midsizeName: '151',
        logos: [
          {
            href:
              'https://s3.amazonaws.com/sidearm.sites/theamerican.sidearmsports.com/images/responsive/aac_logo.svg'
          }
        ]
      },
      {
        id: 4,
        name: 'Big 12',
        abbreviation: 'Big 12',
        midsizeName: '4',
        logos: [
          {
            href:
              'http://image.cdnllnwnl.xosnetwork.com/fls/10410/site_graphics/logo.png'
          }
        ]
      },
      {
        id: 5,
        name: 'Big 10',
        abbreviation: 'B1G',
        midsizeName: '5',
        logos: [
          { href: 'https://s3.amazonaws.com/bigten.org/images/btc_logo.svg' }
        ]
      },
      {
        id: 12,
        name: 'Conference USA',
        abbreviation: 'CUSA',
        midsizeName: '12',
        logos: [{ href: 'https://conferenceusa.com/images/logo.png' }]
      },
      {
        id: 18,
        name: 'FBS Independents',
        abbreviation: 'FBS Ind',
        midsizeName: '18',
        logos: [
          {
            href:
              'https://en.wikipedia.org/wiki/NCAA_Division_I_FBS_independent_schools#/media/File:NCAA_Division_I_FBS_independent_schools_logo.png'
          }
        ]
      },
      {
        id: 15,
        name: 'Mid-American Conference',
        abbreviation: 'MAC',
        midsizeName: '15',
        logos: [
          { href: 'https://getsomemaction.com/images/responsive/main_logo.png' }
        ]
      },
      {
        id: 17,
        name: 'Mountain West Conference',
        abbreviation: 'MWC',
        midsizeName: '17',
        logos: [{ href: 'https://themw.com/images/main_logo.png' }]
      },
      {
        id: 9,
        name: 'Pac-12 Conference',
        abbreviation: 'PAC12',
        midsizeName: '9',
        logos: [
          {
            href:
              'https://x.pac-12.com/profiles/pac12/themes/pac12_foundation/images/pac12/logo.png'
          }
        ]
      },
      {
        id: 8,
        name: 'Southeastern Conference',
        abbreviation: 'SEC',
        midsizeName: '8',
        logos: [
          {
            href:
              'https://a.espncdn.com/secnetwork/prod/images/sec-lockup@2x.png'
          }
        ]
      },
      {
        id: 37,
        name: 'Sun Belt Conference',
        abbreviation: 'SBC',
        midsizeName: '37',
        logos: [
          { href: 'https://sunbeltsports.org/images/responsive/main_logo.png' }
        ]
      },
      {
        id: 81,
        name: 'Division 1 FCS',
        abbreviation: 'FCS',
        midsizeName: '81',
        logos: [
          { href: 'https://en.wikipedia.org/wiki/NCAA_Division_I_Football_Championship#/media/File:NCAA_Division_I_FCS_logo.svg' }
        ]
      },
      {
        id: 35,
        name: 'Division II/III',
        abbreviation: 'D2/D3',
        midsizeName: '35',
        logos: [
          { href: 'http://www.ncaa.org/sites/all/themes/victory/logo.png' }
        ]
      },
    ]
  };
}

export default router;
