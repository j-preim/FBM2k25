<script>
	import { Row, Cell } from '@smui/data-table';
	
	export let player;

	// const playerSlotClass = player.slot.replace('/', '').replace('SUPER_', 'S-').replace('REC_', 'R-');
	// const playerSlot = player.slot.replace('SUPER_', 'S ').replace('REC_', 'R ');

	const playerPosClass = player.pos.replace('1B', 'X1B').replace('2B', 'X2B').replace('3B', 'X3B');
</script>

<style>
	.playerAvatar {
        position: relative;
		vertical-align: middle;
		height: 40px;
		width: 40px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: auto 45px;
        overflow: visible;
	}
	.teamLogo {
			width: 21px;
			position: absolute;
			top: 0;
			right: -16px;
	}
	.pos {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		width: 46px;
		height: 32px;
	}

	.C {
		background-color: var(--QB);
	}

	.X1B {
		background-color: var(--WR);
	}

	.X2B {
		background-color: var(--RB);
	}

	.SS {
		background-color: var(--TE);
	}

	.CI {
		background: linear-gradient(to right, var(--WR), var(--WR) 33.33%, var(--RB) 33.33%, var(--RB) 66.66%, var(--TE) 66.66%);
	}

	.MI {
		background: linear-gradient(to right, var(--WR), var(--WR) 50%, var(--RB) 50%);
	}

	.X3B {
		background-color: var(--K);
	}

	.S-FLEX {
		background: linear-gradient(to right, var(--WR), var(--WR) 25%, var(--RB) 25%, var(--RB) 50%, var(--TE) 50%, var(--TE) 75%, var(--QB));
		background-color: #8f66ff;
	}

	.R-FLEX {
		background: linear-gradient(to right, var(--WR), var(--WR) 50%, var(--TE) 50%);
	}

	.OF {
		background-color: var(--DEF);
	}

	.DH {
		background-color: var(--DL);
	}

	.SP {
		background-color: var(--LB);
	}

	.RP {
		background-color: var(--DB);
	}

	.IDP {
		background: linear-gradient(to right, var(--DL), var(--DL) 33.33%, var(--LB) 33.33%, var(--LB) 66.66%, var(--DB) 66.66%);
	}

	.BN {
		background-color: var(--BN);
	}

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

	span.nickname {
		color: #888;
		font-style: italic;
		font-size: 0.8em;
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

  .additionalInfo {
    display: inline-block;
    font-size: 0.7em;
  }

    /* position text colors */
	.text-C {
		color: var(--QB);
	}

	.text-X1B {
		color: var(--WR);
	}

	.text-X2B {
		color: var(--RB);
	}

	.text-SS {
		color: var(--TE);
	}

	.text-X3B {
		color: var(--K);
	}

	.text-OF {
		color: var(--DEF);
	}

	.text-DH {
		color: var(--DL);
	}

	.text-SP {
		color: var(--LB);
	}

	.text-RP {
		color: var(--DB);
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
        .pos {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            width: 42px;
            height: 24px;
            font-size: 0.8em;
        }
		:global(.nameCell) {
			font-size: 0.85em;
		}
    }

</style>

{#if player.pos !== "FA"}
	<Row>
		<Cell class="slot playerCell"><span class="pos {playerPosClass}">{player.pos}</span></Cell>
		{#if player.avatar}
			<Cell class="avatar playerCell">
							<div class="playerAvatar" style="{player.avatar}">
									{#if player.teamAb && player.pos != "DEF"}
											<img src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/{player.teamAb.toLowerCase()}.png&h=150&w=150" class="teamLogo" alt="team logo"/>
									{/if}
							</div>
					</Cell>
		{/if}
		<Cell class="playerCell nameCell" colspan={player.name != "Empty" ? 1 : 3}>
			<div class="info">
					<!-- name -->
					{@html player.name}
					<!-- name -->
							<div class="additionalInfo">
									<span class="text-{playerPosClass}" >{@html player.pos}</span>
									{#if player.teamAb}
											&nbsp;-&nbsp;
											{player.teamAb}
									{/if}
							</div>
			</div>
		</Cell>
	</Row>
{/if}