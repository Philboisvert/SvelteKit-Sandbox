<script lang="ts">
  import CardArticle from "./components/CardArticle.svelte";
  import { goto } from '$app/navigation';
  import { onMount } from "svelte";
  import type { Article } from "../types";
  import { inview } from "svelte-inview/dist/index";
  import { _fetchNYT } from "./+page";
  import { Search, Button } from "flowbite-svelte";
  import "default-passive-events";

  let newArticlesBatch: Article[] = [];
  let allArticles: Article[] = [];
  let offset: number = 20;
  let value: String;

  onMount(async () => {
    newArticlesBatch = await _fetchNYT(offset);
  });

  const handleFullScroll = async (e: any) => {
    offset = offset + 20;
    if (e.detail.inView) {
      newArticlesBatch = await _fetchNYT(offset);
    }
  };

  const searchValue = () => {
    let trimmedArticles:any = [];
    for (var i = 0; i < allArticles.length; i++) {
      var obj = allArticles[i];
      if (obj.section === value) {
        trimmedArticles.push(obj);
      } 
    }
    const myQuery = JSON.stringify(trimmedArticles);
    const queryParams = new URLSearchParams(myQuery).toString();
/*     console.log(myQuery,"first");
    console.log(queryParams,"second"); */
    goto(`/searchResult/${myQuery}`)
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
<form class="flex gap-2 w-4/5 mx-auto py-2 items-center" on:submit={searchValue}>
  <Search placeholder="Search by section word (e.g., U.S., Food, World, Arts..)" bind:value size="md" />
  <Button class="!p-2.5" type="submit">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
  </Button>
</form>
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
