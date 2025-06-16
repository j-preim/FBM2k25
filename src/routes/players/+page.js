import { loadPlayers, waitForAll } from '$lib/utils/helper';

export async function load({fetch}) {
    const playersInfo = waitForAll(
        loadPlayers(fetch),
    )

    return {
        playersInfo
    };
}