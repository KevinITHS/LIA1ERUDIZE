<script lang="ts">
    import { hotPotatoStore, startGame, passPotato, eliminatePlayer } from '$lib/utilities/stores/hotPotatoStore';
  
    let winner: string | null;
    let eliminated: string | null;
  
    // Function to handle passing the potato
    function handlePassPotato() {
      passPotato();
      checkElimination();
    }
  
    // Function to check if a player should be eliminated
    function checkElimination() {
      const playerId = $hotPotatoStore.PotatoHolder;
      const playerName = $hotPotatoStore.players[playerId];
  
      if ($hotPotatoStore.roundsLeft === 0) {
        eliminatePlayer(playerId);
        eliminated = `${playerName} ... and was eliminated!`;
      }
    }
  </script>
  
  <main>
    {#if $hotPotatoStore.playing}
      <h1>Hot Potato Game</h1>
      {#each Object.entries($hotPotatoStore.players) as [playerId, playerName]}
        {#if +playerId === $hotPotatoStore.PotatoHolder}
          <h2>{playerName}</h2>
          <h3>is holding potato</h3>
        {:else}
          <h2>{playerName}</h2>
        {/if}
        {#if eliminated === playerName}
          <h3>... and was eliminated!</h3>
        {/if}
      {/each}
      <button on:click={handlePassPotato}>Pass the Potato</button>
    {:else}
      <h1>Game Over</h1>
      {#if eliminated}
        <p>{eliminated}</p>
      {:else}
        <p>Winner: {winner}</p>
      {/if}
      <button on:click={() => startGame()}>Start a New Game</button>
    {/if}
  </main>
  
  <style>
    /* Add your CSS styles here */
  </style>
  