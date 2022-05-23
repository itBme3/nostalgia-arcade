<script>
    import { browser } from '$app/env';
    import {board, results, winningSpaces} from '../stores/tic-tac-toe'
    import {onMount} from 'svelte'
    let currentPlayer = 'x'

    const setSpace = (row, col) => {
        if(['x','o'].includes($board[row][col]) || (typeof $results === 'string' && ['x','o','cats'].includes($results))) {
            return
        }
        board.setSpace({row, col, player: currentPlayer});
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
        return currentPlayer
    }

    onMount(() => {
        board.reset()
    })

    $: gameover = (() => {
        const classes = {
            x: 'bg-pink-500', 
            o: 'bg-cyan-500', 
            cats: 'bg-yellow-500'
        };
        if(browser) {
            // @ts-ignore
            Object.values(classes).forEach(c => document !== null ? document.querySelector('body').classList.remove(c) : '');
            document.querySelector('body').classList.add(classes[$results])
        }
        return classes[$results]
    })()

</script>

<div class={`results-${$results}`}>
    {#if typeof $results === 'string'}
        <div class="gameover-message text-4xl text-center mx-auto mt-6 max-w-xs">
            <h2 class="mb-6 font-arcade uppercase opacity-70 leading-relaxed">
                {#if $results === 'cats'}
                Cat's Game
                {:else}
                {$results}<span class="lowercase">s</span> win!
                {/if}
            </h2>
            <button class="button neon-button text-xl font-arcade"
                on:click={() => board.reset()}>
                play again
            </button>
            {#if $results === 'cats'}
            <img class="mx-auto mt-20" src="/svg/cat.svg" alt="cat's game" />
            {/if}
        </div>
    {:else}
    <h2 class={`text-2xl uppercase py-2 ${currentPlayer === 'x' ? 'bg-pink-500 text-pink-900' : 'bg-cyan-500 text-cyan-900'}`}>
        {currentPlayer}'<span class="lowercase">s</span> Turn
    </h2>
    {/if}

    <div class={`tic-tac-toe-board h-auto mt-12 relative`}>
        {#each $board as row, i}
        <div class="row flex items-center content-center m-auto">
            {#each row as space, ii}
            <button 
                on:click={() => setSpace(i, ii)}
                class={`space${ $winningSpaces.includes(`${i},${ii}`) ? ' winning-space' : ''}`} 
                disabled={$board[i][ii] !== null}>
                <span class={`m-auto text-4xl ${space === 'x' ? 'text-pink-500' : 'text-cyan-500'}`}>{['x','o'].includes(space) ? space : ''}</span>
            </button>
            {/each}
        </div>
        {/each}
    </div>
</div>
<style>
    .tic-tac-toe-board {
        @apply mx-auto max-w-[400px] space-y-1;
    }
    .tic-tac-toe-board .row {
        @apply space-x-1;
    }
    .space {
        @apply w-1/3 h-24 rounded cursor-pointer flex items-center text-white bg-gray-800 content-center text-center;
    }
    .space:disabled, .space:hover {
        @apply bg-opacity-50;
    }
    .space:disabled {
        @apply  cursor-default;
    }
    .results-o .tic-tac-toe-board, .results-x .tic-tac-toe-board {
        @apply transform scale-75;
    }
    .results-x .space, .results-o .space {
        @apply cursor-default opacity-5 bg-opacity-100;
    }
    .results-cats .space {
        @apply opacity-0;
    }
    .results-o .space.winning-space, .results-x .space.winning-space  {
        @apply opacity-100;
    }
    :global(.results-x .neon-button) {
        --button-color: #ff89d8 !important;
    }
    :global(.results-o .neon-button) {
        --button-color: #75eaff !important;
    }
    :global(.results-cats .neon-button) {
        --button-color: #FBE578 !important;
    }
</style>