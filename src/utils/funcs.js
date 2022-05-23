import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
  const interval = setInterval(callback, milliseconds);
  onDestroy(() => {
    clearInterval(interval);
  });
  return interval;
}

export const randomInt = (min, max, current = []) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  for (let i = 0; i < max * 10; i++) {
    let random = Math.floor(Math.random() * (max - min)) + min;
    if (!!!current.includes(random)) return random;
    for (let x = 0; x < 10; x++) {
      const randomInc = random + x;
      if (!!!current.includes(random + x) && random + x <= max)
        return randomInc;
      const randomDec = random - x;
      if (!!!current.includes(randomDec) && randomDec >= min) return randomDec;
    }
  }
};
