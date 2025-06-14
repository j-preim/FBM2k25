import { get } from "svelte/store";
import { leagueData } from "$lib/stores";
import { leagueID } from "$lib/utils/leagueInfo";

export const getLeagueData = async (queryLeagueID = leagueID) => {
  if (get(leagueData)[queryLeagueID]) {
    return get(leagueData)[queryLeagueID];
  }

  const smartFetch = fetch;

  const res = await smartFetch(`/api/fetch_league_info`, {
    compress: true,
  }).catch((err) => {
    console.error(err);
  });
  const data = await res.json().catch((err) => {
    console.error(err);
  });

  if (res.ok) {
    leagueData.update((ld) => {
      ld[queryLeagueID] = data;
      return ld;
    });
    return data;
  } else {
    throw new Error(data);
  }
};
