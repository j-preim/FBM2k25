<script>
	import { loadTeams } from '$lib/utils/helper';
	import Team from './Team.svelte'

	export let teamsInfo;

	let teams = teamsInfo;
	// console.log("teams: " + teams);

	const refreshTeams = async () => {
		const newTeamsInfo = await loadTeams(null, true);
		teams = newTeamsInfo;
	}

	if(teamsInfo.stale) {
		refreshTeams();
	}
</script>

<style>
	.teams {
		position: relative;
		z-index: 1;
	}
</style>

<div class="teams">
	<Team {teams} />
</div>