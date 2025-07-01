<script>
	import { Row, Cell } from '@smui/data-table';
	import { round } from '$lib/utils/helper';
	
	export let team;

	// console.log(team.record);

	// const playerPosClass = player.pos.replace('1B', 'X1B').replace('2B', 'X2B').replace('3B', 'X3B');
</script>

<style>
	.teamLogo {
    position: relative;
		vertical-align: middle;
		height: 40px;
		width: 40px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: auto 45px;
    overflow: visible;
	}
	/* .teamLogo {
			width: 21px;
			position: absolute;
			top: 0;
			right: -16px;
	} */

	:global(.slot) {
		width: 22px !important;
    	padding: 1px 6px 1px 8px !important;
	}
	:global(.avatar) {
		width: 45px;
	}
	:global(.playerCell) {
		height: 45px !important;
		overflow-y: hidden !important;
	}

	:global(.nameCell) {
    	padding: 0 5px;
	}

	:global(.injury) {
		font-style: italic;
		font-weight: 700;
		font-size: 0.7em;
		margin-left: 0.5em;
		vertical-align:super;
	}

	:global(.Q) {
		color: #c09111;
	}

	:global(.OUT) {
		color: #851313;
	}

	:global(.IR) {
		color: #851313;
	}

	:global(.PUP) {
		color: #851313;
	}

	@media (max-width: 460px) {
		:global(.nameCell) {
			font-size: 0.9em;
		}
	}

    @media (max-width: 355px) {
        :global(.slot) {
            width: 22px !important;
            padding: 1px 2px 1px 2px !important;
        }
        :global(.avatar) {
            padding: 0px 16px 0px 2px !important;
        }
        
		:global(.nameCell) {
			font-size: 0.85em;
		}
    }

</style>

<Row>
	<Cell class="rank teamCell"><span class=""></span>{team.playoffSeed}</Cell>
	{#if team.logo}
	<Cell class="logo teamCell">
					<div class="teamLogo" style="{team.logo}">
								<img src={team.logo} class="teamLogo" alt="team logo"/>
					</div>
	</Cell>
	{/if}
	<Cell class="abbrev teamCell"><span class=""></span>{team.abbrev}</Cell>
	<Cell class="teamCell nameCell" colspan={team.name != "Empty" ? 1 : 2}>
		<div class="info">
				<!-- name -->
				{@html team.name}
				<!-- name -->
		</div>
	</Cell>
	<Cell class="record recordCell">{team.record.overall.wins}-{team.record.overall.losses}-{team.record.overall.ties}</Cell>
	<Cell class="win% recordCell">{round(team.record.overall.percentage)}</Cell>
	<Cell class="gb recordCell">{team.record.overall.gamesBack == 0 ? '-' : team.record.overall.gamesBack}</Cell>
</Row>