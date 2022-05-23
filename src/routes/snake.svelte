<script>
  import SnakeSquare from '../components/SnakeSquare.svelte'
  import ArcadeScores from '../components/ArcadeScores.svelte'
  import GameMessages from '../components/GameMessages.svelte'
  import { direction, squares, occupied, food, colors, difficulty } from '../stores/snake.js'
  import { scores } from '../stores/scores.js'
  import { onMount, onDestroy } from 'svelte'
  import { randomInt } from '../utils/funcs.js'
  let matrixCount = 30
  let matrix = [...new Array(matrixCount)].map(() => [...new Array(matrixCount)].map(() => 0))
  squares.set(matrix.reduce((acc, row, i) => {
    return [...acc, ...row.map((col, ii) => [i,ii])]
  }, []));
  let w;
  let interval;
  let paused = false;
  let currentDifficulty = 5;
  let gameIsOver = false;
  let lastDirection = null
  let nextDirection = null

  $: boardWidth = Math.floor((w - matrixCount) / matrixCount) * matrixCount
  $: squareSize = `${Math.round(boardWidth / matrixCount)}px`
  $: newDifficulty = currentDifficulty !== $difficulty

  const gameOver = () => {
    clearTimeout(interval)
    gameIsOver = true
    scores.update('snake', $occupied.length * $difficulty)
  }
 
  const pausing = () => {
    
    if (!paused) {
      clearTimeout(interval);
    } else {
      startInterval()
    }
    setTimeout(() => {
      paused = !paused
    }, 100)
  }

  const restartGame = () => {
    paused = false
    gameIsOver = false
    direction.set('right')
    food.reset(matrixCount)
    occupied.set([[3,3]])
    currentDifficulty = $difficulty
    startInterval()
  }

  const setFood = () => {
    const available = $squares
      .filter(s => !$occupied.map(o => o.join())
      .includes(s.join()));
    let nextFood = available[randomInt(0, available.length - 1)]
    if($food.join() === nextFood.join()) {
      for (let i = 0; i < 10 && $food.join() !== nextFood.join(); i++) {
        nextFood = available[randomInt(0, available.length - 1)];
      }
    }
    food.set(nextFood);
  };

  const startInterval = () => {
    interval = setInterval(() => {
      const current = $occupied[0];
      if (nextDirection) {
        direction.set(nextDirection);
      }
      const nextSquare = (() => {
        switch (nextDirection ? nextDirection : $direction) {
          case 'left': 
            return [current[0], current[1] - 1]
          case 'right': 
            return [current[0], current[1] + 1]
          case 'up': 
            return [current[0] - 1, current[1]]
          case 'down': 
            return [current[0] + 1, current[1]]
        }
      })();
      
      gameIsOver = !$squares.map(s => s.join())
        .includes(nextSquare.join())
        || $occupied.map(s => s.join())
          .includes(nextSquare.join());
      
      if(gameIsOver) {
        return gameOver()
      }
      occupied.update((arr) => {
        const res = [nextSquare, ...arr];
        lastDirection = $direction;
        if (!res.map(sqr => sqr.join()).includes($food.join())) {
          res.pop()
        } else {
          setFood()
        }
        return res
      })
    }, 1000 / $difficulty);
  }

  onMount(() => {
    food.reset(matrixCount);
    startInterval();
  });

  onDestroy(() => {
    try {
      clearTimeout(interval);
    } catch {}
  })

  const handleClick = (e) => {
    const head = document.querySelector(`#square-${$occupied[0].join('-')}`)
    const click = { x: e.clientX, y: e.clientY };
    const h = { x: head.offsetLeft, y: head.offsetTop };
    const diff = { x: click.x - h.x, y: click.y - h.y };
    const biggerDiff = (diff.x < 0 ? diff.x * -1 : diff.x) > (diff.y < 0 ? diff.y * -1 : diff.y) ? 'x' : 'y';
    const clickDirection = biggerDiff === 'x' 
      ? diff[biggerDiff] < 0 ? 'left' : 'right'
      : diff[biggerDiff] < 0 ? 'up' : 'down';
    const secondDirection = biggerDiff === 'x'
      ? diff.y < 0 ? 'up' : 'down'
      : diff.x < 0 ? 'left' : 'right';
    switch (clickDirection) {
      case 'left':
        direction.set(lastDirection === 'right' ? secondDirection : clickDirection)
        break;
      case 'right':
        direction.set(lastDirection === 'left' ? secondDirection : clickDirection)
        break;
      case 'up':
        direction.set(lastDirection === 'down' ? secondDirection : clickDirection)
        break;
      case 'down':
        direction.set(lastDirection === 'up' ? secondDirection : clickDirection)
        break;
    }
  }

  const handleKeydown = (e) => {
    if (e.code === 'Space') {
      if(gameIsOver) {
        return restartGame();
      }
      return pausing()
    }
     switch (e.code) {
            case 'ArrowLeft':
                  if (lastDirection !== 'right') {
                    direction.set('left')
                    nextDirection = null
                  } else {
                    nextDirection = 'left'
                  }
                  break;
            case 'ArrowRight':
                  if (lastDirection !== 'left') {
                    direction.set('right')
                    nextDirection = null
                  } else {
                    nextDirection = 'right'
                  }
                  break;
            case 'ArrowUp':
                  if (lastDirection !== 'down') {
                    direction.set('up')
                    nextDirection = null
                  } else {
                    nextDirection = 'up'
                  }
                  break;
            case 'ArrowDown':
                  if (lastDirection !== 'up') {
                    direction.set('down')
                    nextDirection = null
                  } else {
                    nextDirection = 'down'
                  }
                  break;
      }
  }

  const changeDifficulty = (e) => {
    console.log(e, { currentDifficulty, difficulty: $difficulty })
    console.log(parseInt(e.srcElement.value))
    // difficulty.set('snake', )
  }
</script>

<svelte:window on:keydown={(e) => !paused ? handleKeydown(e) : ''} on:click={(e) => !paused ? handleClick(e) : ''}/>
<h1 class="text-xl text-gray-300 font-bold tracking-widest my-4"><span class="text-green-500">S</span><span class="text-cyan-500">N</span><span class="text-purple-500">A</span><span class="text-pink-500">K</span><span class="text-yellow-500">E</span></h1>


{#if gameIsOver}
  <GameMessages classes={{container: 'bg-red-500', inner: 'shadow-none bg-transparent ' }}>
    <h1 class="message-title" slot="before">GAME OVER</h1>
    <h1 class="score text-3xl"><small class="text-lg opacity-40">Score:</small> { $occupied.length * $difficulty }</h1>
    <button on:click={restartGame} class="button neon-button my-12">restart</button>
    <ArcadeScores slot="after" keys={['snake']} />
  </GameMessages>
{/if}

{#if paused}
<GameMessages 
  classes={{container: 'bg-gray-900 bg-opacity-70' }}>
  <h1 class="message-title text-gray-300 uppercase" slot="before">paused</h1>

  <label for="difficulty">dificulty:</label>
  { $difficulty }
  <input  
    class="mb-4"
    id="difficulty"
    type="range" min="1" max="10" 
    bind:value={$difficulty}
    on:change={changeDifficulty}
  />
  {#if currentDifficulty === $difficulty}
    <button 
      on:click={pausing} class="button bg-green-400 text-green-900 uppercase">resume</button>
  {/if}
  <button on:click={restartGame} class="button bg-purple-400 text-purple-900 mt-3 uppercase">restart</button>
</GameMessages>
{/if}


<!-- { JSON.stringify($scores) } -->
<div class="flex content-center text-center max-w-[calc(100vh-4rem)] mx-auto"
  bind:clientWidth={w}>
  <div class="snake-matrix mx-auto flex flex-col w-auto">
    {#each matrix as row, i  (`${i}`)}
      <div class="matrix-row flex">
        {#each row as square, ii (`${i},${ii}`)}
          <SnakeSquare 
            squareSize={squareSize} squareIndex={[i,ii]}
            bgColor={$colors[`${i},${ii}`]} />
        {/each}
      </div>
    {/each}
  </div>
</div>



<style>
  button {
    --button-color: rgb(255, 185, 185);
  }
</style>