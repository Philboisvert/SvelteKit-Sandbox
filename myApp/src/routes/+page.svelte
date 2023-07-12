<script lang="ts">
  import CardArticle from "./components/CardArticle.svelte";
  import { onMount } from "svelte";
  import type { Article } from "../types";
  import { inview } from "svelte-inview/dist/index";
  import { _fetchNYT } from "./+page";

  let newArticlesBatch: Article[] = [];
  let allArticles: Article[] = [];
  let offset: number = 20;

  onMount(async () => {
    newArticlesBatch = await _fetchNYT(offset);
  });

  const handleFullScroll = async (e: any) => {
    offset = offset + 20;
    if (e.detail.inView) {
      newArticlesBatch = await _fetchNYT(offset);
    }
  };

  $: {
    allArticles = [...allArticles, ...newArticlesBatch];
  }
</script>

<svelte:head>
  <title>Sandbox</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<h1 class="mx-0">Latest News Articles</h1>
<section class="wrapper mx-0 flex flex-wrap flex-row justify-center">
  {#if allArticles.length > 0}
    {#each allArticles as article, i}
      <CardArticle {article} {i} />
    {/each}
  {/if}
  <div use:inview={{}} on:inview_change={handleFullScroll} />
</section>

<style>
  .wrapper {
    gap: 20px;
  }
</style>
