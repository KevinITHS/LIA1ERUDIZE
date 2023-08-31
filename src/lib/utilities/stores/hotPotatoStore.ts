import { writable } from 'svelte/store';

interface HotPotatoState {
	PotatoHolder: number;
	players: Record<number, string>;
	playing: boolean;
	winner: string | null;
	roundsLeft: number;
	eliminatedPlayer: string | null;
}

function getRandomBetween0To4() {
	return Math.floor(Math.random() * 5);
}

const INITIAL_STATE: HotPotatoState = {
	PotatoHolder: getRandomBetween0To4(),
	players: {
		0: 'player 1',
		1: 'player 2',
		2: 'player 3',
		3: 'player 4',
		4: 'player 5'
	},
	playing: false,
	winner: null,
	roundsLeft: 5,
	eliminatedPlayer: null
};

const hotPotatoStore = writable<HotPotatoState>(INITIAL_STATE);

function startGame() {
	hotPotatoStore.set({ ...INITIAL_STATE, playing: true });
}

function passPotato() {
	hotPotatoStore.update((state) => {
		const newPotatoHolder = getRandomBetween0To4();
		const roundsLeft = state.roundsLeft - 1;
		return { ...state, PotatoHolder: newPotatoHolder, roundsLeft };
	});
}

function eliminatePlayer(playerId: number) {
	hotPotatoStore.update((state) => {
		const eliminatedPlayer = state.players[playerId];
		const updatedPlayers = { ...state.players };
		delete updatedPlayers[playerId];
		return {
			...state,
			players: updatedPlayers,
			eliminatedPlayer
		};
	});
}

function endGame(winner: string) {
	hotPotatoStore.update((state) => {
		return { ...state, playing: false, winner };
	});
}

export { hotPotatoStore, startGame, passPotato, eliminatePlayer, endGame };
