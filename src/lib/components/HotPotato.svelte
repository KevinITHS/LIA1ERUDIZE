<script lang="ts">
	import { hotPotatoStore } from '$lib/utilities/stores/hotPotatoStore';
	import Potato from '$lib/components/potato.svelte';

	let winner: string | null;
	let eliminated: string | null;
</script>

<main>
	{$hotPotatoStore.roundsLeft}
	{#if $hotPotatoStore.playing}
		<h1>Hot Potato Game</h1>
		<section>
			{#each Object.entries($hotPotatoStore.players) as [playerId, playerName]}
				<div class="player">
					<h2>{playerName}</h2>
					{#if +playerId === $hotPotatoStore.PotatoHolder}
						<Potato exploded={$hotPotatoStore.roundsLeft === 0} />
					{/if}
				</div>
			{/each}
		</section>
		<button on:click={hotPotatoStore.passPotato}>Pass Potato</button>
	{:else}
		<h1>Game Over</h1>
		{#if eliminated}
			<p>{eliminated}</p>
		{:else}
			<p>Winner: {winner}</p>
		{/if}
		<button on:click={hotPotatoStore.startGame}>Start a New Game</button>
	{/if}
</main>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		gap: 10px;
		justify-items: center;
		align-items: center;
	}

	.player {
		width: 100px;
		height: 100px;
		background-color: #f0f0f0;
		position: relative;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 18px;
		border: 2px solid #000;
	}

	.player:nth-child(1) {
		grid-column: 3;
		grid-row: 1;
	}

	.player:nth-child(2) {
		grid-column: 1;
		grid-row: 3;
	}

	.player:nth-child(3) {
		grid-column: 5;
		grid-row: 3;
	}

	.player:nth-child(4) {
		grid-column: 2;
		grid-row: 5;
	}

	.player:nth-child(5) {
		grid-column: 4;
		grid-row: 5;
	}
</style>
