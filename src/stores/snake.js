import { browser } from '$app/env';
import { randomInt } from '../utils/funcs.js';
import { writable, derived } from 'svelte/store';
import { getColors } from '../utils/coloring';

export const direction = writable('right');

export const squares = writable([]);

export const occupied = writable([[3, 3]]);

export const colors = derived(occupied, ($occupied) => getColors($occupied));

export const createDifficulty = () => {
  let stored = (() => {
    try {
      if (browser) {
        return parseInt(window.localStorage.snakeDifficulty) > 0
          ? parseInt(window.localStorage.snakeDifficulty)
          : 5;
      }
    } catch {
      return 5;
    }
  })();
  const { set, update, subscribe } = writable(stored);
  return { set, update, subscribe };
};

export const difficulty = createDifficulty();
difficulty.subscribe((value) => {
  try {
    if (browser) {
      window.localStorage.snakeDifficulty = value
    }
  } catch(err){console.warn(err)}
});

const createFood = () => {
  const { subscribe, set, update } = writable([0, 0]);
  return {
    subscribe,
    set,
    update,
    reset: (/** @type {any} */ matrixCount) => set([randomInt(0, matrixCount), randomInt(0, matrixCount)]),
  };
};

export const food = createFood();
