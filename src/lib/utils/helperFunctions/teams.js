import { get } from "svelte/store";
import { teams } from "$lib/stores";
import { browser } from "$app/environment";

export const loadTeams = async (servFetch, refresh = false) => {
  if (get(teams)[1426]) {
    return {
      teams: get(teams),
      stale: false,
    };
  }

  const smartFetch = servFetch ?? fetch;

  const now = Math.round(new Date().getTime() / 1000);
  let teamsInfo = null;
  let expiration = null;
  if (browser) {
    teamsInfo = JSON.parse(localStorage.getItem("teamsInfo"));
    expiration = parseInt(localStorage.getItem("expiration"));
  }

  if (
    teamsInfo &&
    teamsInfo[1426] &&
    expiration &&
    now > expiration &&
    !refresh
  ) {
    return {
      teams: teamsInfo,
      stale: true,
    };
  }

  if (!teamsInfo || !expiration || now > expiration) {
    const res = await smartFetch(`/api/fetch_teams_info`, { compress: true });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data);
    }

    if (browser) {
      localStorage.setItem("teamsInfo", JSON.stringify(data));

      const ts = Math.round(new Date().getTime() / 1000);
      const newExpiration = ts + 24 * 3600;

      localStorage.setItem("expiration", newExpiration);

      teams.update(() => data);
    }

    return {
      teams: data,
      stale: false,
    };
  }
  teams.update(() => teamsInfo);
  return {
    teams: teamsInfo,
    stale: false,
  };
};
