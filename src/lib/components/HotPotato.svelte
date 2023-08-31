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
      const roundsLeft = $hotPotatoStore.roundsLeft;
      const playersLeft = Object.keys($hotPotatoStore.players).map(Number);
  
      // Check if there's more than one player left
      if (playersLeft.length > 1) {
        // Choose a random player from the remaining players
        const randomIndex = Math.floor(Math.random() * playersLeft.length);
        const playerId = playersLeft[randomIndex];
        const playerName = $hotPotatoStore.players[playerId];
  
        // Eliminate the player
        eliminatePlayer(playerId);
  
        eliminated = `${playerName} ... and has been eliminated!`;
  
        // Update the rounds left
        hotPotatoStore.update((state) => ({
          ...state,
          roundsLeft: state.roundsLeft - 1,
        }));
      } else {
        // If there's only one player left, declare them as the winner
        winner = $hotPotatoStore.players[playersLeft[0]];
      }
    }
  </script>
  
  <main>
    {#if $hotPotatoStore.playing}
      <h1>Hot Potato Game</h1>
      {#each Object.entries($hotPotatoStore.players) as [playerId, playerName]}
        {#if +playerId === $hotPotatoStore.PotatoHolder}
          <h2>{playerName}</h2>
          {#if eliminated === playerName}
            <h3>... and has been eliminated!</h3>
          {:else}
            <h3>is holding potato</h3>
          {/if}
        {:else}
          <h2>{playerName}</h2>
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
  </style>
  