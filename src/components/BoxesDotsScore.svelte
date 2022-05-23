<script>
    import { ownedSquares } from '../stores/boxes-dots'
</script>
<div class="scoreboard">
    <span class="text-pink-500 ml-auto">{$ownedSquares['1'].length}</span>
    <small class="mx-2">TO</small>
    <span class="text-cyan-500 mr-auto">{$ownedSquares['2'].length}</span>
</div>

<style>
    .scoreboard {
        @apply flex items-center w-36 mx-auto;
    }
    .scoreboard span {
         @apply rounded bg-gray-900 bg-opacity-80 inline-block px-3 py-1;
    }
</style>