<script>
import { boardMatrix, boardDimensions } from '../stores/boxes-dots.js'
import { currentPlayer } from '../stores/boxes-dots.js'
import { onMount } from 'svelte'
import BoxesDotsSquare from './BoxesDotsSquare.svelte'
import BoxesDotsScore from './BoxesDotsScore.svelte'
let w;
let h;
const squareSize = 80;
const setMatrix = () => {
  boardDimensions.set([Math.floor(h / squareSize), Math.floor(w / squareSize)])
}
onMount(() => {
  setMatrix()
})
</script>

<svelte:window on:resize={setMatrix} />
<h1 class="text-xl tracking-wider text-gray-800 py-4 font-bold {$currentPlayer === 1 ? 'bg-pink-500' : 'bg-cyan-500'}">Player { $currentPlayer }'s Turn</h1>

<div class="my-2 text-gray-600">
    <BoxesDotsScore />
</div>

<div class="flex content-center text-center max-w-3xl w-[calc(100vw-2rem)] h-[80vh] mx-auto"
  bind:offsetWidth={w}
  bind:offsetHeight={h}>

  <div class="boxes-dots-matrix mx-auto flex flex-col w-auto">
    {#each $boardMatrix as row, i  (`${i}`)}
      <div class="matrix-row flex">
        {#each row as square, ii (`${i},${ii}`)}
          <BoxesDotsSquare 
            squareSize={squareSize} 
            sides={$boardMatrix[i][ii]}
          />
        {/each}
      </div>
    {/each}
  </div>
</div>