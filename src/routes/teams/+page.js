import { loadTeams, waitForAll } from '$lib/utils/helper';

export async function load({fetch}) {
    const teamsInfo = waitForAll(
        loadTeams(fetch),
    )

    return {
        teamsInfo
    };
}