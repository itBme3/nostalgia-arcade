<script>
import { occupied, currentPlayer, ownedSquares, ownedSides } from '../stores/boxes-dots'
import { confettiExplosion } from '../utils/boxes-dots';
import {afterUpdate} from 'svelte';
export let squareSize;
export let sides;

let squareElem;
$: occupiedSides = sides.map(side =>   
  $occupied.map(i => i.join(',')).includes(side.join(',')) ? true : false);
const squareKey = sides.map(s => s.join(',')).join('|')
$: ownsSquare = $ownedSquares['1']?.includes(squareKey) ? '1' 
  : $ownedSquares['2']?.includes(squareKey) ? '2'
  : null;

const updateOccupied = (side) => {
  occupied.update(side);
  const currentOwnCount = $ownedSquares[$currentPlayer].length;
  setTimeout(() => {
    if(currentOwnCount < $ownedSquares[$currentPlayer].length) {
      return
    }
    currentPlayer.set($currentPlayer === 1 ? 2 : 1)
  }, 200)
}

afterUpdate(() => {
  if([...$ownedSquares[1], ...$ownedSquares[2]].includes(squareKey)) {
    return;
  }
  if(occupiedSides.filter(o => !!o).length === 4) {
    if ($ownedSquares[$currentPlayer].includes(squareKey)) {
      return;
    }
    ownedSquares.update($currentPlayer, squareKey);
      confettiExplosion(squareElem, $currentPlayer === 1 ? 'pink' : 'blue')
  }
})
</script>

<div bind:this={squareElem}
  class={`connect-dot-square relative ${ownsSquare !== null ? `owned-${ownsSquare}` : ''}`}
  style={`height: ${squareSize}px; width: ${squareSize}px`}>

  {#each ['top', 'right', 'bottom', 'left'] as side, i}
    {#if !$ownedSides.includes(sides[i].join(','))}
      <button class={`side ${side} occupied-${occupiedSides[i]}`} disabled={occupiedSides[i]} on:click={() => updateOccupied(sides[i])}></button>
    {/if}
  {/each}

</div>

<style lang="scss">
.connect-dot-square {
  @apply bg-gray-800 transform relative;
}
.side {
  @apply absolute -left-px -right-px -top-px -bottom-px transform flex items-center content-center;
  
}
.side::after {
  content: "";
  @apply m-auto bg-gray-900 w-[2px] h-[2px];
}
.side.top::after, .side.bottom::after {
  @apply w-full;
}
.side.left::after, .side.right::after {
  @apply h-full;
}
.side.top, .side.bottom {
  @apply h-[8px];
}

.side.left, .side.right {
  @apply w-[8px];
}

.side.top {
    @apply w-full bottom-auto -translate-y-1/2;
  }
.side.bottom {
    @apply w-full top-auto translate-y-1/2;
  }
.side.left {
    @apply h-full right-auto -translate-x-1/2;
  }
.side.right {
  @apply h-full left-auto  translate-x-1/2;
}
.owned-1, .owned-2 {
  @apply scale-[.97];
}
.owned-1 .side, .owned-2 .side {
    display: none !important;
}
.owned-1 {
  @apply bg-pink-500;
}
.owned-2 {
  @apply bg-cyan-500;
}
.side:hover::after, .occupied-true::after {
    @apply bg-gray-100;
}

</style>