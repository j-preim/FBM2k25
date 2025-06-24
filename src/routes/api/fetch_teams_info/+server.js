import { leagueID } from "$lib/utils/leagueInfo";
import { round } from "$lib/utils/helperFunctions/universalFunctions";
import { waitForAll } from "$lib/utils/helperFunctions/multiPromise";
import { json, error } from "@sveltejs/kit";

export async function GET() {
  // get MLB state from sleeper (scoring period, matchup, and year)
  const resPromises = [
    fetch(
      `https://lm-api-reads.fantasy.espn.com/apis/v3/games/flb/seasons/2025/segments/0/leagues/${leagueID}?view=mTeam`,
      {
        compress: true,
        credentials: "include",
        headers: {
          Cookie:
            "SWID={20135656-6F94-4144-BFCB-7D5DCAF263EE};espn_s2=AEC017SjlLDQVGg5O1VLCJlIPtEi4bse%2B9Jrx%2BQbESgP5cEpmP3izjY4QI2nKuTdS3xGnDdAcFcE1f%2B3IQ3Wsg9GliCyRyWe74imuI4oN705HCWE0KD2ims0hqAiLvcwaT5GPYHxWMymeGUrWwJnZPEm7SInl9K7JF4jILdIBL96eiLITUvwfaICYwtEk0eOlpItrlJPbpTh4fTGTtD%2BtTNqjyaMqHxSzGp%2BdiI5ijukZ6WzNc7zo6OXUDOJCdd0m8ZLflMPYt5pZinOBN9LCDvkHXYQuW5FofdiGtwfDhz%2F%2Fw%3D%3D;",
        },
      }
    )
  ];

  const responses = await waitForAll(...resPromises);

  const resJSONs = [];
  for (const res of responses) {
    if (!res.ok) {
      throw error(500, "No luck");
    }
    resJSONs.push(res.json());
  }

  const [teamsData] = await waitForAll(...resJSONs);

  console.log(teamsData);

  return json(teamsData[0]);
}

const computeTeams = (teamData) => {
    const computedTeams = [];

    for(let i = 0; i < teamData.length; i++) {
        const thisTeam = teamData[i];
        const team = {
            abbrev: thisTeam.abbrev,
            id: thisTeam.id,
            logo: thisTeam.logo,
            name: thisTeam.name,
            playoffSeed: thisTeam.playoffSeed,
            primaryOwner: thisTeam.primaryOwner,
            record: thisTeam.record.overall.wins,
            totalStats: thisTeam.valuesByStat,
        };
        
        computedTeams.push(team);
    }

    console.log(computedTeams);
    return computedTeams;
}
