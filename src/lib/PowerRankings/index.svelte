<script>
    import {getMlbState, getLeagueRosters, getLeagueTeamManagers, waitForAll, loadPlayers, getLeagueData} from '$lib/utils/helper';
    import PowerRankingsDisplay from './PowerRankingsDisplay.svelte';
    import LinearProgress from '@smui/linear-progress';
    
    const helperPromises = waitForAll(
        getMlbState(),
        getLeagueRosters(),
        getLeagueTeamManagers(),
        getLeagueData(),
        loadPlayers(null),
    );

</script>

<style>
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

{#await helperPromises}
    <!-- promise is pending -->
    <div class="loading">
        <p>Calculating power rankings...</p>
        <LinearProgress indeterminate />
    </div>
{:then [mlbState, rostersData, leagueTeamManagers, leagueData, playersInfo]}
    {#if leagueData.status != 'pre_draft' && leagueData.status != 'complete'}
        <PowerRankingsDisplay {mlbState} {rostersData} {leagueTeamManagers} {leagueData} {playersInfo} />
    {/if}
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}



