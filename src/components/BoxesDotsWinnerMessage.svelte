<script>

    import { winner, ownedSquares, occupied } from '../stores/boxes-dots';
    import BoxesDotsScore from './BoxesDotsScore.svelte';
    
    $: message = !$winner ? false 
        : $winner === 'tie'
            ? `That's a Tie...`
            : `Player ${$winner} Wins!`;
    
    const resetGame = () => {
        ownedSquares.reset();
        occupied.reset();
    }
</script>

<div class={`flex flex-col w-screen h-screen items-center content-center winner-${$winner}`}>
    <div class="message flex m-auto max-w-lg flex-col content-center items-center mt-auto mb-8">
        <h1 class="text-4xl sm:text-5xl font-black text-center !leading-relaxed">{message}</h1>
    </div>
    <BoxesDotsScore />
    <button 
        class="button neon-button mb-auto !w-56 rounded-md mt-8"
        on:click={resetGame}>
        Play Again
    </button>
</div>

<style>
    .winner-1 {
        @apply bg-pink-500 text-pink-900;
    }
    .winner-2 {
        @apply bg-cyan-500 text-cyan-900;
    }

    button {
        --button-color: rgb(176 128 217);
    }
    button:hover {
        @apply text-gray-800;
    }

    .winner-1 button {
        --button-color: rgb(253, 162, 232);
    }

    .winner-2 button {
        --button-color: rgb(0, 255, 255);
    }
</style>
