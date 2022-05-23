<script>
    import { onDestroy, onMount } from 'svelte';
    import { rainbow } from '../utils/coloring';
    import chroma from 'chroma-js';
    import {gsap} from 'gsap';
    let w, h, interval, matrixCoverage = 0.20;
    const rowCount = 10;
    $: matrix = Array(rowCount)
        .fill(null)
        .map((row, i) => 
            Array(rowCount)
                .fill(null)
                .map((col, ii)=> `r${i}c${ii}`));
    $: squareSize = Math.round(w / rowCount);
    $: colors = chroma.scale(rainbow)
        .colors(rowCount * rowCount);
        

    let tl;
    const createAnimations = () => {
        if(tl?.kill) {
            tl.kill()
        }
        gsap.set('.square', {
            webkitFilter: 'blur(30px)',
            scale: 0,
            opacity: 0
        })
        tl = gsap.timeline({repeat: -1, yoyo:true, repeatDelay: 2});

        tl.to([".square", 'square:before', 'square:after'], {
            scaleY: .7,
            scaleX: .7,
            y: -100,
            duration: 2,
            webkitFilter: 'blur(20px) brightness(1.1) saturate(1.8)',
            borderRadius: 0,
            rotateEach: 800,
            stagger: { 
                amount: 3,
                from: "random",
                grid: [rowCount, rowCount],
                ease: "power3.inOut",
            }
        }, '-=1');
        tl.to('.square', {
            scaleY: .02,
            y: -50,
            scaleX: .02,
            borderRadius: 0,
            duration: 3,
            webkitFilter: 'blur(5px)',
            stagger: { 
                amount: 3,
                from: "center",
                grid: [rowCount, rowCount],
                ease: "power3.inOut",
            }
        }, '-=2');
        
    }

    onMount(() => {
        console.log({chroma, colors})
        // startInterval()
        createAnimations()
    });

    onDestroy(() => {
        try {
        clearTimeout(interval);
        } catch {}
    })

    

</script>

<div 
    class="page bg-gray-900 h-screen"
    bind:offsetWidth={w}
    bind:offsetHeight={h}>
        {#if Array.isArray(matrix)}
            <div class="home-grid fixed inset-2 rounded-sm z-0">
                {#each matrix as row, i}
                    <div 
                        name={`row-${i}`}
                        class="row flex w-full items-center content-stretch">

                        {#each row as coords, ii}
                            <div 
                                name={coords}
                                class={`square ${coords}`}
                                style={`height: ${squareSize}px; width: ${squareSize}px; background-color: ${colors[(i * rowCount) + ((ii * rowCount) * matrixCoverage)]}`}
                            />
                        {/each}
                    </div>
                {/each}
            </div>
        {/if}
    <!-- <h1 
        class="page-title text-7xl pt-12 text-gray-900 relative z-1"
        style="text-shadow: 6px 0 0 #00FF3F, 10px 0 0 black, 16px 0 0 #ff479c, 20px 0 0 black, 26px 0 0 #fffb38, 30px 0 0 black, 36px 0 0 #8735ff, 40px 0 0 black, 46px 0 0 #03f4f4, 50px 0 0 black, 56px 0 0 #04fc84;"
    
    >Classic Arcade</h1> -->

    {#each rainbow as color}
        <div class="home-title" style={`color: ${color}`}>Nostalgia Arcade</div>
    {/each}

    <div class="flex flex-col space-y-8 pt-[380px]">
        {#each [{ label: 'Rainbow Snake', path: '/snake' }, { label: 'Boxes & Dots', path: '/boxes-dots' }, { label: 'Tic Tac Toe', path: '/tic-tac-toe' }] as link}
            <a 
                href="{link.path}" 
                class="button glowing-button">
                <span class="inner">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <strong class="relative z-1">{link.label}</strong>
                </span>
            </a> 
        {/each}
    </div>
</div>

<style>
    .home-grid {
    }
    .square {
        @apply rounded-lg transform scale-50 relative blur;
    }
    
    
    .square:before {
        content: "";
        @apply absolute rounded-full bg-white bg-opacity-30 inset-0 -translate-y-2 -translate-x-3 scale-50 blur bg-white border border-white bg-opacity-10;
    }
    .square:after {
        content: "";
        @apply absolute rounded-full bg-white bg-opacity-50 scale-75 inset-3 blur;
    }
    .square:hover:before {
        @apply blur-none;
    }
    .page-tile {
        @apply text-white;
        transition: .3s all ease-in-out;
    }

</style>