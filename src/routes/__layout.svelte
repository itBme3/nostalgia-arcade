<script>
  import "../assets/global.scss";
</script>

<main>
  <slot />
</main>
<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
</svelte:head>
<style>
  :root {
    font-family: 'Press Start 2P', monospace;
  }

  main {
    text-align: center;
    padding: 0;
    width: 100vw;
    margin: 0 auto;
    min-height: calc(100vh - 200px);
    overflow-y: hidden;
  }

</style>
