<script>
	import LinearProgress from '@smui/linear-progress';
	import { Players } from '$lib/components'

	export let data;
	const playersInfo = data.playersInfo;
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
	{#await playersInfo}
		<div class="loading">
			<p>Retrieving player data...</p>
			<br />
			<LinearProgress indeterminate />
		</div>
	{:then [playersInfo]}
		<!-- promise was fulfilled -->
		<Players {playersInfo} /> <!-- displays players -->
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>
