<script lang="ts">
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import type { PageData } from './$types';
  import "../app.css";
  import "../assets/styles.css";

  export let data: PageData;
</script>

<div class="app">
  <Header />
  <main>
    <slot {data} />
  </main>
  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 70rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
