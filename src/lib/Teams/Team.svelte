<script>
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { Icon } from '@smui/icon-button';
	import TeamRow from "./TeamRow.svelte"
  import { teamManagersStore } from '$lib/stores';
	
	export let teams;

	const digestData = (passedTeams) => {
		let digestedTeams = [];
		let parsedTeams = passedTeams.teams;

		for(const p in parsedTeams) {
			const team = parsedTeams[p];
			digestedTeams[p] = team;
		}

		digestedTeams.sort((a, b) => a.playoffSeed - b.playoffSeed);
		console.log(digestedTeams);
		return digestedTeams;
	}

	$: finalTeams = digestData(teams);

	// console.log(finalTeams);

	let innerWidth;

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
	h5 {
    text-align: center;
		margin: 0.2em auto;
	}
	
	.teamAvatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 40px;
		margin-right: 15px;
		border: 0.25px solid #777;
	}

	.team {
		margin: 4px 10px 10px;
	}

	:global(.clickable) {
		cursor: pointer;
	}

	:global(.teamInner) {
		box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
		display: block;
	    margin: 0 auto;
	}

	:global(.r_1) {
		text-align: center;
		background-color: var(--r1);
	}

	:global(.r_2) {
		text-align: center;
		background-color: var(--r2);
	}

	:global(.r_3) {
		text-align: center;
		background-color: var(--r3);
	}

	.result {
		width: 11px;
	}

	h3 {
		font-size: 1.5em;
		font-weight: 500;
		margin: 12px 0;
	}

	h5 {
		font-size: 1.2em;
		text-align: center;
	}

	@media (max-width: 500px) {
		.team {
			font-size: 0.9em;
		}
		.result {
			width: 9px;
		}

		h3 {
			font-size: 1.3em;
			margin: 3px 0;
		}

		h5 {
			font-size: 1.1em;
		}
	}

	@media (max-width: 340px) {
		h3 {
			font-size: 1.1em;
			margin: 6px 0;
		}

		h5 {
			font-size: 1em;
		}
	}

	@media (max-width: 400px) {
		.team {
			margin: 4px auto 10px;
		}
	}

	:global(.icon) {
		vertical-align: middle;
	}


	:global(.interactive) {
		vertical-align: middle;
		cursor: pointer;
	}

	:global(.bench) {
		background-color: var(--ir);
	}
</style>

<div class="team">
	<DataTable class="teamInner" table$aria-label="Team Name" style="width: {innerWidth * 0.95 > 380 ? 600 : innerWidth * 0.95}px;" >
		<Head> <!-- Team name  -->
			<Row>
				<Cell>
					Rank
				</Cell>
				<Cell>
					Team
				</Cell>
				<Cell>
				</Cell>
				<Cell>
				</Cell>
				<Cell>
					Record
				</Cell>
				<Cell>
					Win%
				</Cell>
				<Cell>
					GB
				</Cell>
			</Row>
		</Head>
		<Body>
			<!-- 	Teams	 -->
			{#each finalTeams as starter}
				<TeamRow team={starter} />
			{/each}
		</Body>
	</DataTable>
</div>
