<script>

import chroma from 'chroma-js';
import { occupied, food } from '../stores/snake.js';
export let squareSize ;
export let squareIndex ;
export let bgColor ;
$: isOccupied = $occupied.map(s => s.join()).includes(squareIndex.join());
$: isFood = Array.isArray($food) && $food.join() === squareIndex.join();
$: squareStyle = [
  `z-index: ${isFood ? '2' : '0'}`,
  `height: ${squareSize}`,
  `width: ${squareSize}`,
  isOccupied ? ` background-color: ${bgColor}; box-shadow: 0 0 120px ${chroma(bgColor).alpha(.5)}` : ''
].join('; ')
</script>
<div 
  id={`square-${squareIndex.join('-')}`} class={`snake-square${isOccupied ? ' occupied' : ''}`}
  style={squareStyle}>
  {#if isFood}
    <span class="absolute inset-px" 
      style="background: url(/svg/peach.svg); background-size: 70% auto; background-position: center; background-repeat: no-repeat"
    />
  {/if}
</div>

<style>
.snake-square {
  @apply transform scale-90 bg-gray-800 block text-center relative;

}
</style>