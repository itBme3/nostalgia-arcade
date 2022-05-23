<script>
import { winner } from '../stores/boxes-dots'
import BoxesDotsBoard from '../components/BoxesDotsBoard.svelte'
import BoxesDotsWinnerMessage from '../components/BoxesDotsWinnerMessage.svelte'

</script>

{#if !$winner}
<BoxesDotsBoard />
{:else}
<BoxesDotsWinnerMessage />
{/if}