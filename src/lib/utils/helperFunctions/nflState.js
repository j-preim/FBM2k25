import { get } from 'svelte/store';
import {nflState} from '$lib/stores';

export const getNflState = async () => {
	if(get(nflState).currentSeasonId) {
		return get(nflState);
	}
    const res = await fetch(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/flb/`, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok) {
		nflState.update(() => data);
		return data;
	} else {
		throw new Error(data);
	}
}