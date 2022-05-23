import { writable } from 'svelte/store';
import { browser } from '$app/env';
const createScores = () => {
  let stored = (() => {
    let defaultScores = { snake: [], ticTacToe: [] };
    try {
      if (browser) {
        return JSON.parse(window.localStorage.arcadeScores);
      }
    } catch {
      return defaultScores;
    }
  })();
  const { set, update, subscribe } = writable(stored);
  return {
    subscribe,
    update: (/** @type {string | number} */ key, /** @type {any} */ value) =>
      update((scores) => {
        const current = scores[key] || [];
        if (current.length >= 100) {
          current.pop();
        }
        return {
          ...scores,
          [key]: [value, ...current],
        };
      }),
    set: (/** @type {any} */ key, /** @type {any} */ value) =>
      set((/** @type {any} */ scores) => {
        return {
          ...scores,
          [key]: value,
        };
      }),
  };
};

export const scores = createScores();

// Anytime the store changes, update the local storage value.
scores.subscribe(
  (value) => {
    if (browser) {
      window.localStorage.arcadeScores = JSON.stringify(value)
    }
  }
);
