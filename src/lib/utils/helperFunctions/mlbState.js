import { get } from 'svelte/store';
import {mlbState} from '$lib/stores';

export const getMlbState = async () => {
	if(get(mlbState).currentSeasonId) {
		return get(mlbState);
	}
    const res = await fetch(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/flb/`, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok) {
		mlbState.update(() => data);
		return data;
	} else {
		throw new Error(data);
	}
}