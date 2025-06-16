<script>
	import { loadPlayers } from '$lib/utils/helper';
	import Player from './Player.svelte'

	export let playersInfo;

	let players = playersInfo.players;
	// console.log("players: " + players);

	const refreshPlayers = async () => {
		const newPlayersInfo = await loadPlayers(null, true);
		players = newPlayersInfo.players;
	}

	if(playersInfo.stale) {
		refreshPlayers();
	}
</script>

<style>
	.players {
		position: relative;
		z-index: 1;
	}
</style>

<div class="players">
	<Player {players} />
</div>