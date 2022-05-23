<script>
import { scores } from '../stores/scores.js'
export let keys = ['snake']
export let classes = {
  list: 'max-h-[90px]',
  listItem: 'border border-t-0 border-l-0 border-r-0 border-gray-900 border-opacity-20 !flex content-between items-center'
}
</script>

<div class="arcade-scores">
  <small>scores:</small>
  <ul class={'list overflow-y-scroll ' + classes.list }>
    {#each keys as key}
      {#each $scores[key] as score, i}
        <li class={'list-item ' + classes.listItem }>
          <span class="opacity-40 mr-auto">#{i + 1}:</span> <strong class="ml-auto">{score}</strong>
        </li>
      {/each}
    {/each}
  </ul>
</div>

<style></style>