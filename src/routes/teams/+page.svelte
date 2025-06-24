<script>
	import LinearProgress from '@smui/linear-progress';
	import { Teams } from '$lib/components'

	export let data;
	const teamsInfo = data.teamsInfo;
	// console.log(playersInfo);
</script>

<style>
	.holder {
		position: relative;
		z-index: 1;
	}
	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}
</style>

<div class="holder">
	{#await teamsInfo}
		<div class="loading">
			<p>Retrieving team data...</p>
			<br />
			<LinearProgress indeterminate />
		</div>
	{:then [teamsInfo]}
		<!-- promise was fulfilled -->
		<Teams {teamsInfo} /> <!-- displays teams -->
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>
