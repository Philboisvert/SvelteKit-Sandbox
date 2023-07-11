<script lang="ts">
  import CardArticle from "./components/CardArticle.svelte";
  import { onMount } from "svelte";
  import type { Article } from "../types";
  import { _fetchNYT } from "./+page";

  let articles: Article[] = [];

  onMount(async () => {
    articles = await _fetchNYT();
  });
</script>

<svelte:head>
  <title>Sandbox</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<h1 class="mx-0">Latest News Articles</h1>
<section class="wrapper mx-0 flex flex-wrap flex-row justify-center">
  {#if articles.length > 0}
    {#each articles as article, i}
      <CardArticle {article} {i} />
    {/each}
  {:else}
    <h1 class="mx-0">Loading..</h1>
  {/if}
</section>

<style>
  .wrapper {
    gap: 20px;
  }
</style>
