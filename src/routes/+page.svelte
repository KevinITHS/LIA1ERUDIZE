<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let players = 5;
  let currentPlayer = 0;
  let timer: NodeJS.Timeout;
  let gameInProgress = false;
  let eliminationMessage = '';
  let buttonText = 'Start Game';
  let potatoHolder = '';
  
  // Function to start the game
  const startGame = () => {
    players = 5;
    currentPlayer = Math.floor(Math.random() * players);
    gameInProgress = true;
    buttonText = 'Pass Potato';
    potatoHolder = `Player ${currentPlayer + 1}`;
    startEliminationTimer();
  };

  // Function to start the elimination timer
  const startEliminationTimer = () => {
    timer = setTimeout(eliminatePlayer, getRandomInt(5, 15) * 1000);
  };

  // Function to eliminate a player
  const eliminatePlayer = () => {
    players--;
    eliminationMessage = `Player ${currentPlayer + 1} has been eliminated.`;
    if (players === 1) {
      endGame();
    } else {
      nextPlayer();
      startEliminationTimer(); // Reset the timer for the next elimination
    }
  };

  // Function to move to the next player
  const nextPlayer = () => {
    currentPlayer = (currentPlayer + 1) % players;
    potatoHolder = `Player ${currentPlayer + 1}`;
  };

  // Function to end the game
  const endGame = () => {
    gameInProgress = false;
    buttonText = 'Start Game';
    eliminationMessage = `Player ${currentPlayer + 1} is the winner!`;
    clearTimeout(timer);
  };

  // Function to get a random integer between min and max
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Run the startGame function when the component is mounted
  onMount(() => {
    startGame();
  });

  // Clean up the timer when the component is destroyed
  onDestroy(() => {
    clearTimeout(timer);
  });
</script>

<style>
  .container {
    text-align: center;
    padding: 20px;
  }

  .message {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .button {
    font-size: 18px;
    padding: 10px 20px;
    background-color: #0800ff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
</style>

<div class="container">
  <p class="message">{eliminationMessage}</p>
  <p class="message">Potato Holder: {potatoHolder}</p>
  {#if gameInProgress}
    <button class="button" on:click={nextPlayer}>Pass Potato</button>
  {:else}
    <button class="button" on:click={startGame}>{buttonText}</button>
  {/if}
  <p class="message">Players left: {players}</p>
</div>
