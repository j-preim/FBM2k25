import { leagueID } from "$lib/utils/leagueInfo";
import { round } from "$lib/utils/helperFunctions/universalFunctions";
import { waitForAll } from "$lib/utils/helperFunctions/multiPromise";
import { json, error } from "@sveltejs/kit";

export async function GET() {
  // get MLB state from sleeper (scoring period, matchup, and year)
  const [mlbStateRes, leagueDataRes, playoffsRes] = await waitForAll(
    fetch(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/flb/`, {
      compress: true,
    }),
    fetch(
      `https://lm-api-reads.fantasy.espn.com/apis/v3/games/flb/seasons/2025/segments/0/leagues/${leagueID}?view=mSettings`,
      {
        compress: true,
        credentials: "include",
        headers: {
          cookie:
            "SWID={20135656-6F94-4144-BFCB-7D5DCAF263EE};espn_s2=AEC017SjlLDQVGg5O1VLCJlIPtEi4bse%2B9Jrx%2BQbESgP5cEpmP3izjY4QI2nKuTdS3xGnDdAcFcE1f%2B3IQ3Wsg9GliCyRyWe74imuI4oN705HCWE0KD2ims0hqAiLvcwaT5GPYHxWMymeGUrWwJnZPEm7SInl9K7JF4jILdIBL96eiLITUvwfaICYwtEk0eOlpItrlJPbpTh4fTGTtD%2BtTNqjyaMqHxSzGp%2BdiI5ijukZ6WzNc7zo6OXUDOJCdd0m8ZLflMPYt5pZinOBN9LCDvkHXYQuW5FofdiGtwfDhz%2F%2Fw%3D%3D;",
        },
      }
    ),
    fetch(
      `https://lm-api-reads.fantasy.espn.com/apis/v3/games/flb/seasons/2025/segments/0/leagues/${leagueID}?view=mMatchupScore&view=mProjectedPlayoffMatchups`,
      {
        compress: true,
        credentials: "include",
        headers: {
          Cookie:
            "SWID={20135656-6F94-4144-BFCB-7D5DCAF263EE};espn_s2=AEC017SjlLDQVGg5O1VLCJlIPtEi4bse%2B9Jrx%2BQbESgP5cEpmP3izjY4QI2nKuTdS3xGnDdAcFcE1f%2B3IQ3Wsg9GliCyRyWe74imuI4oN705HCWE0KD2ims0hqAiLvcwaT5GPYHxWMymeGUrWwJnZPEm7SInl9K7JF4jILdIBL96eiLITUvwfaICYwtEk0eOlpItrlJPbpTh4fTGTtD%2BtTNqjyaMqHxSzGp%2BdiI5ijukZ6WzNc7zo6OXUDOJCdd0m8ZLflMPYt5pZinOBN9LCDvkHXYQuW5FofdiGtwfDhz%2F%2Fw%3D%3D;",
        },
      }
    )
  );

  const [mlbState, leagueData, playoffs] = await waitForAll(
    mlbStateRes.json(),
    leagueDataRes.json(),
    playoffsRes.json()
  );

  console.log(leagueData);

  let year = mlbState.currentSeasonId;
  const regularSeasonLength = leagueData.settings.scheduleSettings.matchupPeriodCount;
  const playoffLength = leagueData.settings.scheduleSettings.playoffMatchupPeriodLength * 2;
  const fullSeasonLength = regularSeasonLength + playoffLength;

  const resPromises = [
    fetch(
      `https://lm-api-reads.fantasy.espn.com/apis/v3/games/flb/seasons/2025/players?view=players_wl`,
      { compress: true }
    ),
  ];

  for (let week = 1; week <= fullSeasonLength + 3; week++) {
    resPromises.push(
      fetch(
        `https://api.sleeper.app/projections/nfl/${year}/${week}?season_type=regular&position[]=DB&position[]=DEF&position[]=DL&position[]=FLEX&position[]=IDP_FLEX&position[]=K&position[]=LB&position[]=QB&position[]=RB&position[]=REC_FLEX&position[]=SUPER_FLEX&position[]=TE&position[]=WR&position[]=WRRB_FLEX&order_by=ppr`,
        { compress: true }
      )
    );
  }

  const responses = await waitForAll(...resPromises);

  const resJSONs = [];
  for (const res of responses) {
    if (!res.ok) {
      throw error(500, "No luck");
    }
    resJSONs.push(res.json());
  }

  const weeklyData = await waitForAll(...resJSONs);

  const playerData = weeklyData.shift(); // first item is all player data, remaining items are weekly data for projections

  const scoringSettings = leagueData.scoring_settings;

  return json(computePlayers(playerData, weeklyData, scoringSettings));
}

const computePlayers = (playerData, weeklyData, scoringSettings) => {
  const computedPlayers = {};

  // create non weekly dependent player info
  for (const id in playerData) {
    const projPlayer = playerData[id];
    const player = {
      // injury_notes: projPlayer.injury_notes,
      fn: projPlayer.first_name,
      ln: projPlayer.last_name,
      pos: projPlayer.position,
    };
    if (projPlayer.team) {
      player.t = projPlayer.team;
      player.wi = {};
    }
    if (projPlayer.team && projPlayer.injury_status) {
      player.is = projPlayer.injury_status;
    }

    computedPlayers[id] = player;
  }

  // add weekly projections
  for (let week = 1; week <= weeklyData.length; week++) {
    for (const player of weeklyData[week - 1]) {
      const id = player.player_id;

      // check if the player is active in the NFL
      if (computedPlayers[id] == null || !computedPlayers[id].wi) continue;

      computedPlayers[id].wi[week] = {
        p: calculateProjection(player.stats, scoringSettings),
        o: player.opponent,
      };
    }
  }

  computedPlayers["OAK"] = computedPlayers["ATH"];
  return computedPlayers;
};

const calculateProjection = (projectedStats, scoreSettings) => {
  let score = 0;
  for (const stat in projectedStats) {
    const multiplier = scoreSettings[stat] ? scoreSettings[stat] : 0;
    score += projectedStats[stat] * multiplier;
  }
  return round(score);
};
