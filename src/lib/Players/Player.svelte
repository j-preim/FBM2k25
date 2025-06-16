<script>
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { Icon } from '@smui/icon-button';
	import PlayerRow from "./PlayerRow.svelte"
  import { teamManagersStore } from '$lib/stores';
	
	export let players;

	// $: team = leagueTeamManagers.teamManagersMap[leagueTeamManagers.currentSeason][roster.roster_id].team;

	const digestData = (passedPlayers) => {
		let digestedPlayers = [];

		// console.log(passedPlayers);
	
		for(let i = 0; i < passedPlayers.length; i++) {
			let player = {};

			let team = null;
			switch (passedPlayers[i].proTeamId) {
				case 0:
					team = "FA";
					break;
				case 1:
					team = "Bal";
					break;
				case 2:
					team = "Bos";
					break;
				case 3:
					team = "LAA";
					break;
				case 4:
					team = "ChW";
					break;
				case 5:
					team = "Cle";
					break;
				case 6:
					team = "Det";
					break;
				case 7:
					team = "KC";
					break;
				case 8:
					team = "Mil";
					break;
				case 9:
					team = "Min";
					break;
				case 10:
					team = "NYY";
					break;
				case 11:
					team = "Oak";
					break;
				case 12:
					team = "Sea";
					break;
				case 13:
					team = "Tex";
					break;
				case 14:
					team = "Tor";
					break;
				case 15:
					team = "Atl";
					break;
				case 16:
					team = "ChC";
					break;
				case 17:
					team = "Cin";
					break;
				case 18:
					team = "Hou";
					break;
				case 19:
					team = "LAD";
					break;
				case 20:
					team = "Wsh";
					break;
				case 21:
					team = "NYM";
					break;
				case 22:
					team = "Phi";
					break;
				case 23:
					team = "Pit";
					break;
				case 24:
					team = "StL";
					break;
				case 25:
					team = "SD";
					break;
				case 26:
					team = "SF";
					break;
				case 27:
					team = "Col";
					break;
				case 28:
					team = "Mia";
					break;
				case 29:
					team = "Ari";
					break;
				case 30:
					team = "TB";
					break;
			
				default:
					break;
			}

			let position = null;
			switch (passedPlayers[i].defaultPositionId) {
				case 0:
					position = "C";
					break;
				case 1:
					position = "SP";
					break;
				case 2:
					position = "C";
					break;
				case 3:
					position = "1B";
					break;
				case 4:
					position = "2B";
					break;
				case 5:
					position = "3B";
					break;
				case 6:
					position = "SS";
					break;
				case 7:
					position = "OF";
					break;
				case 8:
					position = "OF";
					break;
				case 9:
					position = "OF";
					break;
				case 10:
					position = "OF";
					break;
				case 11:
					position = "RP";
					break;
				case 14:
					position = "SP";
					break;
				case 15:
					position = "RP";
					break;
				case 17:
					position = "IL";
					break;
			
				default:
					break;
			}

			if(passedPlayers[i].proTeamId !== 0) {
				player = {
					id: passedPlayers[i].id,
					name: `${passedPlayers[i].firstName} ${passedPlayers[i].lastName}`,
					pos: position,
					teamId: passedPlayers[i].proTeamId,
					teamAb: team,
					avatar: `background-image: url(https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/${passedPlayers[i].id}.png&w=192&h=140&cb=1)`,
				}
				i++;
				digestedPlayers.push(player);
			}	
		}

		// console.log(digestedPlayers);
		
		return digestedPlayers;
	}

	$: finalStarters = digestData(players);

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
	<DataTable class="teamInner" table$aria-label="Team Name" style="width: {innerWidth * 0.95 > 380 ? 380 : innerWidth * 0.95}px;" >
		<Head> <!-- Team name  -->
			<Row>
				<Cell>
					Pos.
				</Cell>
				<Cell>
					Player
				</Cell>
				<Cell>
				</Cell>
			</Row>
		</Head>
		<Body>
			<!-- 	Starters	 -->
			{#each finalStarters as starter}
				<PlayerRow player={starter} />
			{/each}
		</Body>
	</DataTable>
</div>
